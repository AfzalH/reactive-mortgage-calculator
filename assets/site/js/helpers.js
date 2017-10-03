import moment from 'moment';

export function getPropertyValue(state) {
    return state.property_value_is_changeable ? state.property_value : state.property_value_fixed;
}

export function getDownPaymentAmount(state) {
    if (state.downpayment_is_percent) {
        return getDownpaymentAmountFromPercent(state);
    }
    const amount = state.downpayment_is_changeable ? state.downpayment_amount : state.downpayment_amount_fixed;
    return amount;
}

export function getMortgageAmount(state) {
    return getPropertyValue(state) - getDownPaymentAmount(state);
}

export function getDownpaymentAmountFromPercent(state) {
    const propertyValue = getPropertyValue(state);
    const percent = state.downpayment_is_changeable ? state.downpayment_percent : state.downpayment_percent_fixed;
    const calc = propertyValue * (percent / 100);
    return calc;
}

export function getDownpaymentPercentFromAmount(state) {
    const propertyValue = getPropertyValue(state);
    const amount = state.downpayment_is_changeable ? state.downpayment_amount : state.downpayment_amount_fixed;
    const calc = (amount / propertyValue) * 100;
    return calc;
}

export function getTenureInMonth(state) {
    const year = state.tenure_is_changeable ? state.tenure : state.tenure_fixed;
    return year * 12;
}

export function getMonthlyInterest(state) {
    return getInterestFraction(state) / 12;
}

export function getBiWeeklyInterest(state) {
    return getInterestFraction(state) / 24;
}

export function getInterestFraction(state) {
    const interest = state.interest_is_changeable ? state.interest : state.interest_fixed;
    return interest / 100;
}

export function getMonthlyPayment(p, n, i) {
    return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

export function getPropertyTax(state) {
    const monthly_tax = state.property_tax / 1200;
    const property_value = getPropertyValue(state);
    return property_value * monthly_tax;
}
export function getMI(state) {
    const monthly = state.mortgage_insurance / 1200;
    const mortgage_amount = getMortgageAmount(state);
    return mortgage_amount * monthly;
}

export function getBreakDown(state) {
    const monthly_interest = getMonthlyInterest(state);
    const monthly_installment = getMonthlyPayment(getMortgageAmount(state), getTenureInMonth(state), getMonthlyInterest(state));
    const mortgage_amount = getMortgageAmount(state);
    const tenure_in_month = getTenureInMonth(state);
    const monthly_property_tax = getPropertyTax(state);
    const monthly_mi = getMI(state);
    const monthly_hoa = parseFloat(state.monthly_hoa);
    const monthly_hazard = parseFloat(state.hazard_insurance) / 12;
    let interest_ar = [];
    let interest = 0;
    let principal_ar = [];
    let principal = 0;
    let balance_ar = [];
    let property_tax_ar = [];
    let mi_ar = [];
    let hoa_ar = [];
    let hazard_ar = [];
    let balance = mortgage_amount;
    let month_ar = [];
    let month = moment().add(state.start_month, 'month');
    let year_ar = [];

    let current_month = 0;
    while (current_month < tenure_in_month) {
        interest = balance * monthly_interest;
        principal = monthly_installment - interest;
        balance = balance - principal;
        if (balance < 0) balance = 0;
        interest_ar.push(interest);
        principal_ar.push(principal);
        balance_ar.push(balance);
        property_tax_ar.push(monthly_property_tax);
        mi_ar.push(monthly_mi);
        hoa_ar.push(monthly_hoa);
        hazard_ar.push(monthly_hazard);
        month_ar.push(month.format('MMM-YY'));
        year_ar.push(month.format('YYYY'));
        current_month = current_month + 1;
        month = month.add(1, 'month');
    }
    return {
        interest_ar,
        principal_ar,
        balance_ar,
        month_ar,
        year_ar,
        mortgage_amount,
        property_tax_ar,
        mi_ar,
        hoa_ar,
        hazard_ar
    }
}

export function getBreakDownInYear(breakdown) {
    let interest_ar = [];
    let interest = 0;
    let principal_ar = [];
    let principal = 0;
    let balance_ar = [];
    let balance = parseFloat(breakdown.mortgage_amount);
    let year_ar = [];
    let year = parseInt(breakdown.year_ar[0]);
    let property_tax_ar = [];
    let property_tax = 0;
    let mi_ar = [];
    let mi = 0
    let hoa_ar = [];
    let hoa = 0;
    let hazard_ar = [];
    let hazard = 0;
    let i = 0;
    const total = breakdown.month_ar.length;
    while (i < total) {
        if (year == parseInt(breakdown.year_ar[i])) {
            interest = interest + parseFloat(breakdown.interest_ar[i]);
            principal = principal + parseFloat(breakdown.principal_ar[i]);
            balance = balance - parseFloat(breakdown.principal_ar[i]);
            property_tax = property_tax + parseFloat(breakdown.property_tax_ar[i]);
            mi = mi + parseFloat(breakdown.mi_ar[i]);
            hoa = hoa + parseFloat(breakdown.hoa_ar[i]);
            hazard = hazard + parseFloat(breakdown.hazard_ar[i]);
        }
        else {
            year_ar.push(year);
            interest_ar.push(interest);
            principal_ar.push(principal);
            balance_ar.push(balance);
            property_tax_ar.push(property_tax);
            mi_ar.push(mi);
            hoa_ar.push(hoa);
            hazard_ar.push(hazard);

            interest = parseFloat(breakdown.interest_ar[i]);
            principal = parseFloat(breakdown.principal_ar[i]);
            property_tax = parseFloat(breakdown.property_tax_ar[i]);
            mi = parseFloat(breakdown.mi_ar[i]);
            hoa = parseFloat(breakdown.hoa_ar[i]);
            hazard = parseFloat(breakdown.hazard_ar[i]);
            balance = balance - parseFloat(breakdown.principal_ar[i]);
            year = parseInt(breakdown.year_ar[i]);
        }
        i = i + 1;
    }
    year_ar.push(year);
    interest_ar.push(interest);
    principal_ar.push(principal);
    balance_ar.push(balance);
    property_tax_ar.push(property_tax);
    mi_ar.push(mi);
    hoa_ar.push(hoa);
    hazard_ar.push(hazard);
    return {interest_ar, principal_ar, balance_ar, year_ar, property_tax_ar, mi_ar, hoa_ar, hazard_ar}
}
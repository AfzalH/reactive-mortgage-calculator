import moment from 'moment';

export function getPropertyValue(state) {
    return state.property_value_is_changeable ? state.property_value : state.property_value_fixed;
}

export function getDownPaymentAmount(state) {
    if (state.downpayment_is_percent) {
        return getDownpaymentAmountFromPercent(state);
    }
    const amount = state.downpayment_is_changeable ? state.downpayment_amount : state.downpayment_amount_fixed;
    return amount.toFixed(0);
}

export function getMortgageAmount(state) {
    return getPropertyValue(state) - getDownPaymentAmount(state);
}

export function getDownpaymentAmountFromPercent(state) {
    const propertyValue = getPropertyValue(state);
    const percent = state.downpayment_is_changeable ? state.downpayment_percent : state.downpayment_percent_fixed;
    const calc = propertyValue * (percent / 100);
    return calc.toFixed(0);
}

export function getDownpaymentPercentFromAmount(state) {
    const propertyValue = getPropertyValue(state);
    const amount = state.downpayment_is_changeable ? state.downpayment_amount : state.downpayment_amount_fixed;
    const calc = (amount / propertyValue) * 100;
    return calc.toFixed(2);
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
    const monthly = p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    return monthly.toFixed(0);
}

export function getBreakDown(state) {
    const monthly_interest = getMonthlyInterest(state);
    const monthly_installment = getMonthlyPayment(getMortgageAmount(state), getTenureInMonth(state), getMonthlyInterest(state));
    const mortgage_amount = getMortgageAmount(state);
    const tenure_in_month = getTenureInMonth(state);

    let interest_ar = [];
    let interest = 0;
    let principal_ar = [];
    let principal = 0;
    let balance_ar = [];
    let balance = mortgage_amount;
    let month_ar = [];
    let month = moment().add(state.start_month, 'month');

    let current_month = 0;
    while (current_month < tenure_in_month) {
        interest = balance * monthly_interest;
        principal = monthly_installment - interest;
        balance = balance - principal;
        if (balance <= 0) balance = 1;
        interest_ar.push(interest.toFixed(2));
        principal_ar.push(principal.toFixed(2));
        balance_ar.push(balance.toFixed(2));
        month_ar.push(month.format('MMM-YY'));
        current_month = current_month + 1;
        month = month.add(1, 'month');
    }
    return {
        interest_ar: interest_ar,
        principal_ar: principal_ar,
        balance_ar: balance_ar,
        month_ar: month_ar
    }
}
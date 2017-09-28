import React from 'react';
import PropertyInput from './Partials/PropertyInput';
import DownpaymentInput from './Partials/DownpaymentInput';
import InterestInput from './Partials/InterestInput';
import TenureInput from './Partials/TenureInput';
import LoanPieChart from './LoanPieChart';
import MonthlyChart from './MonthlyChart';

class LayoutSelector extends React.Component {
    constructor(props) {
        super(props);
        this.graphid = 'graph' + props.id;
        this.state = {...this.props.options};
        this.onch = this.onch.bind(this);
    }

    onch(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        Materialize.updateTextFields();
        this.setState({});
    }

    getPropertyValue() {
        return this.state.property_value_is_changeable ? this.state.property_value : this.state.property_value_fixed;
    }

    getDownPaymentAmount() {
        if (this.state.downpayment_is_percent) {
            return this.getDownpaymentAmountFromPercent();
        }
        const amount = this.state.downpayment_is_changeable ? this.state.downpayment_amount : this.state.downpayment_amount_fixed;
        return amount.toFixed(0);
    }

    getMortgageAmount() {
        return this.getPropertyValue() - this.getDownPaymentAmount();
    }

    getDownpaymentAmountFromPercent() {
        const propertyValue = this.getPropertyValue();
        const percent = this.state.downpayment_is_changeable ? this.state.downpayment_percent : this.state.downpayment_percent_fixed;
        const calc = propertyValue * (percent / 100);
        return calc.toFixed(0);
    }

    getDownpaymentPercentFromAmount() {
        const propertyValue = this.getPropertyValue();
        const amount = this.state.downpayment_is_changeable ? this.state.downpayment_amount : this.state.downpayment_amount_fixed;
        const calc = (amount / propertyValue) * 100;
        return calc.toFixed(2);
    }

    getTenureInMonth() {
        const year = this.state.tenure_is_changeable ? this.state.tenure : this.state.tenure_fixed;
        return year * 12;
    }

    getMonthlyInterest() {
        return this.getInterestFraction() / 12;
    }

    getBiWeeklyInterest() {
        return this.getInterestFraction() / 24;
    }

    getInterestFraction() {
        const interest = this.state.interest_is_changeable ? this.state.interest : this.state.interest_fixed;
        return interest / 100;
    }

    getMonthlyPayment(p, n, i) {
        const monthly = p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
        return monthly.toFixed(0);
    }

    render() {
        const monthly_interest = this.getMonthlyInterest();
        const monthly_installment = this.getMonthlyPayment(this.getMortgageAmount(), this.getTenureInMonth(), this.getMonthlyInterest());
        const mortgage_amount = this.getMortgageAmount();
        const tenure_in_month = this.getTenureInMonth();
        const total_payable = monthly_installment * tenure_in_month;
        const total_interest = total_payable - mortgage_amount;

        let interest_ar = [];
        let interest = 0;
        let principal_ar = [];
        let principal = 0;
        let balance_ar = [];
        let balance = mortgage_amount;

        let current_month = tenure_in_month;
        while (current_month--) {
            interest = balance * monthly_interest;
            principal = monthly_installment - interest;
            balance = balance - principal;
            if (balance <= 0) balance = 1;

            interest_ar.push(interest.toFixed(2));
            principal_ar.push(principal.toFixed(2));
            balance_ar.push(balance.toFixed(2));
        }
        return (
            <div>
                <div id={this.graphid}></div>
                <div className="row">
                    <div className="col m6 s12">
                        <PropertyInput form={this.state} onch={this.onch}/>
                        <DownpaymentInput form={this.state} onch={this.onch}
                                          getPropertyValue={this.getPropertyValue.bind(this)}
                                          getDownpaymentAmountFromPercent={this.getDownpaymentAmountFromPercent.bind(this)}
                                          getDownpaymentPercentFromAmount={this.getDownpaymentPercentFromAmount.bind(this)}/>
                        <InterestInput form={this.state} onch={this.onch}/>
                        <TenureInput form={this.state} onch={this.onch}/>
                    </div>
                    <div className="col m6 s12">
                        <LoanPieChart
                            id={this.props.id}
                            monthly_installment={monthly_installment}
                            mortgage_amount={mortgage_amount}
                            tenure_in_month={tenure_in_month}
                            currency={this.state.currency}
                        />
                    </div>
                </div>
                <div className="row info-row">
                    <div className="col s12 m6 center-align">
                            <span>Monthly Installment: <strong
                                className="red-text text-darken-2">{this.state.currency + d3.format(',')(monthly_installment)}</strong></span>
                    </div>
                    <div className="col s12 m6 center-align">
                        <span>Mortgage Amount: <strong>{this.state.currency + d3.format(',')(mortgage_amount)}</strong></span>
                    </div>
                    <div className="col s12 m6 center-align">
                        <span>Total Payment: <strong>{this.state.currency + d3.format(',')(total_payable)}</strong></span>
                    </div>
                    <div className="col s12 m6 center-align">
                        <span>Interest To Be Payed: <strong>{this.state.currency + d3.format(',')(total_interest)}</strong></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <MonthlyChart principal={principal_ar} interest={interest_ar} balance={balance_ar} currency={this.state.currency}/>
                    </div>
                </div>
                <pre>{JSON.stringify(this.state, null, 4)}</pre>
            </div>
        )
    }
}

export default LayoutSelector;
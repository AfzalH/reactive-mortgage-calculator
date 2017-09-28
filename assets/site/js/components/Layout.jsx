import React from 'react';
import PropertyInput from './Partials/PropertyInput';
import DownpaymentInput from './Partials/DownpaymentInput';
import InterestInput from './Partials/InterestInput';
import TenureInput from './Partials/TenureInput';
import StartMonthInput from './Partials/StartMonthInput';
import LoanPieChart from './LoanPieChart';
import MonthlyChart from './MonthlyChart';
import InfoRow from './Partials/InfoRow';
import {getMonthlyInterest, getMonthlyPayment, getMortgageAmount, getTenureInMonth, getBreakDown} from '../helpers';

class LayoutSelector extends React.Component {
    constructor(props) {
        super(props);
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
    }


    render() {
        const mortgage_amount = getMortgageAmount(this.state);
        const tenure_in_month = getTenureInMonth(this.state);
        const monthly_installment = getMonthlyPayment(mortgage_amount, tenure_in_month, getMonthlyInterest(this.state));
        const total_payable = monthly_installment * tenure_in_month;
        const total_interest = total_payable - mortgage_amount;
        const breakdown = getBreakDown(this.state);
        const currency = this.state.currency;

        return (
            <div>
                <div className="row">
                    <div className="col m6 s12">
                        <PropertyInput form={this.state} onch={this.onch}/>
                        <DownpaymentInput form={this.state} onch={this.onch}/>
                        <InterestInput form={this.state} onch={this.onch}/>
                        <TenureInput form={this.state} onch={this.onch}/>
                        <StartMonthInput form={this.state} onch={this.onch}/>
                    </div>
                    <div className="col m6 s12">
                        <LoanPieChart
                            id={this.props.id}
                            monthly_installment={monthly_installment}
                            mortgage_amount={mortgage_amount}
                            tenure_in_month={tenure_in_month}
                            currency={currency}
                        />
                    </div>
                </div>
                <InfoRow currency={currency} monthly_installment={monthly_installment} mortgage_amount={mortgage_amount}
                         total_payable={total_payable} total_interest={total_interest}/>

                <MonthlyChart principal={breakdown.principal_ar} interest={breakdown.interest_ar}
                              balance={breakdown.balance_ar}
                              currency={currency} months={breakdown.month_ar}/>
   
                <pre>{JSON.stringify(this.state, null, 4)}</pre>
            </div>
        )
    }
}

export default LayoutSelector;
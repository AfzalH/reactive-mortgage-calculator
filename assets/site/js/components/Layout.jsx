import React from 'react';
import UserInputs from './UserInputs';
import LoanPieChart from './LoanPieChart';
import MonthlyChart from './MonthlyChart';
import YearlyChart from './YearlyChart';
import InfoRow from './Partials/InfoRow';
import {
    getMonthlyInterest,
    getMonthlyPayment,
    getMortgageAmount,
    getTenureInMonth,
    getBreakDown,
    getPropertyTax,
    getBreakDownInYear
} from '../helpers';

class LayoutSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.options,
            autoBreakDownSwitch: true,
            monthlyBreakdown: (this.props.options.tenure < 6)
        };

    }

    onch(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (this.state.autoBreakDownSwitch && name == 'tenure') {
            if (value <= 5) {
                this.setState({monthlyBreakdown: true});
            }
            else {
                this.setState({monthlyBreakdown: false});
            }
        }
    }

    componentDidMount() {
        Materialize.updateTextFields();
    }


    render() {
        const mortgage_amount = getMortgageAmount(this.state);
        const tenure_in_month = getTenureInMonth(this.state);
        const monthly_principal_and_interest = getMonthlyPayment(mortgage_amount, tenure_in_month, getMonthlyInterest(this.state));
        const total_principal_and_interest = monthly_principal_and_interest * tenure_in_month;
        const total_interest = total_principal_and_interest - mortgage_amount;

        const monthly_property_tax = getPropertyTax(this.state);
        const total_property_tax = monthly_property_tax * tenure_in_month;

        const monthly_installment = monthly_principal_and_interest + monthly_property_tax;
        const total_payable = monthly_installment * tenure_in_month;

        const breakdown = getBreakDown(this.state);
        const breakdown_yearly = getBreakDownInYear(breakdown);
        const currency = this.state.currency;

        return (
            <div>
                <div className="row">
                    <div className="col m7 s12">
                        <UserInputs form={this.state} onch={this.onch.bind(this)}/>
                    </div>
                    <div className="col m5 s12">
                        <LoanPieChart
                            id={this.props.id}
                            monthly_installment={monthly_installment}
                            mortgage_amount={mortgage_amount}
                            tenure_in_month={tenure_in_month}
                            total_interest={total_interest}
                            total_property_tax={total_property_tax}
                            currency={currency}
                            total_payable={total_payable}
                        />
                        <InfoRow currency={currency} monthly_installment={monthly_installment}
                                 mortgage_amount={mortgage_amount}
                                 total_property_tax={total_property_tax}
                                 total_payable={total_payable}
                                 total_interest={total_interest}/>
                    </div>
                </div>


                {(this.state.monthlyBreakdown) ?
                    <MonthlyChart principal={breakdown.principal_ar} interest={breakdown.interest_ar}
                                  balance={breakdown.balance_ar}
                                  currency={currency} months={breakdown.month_ar}/> :
                    <YearlyChart principal={breakdown_yearly.principal_ar} interest={breakdown_yearly.interest_ar}
                                 balance={breakdown_yearly.balance_ar}
                                 currency={currency} years={breakdown_yearly.year_ar}/>
                }
            </div>
        )
    }
}

export default LayoutSelector;
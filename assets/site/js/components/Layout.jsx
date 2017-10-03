import React from 'react';
import UserInputs from './UserInputs';
import LoanPieChartMonthly from './LoanPieChartMonthly';
import LoanPieChartTotal from './LoanPieChartTotal';
import MonthlyChart from './MonthlyChart';
import YearlyChart from './YearlyChart';
import InfoRowTotal from './Partials/InfoRowTotal';
import InfoRowMonthly from './Partials/InfoRowMonthly';
import {
    getMonthlyInterest,
    getMonthlyPayment,
    getMortgageAmount,
    getTenureInMonth,
    getBreakDown,
    getPropertyTax,
    getMI,
    getBreakDownInYear
} from '../helpers';

class LayoutSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.options,
            autoBreakDownSwitch: true,
            pieChartMonthly: true,
            monthlyBreakdown: (this.props.options.tenure < 6)
        };
        this.togglePie = this.togglePie.bind(this);
        this.toggleBar = this.toggleBar.bind(this);
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

    togglePie() {
        this.setState((pState)=>({pieChartMonthly: !pState.pieChartMonthly}));
    }

    toggleBar() {
        this.setState((pState)=>({monthlyBreakdown: !pState.monthlyBreakdown, autoBreakDownSwitch: false}));
    }


    render() {
        const mortgage_amount = getMortgageAmount(this.state);
        const tenure_in_month = getTenureInMonth(this.state);
        const monthly_principal_and_interest = getMonthlyPayment(mortgage_amount, tenure_in_month, getMonthlyInterest(this.state));
        const total_principal_and_interest = monthly_principal_and_interest * tenure_in_month;
        const total_interest = total_principal_and_interest - mortgage_amount;

        const monthly_property_tax = getPropertyTax(this.state);
        const monthly_mi = getMI(this.state);
        const total_property_tax = monthly_property_tax * tenure_in_month;
        const total_mi = monthly_mi * tenure_in_month;

        const monthly_hoa = parseFloat(this.state.monthly_hoa);
        const total_hoa = monthly_hoa * tenure_in_month;


        const monthly_hazard = parseFloat(this.state.hazard_insurance) / 12;
        const total_hazard = monthly_hazard * tenure_in_month;

        const monthly_installment = monthly_principal_and_interest + monthly_property_tax + monthly_hoa + monthly_hazard + monthly_mi;
        const total_payable = monthly_installment * tenure_in_month;

        const breakdown = getBreakDown(this.state);
        const breakdown_yearly = getBreakDownInYear(breakdown);
        const currency = this.state.currency;
        
        return (
            <div>
                <div className="row">
                    <div className="col m6 s12">
                        <div className="info-point">
                            <small>Adjust values by moving the sliders</small>
                        </div>
                        <UserInputs form={this.state} onch={this.onch.bind(this)}/>
                    </div>
                    <div className="col m6 s12">
                        {this.state.pieChartMonthly ?
                            <div className="info-point center">Monthly Breakdown (<a onClick={this.togglePie}>Show
                                Total</a>)
                            </div> :
                            <div className="info-point center">Total Breakdown (<a onClick={this.togglePie}>Show
                                Monthly</a>)
                            </div>
                        }
                        {this.state.pieChartMonthly ?
                            <LoanPieChartMonthly
                                id={this.props.id}
                                monthly_installment={monthly_installment}
                                monthly_principal_and_interest={monthly_principal_and_interest}
                                monthly_property_tax={monthly_property_tax}
                                monthly_mi={monthly_mi}
                                monthly_hoa={monthly_hoa}
                                monthly_hazard={monthly_hazard}
                                currency={currency}
                            /> :
                            <LoanPieChartTotal
                                id={this.props.id}
                                mortgage_amount={mortgage_amount}
                                tenure_in_month={tenure_in_month}
                                total_interest={total_interest}
                                total_property_tax={total_property_tax}
                                total_mi={total_mi}
                                total_hoa={total_hoa}
                                total_hazard={total_hazard}
                                currency={currency}
                                total_payable={total_payable}
                            />}
                        {this.state.pieChartMonthly ?
                            <InfoRowMonthly currency={currency}
                                            monthly_installment={monthly_installment}
                                            monthly_principal_and_interest={monthly_principal_and_interest}
                                            monthly_property_tax={monthly_property_tax}
                                            monthly_mi={monthly_mi}
                                            monthly_hoa={monthly_hoa}
                                            monthly_hazard={monthly_hazard}/> :
                            <InfoRowTotal currency={currency}
                                          mortgage_amount={mortgage_amount}
                                          total_property_tax={total_property_tax}
                                          total_mi={total_mi}
                                          total_hoa={total_hoa}
                                          total_hazard={total_hazard}
                                          total_payable={total_payable}
                                          total_interest={total_interest}/>}
                    </div>
                </div>


                {(this.state.monthlyBreakdown) ?
                    <MonthlyChart principal={breakdown.principal_ar}
                                  interest={breakdown.interest_ar}
                                  balance={breakdown.balance_ar}
                                  property_tax_ar={breakdown.property_tax_ar}
                                  mi_ar={breakdown.mi_ar}
                                  hoa_ar={breakdown.hoa_ar}
                                  hazard_ar={breakdown.hazard_ar}
                                  currency={currency}
                                  toggleBar={this.toggleBar}
                                  months={breakdown.month_ar}/> :
                    <YearlyChart principal={breakdown_yearly.principal_ar}
                                 interest={breakdown_yearly.interest_ar}
                                 balance={breakdown_yearly.balance_ar}
                                 currency={currency}
                                 property_tax_ar={breakdown_yearly.property_tax_ar}
                                 mi_ar={breakdown_yearly.mi_ar}
                                 hoa_ar={breakdown_yearly.hoa_ar}
                                 hazard_ar={breakdown_yearly.hazard_ar}
                                 toggleBar={this.toggleBar}
                                 years={breakdown_yearly.year_ar}/>
                }
            </div>
        )
    }
}

export default LayoutSelector;
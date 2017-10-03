import React from 'react';
import TextField from '../components/form/TextField';
import RangeField from '../components/form/RangeField';
import RadioField from '../components/form/RadioField';
import SwitchField from '../components/form/SwitchField';

class SettingsForm extends React.Component {
    componentDidMount() {
        jQuery('ul.tabs').tabs();
    }

    render() {
        const {hich, pstate, global = false} = this.props;
        return (
            <div className="row">

                <div className="col s12">
                    <ul className="tabs tabs-fixed-width bottom20">
                        <li className="tab"><a className="active" href="#property-tab">Property Value</a></li>
                        <li className="tab"><a href="#downpayment-tab">Down Payment</a></li>
                        <li className="tab"><a href="#interest-tab">Interest Rate</a></li>
                        <li className="tab"><a href="#tenure-tab">Tenure</a></li>
                        <li className="tab"><a href="#tax-tab">Taxes and Charges</a></li>
                        <li className="tab"><a href="#other-tab">Other</a></li>
                    </ul>
                </div>

                <div className={"col s12 m6"} id="property-tab">
                    <TextField val={pstate.property_value_text} onch={hich} name="property_value_text"
                               label="Property Value Text" aclass=""/>
                    <SwitchField name="property_value_is_changeable" val={pstate.property_value_is_changeable}
                                 onch={hich} offtext="Fixed" ontext="Variable"
                                 label="Property Value Is" aclass="bottom40"/>
                    {pstate.property_value_is_changeable ?
                        <TextField val={pstate.property_value} onch={hich} name="property_value"
                                   label="Property Value - Default" aclass=""/> : null}
                    {pstate.property_value_is_changeable ?
                        <TextField val={pstate.property_value_min} onch={hich} name="property_value_min"
                                   label="Property Value - Minimum" aclass=""/> : null}
                    {pstate.property_value_is_changeable ?
                        <TextField val={pstate.property_value_max} onch={hich} name="property_value_max"
                                   label="Property Value - Maximum" aclass=""/> : null}
                    {!pstate.property_value_is_changeable ?
                        <TextField val={pstate.property_value_fixed} onch={hich} name="property_value_fixed"
                                   label="Property Value" aclass=""/> : null}
                </div>

                <div className={"col s12 m6 offset-m1"} id="downpayment-tab">
                    <TextField val={pstate.downpayment_text} onch={hich} name="downpayment_text"
                               label="Down Payment Text" aclass=""/>
                    <SwitchField name="downpayment_is_changeable" val={pstate.downpayment_is_changeable}
                                 onch={hich} offtext="Fixed" ontext="Variable"
                                 label="Down Payment Is" aclass="bottom40"/>
                    <SwitchField name="downpayment_is_percent" val={pstate.downpayment_is_percent}
                                 onch={hich} offtext="Total Amount" ontext="Percent"
                                 label="Down Payment In" aclass="bottom40"/>
                    {!pstate.downpayment_is_percent && !pstate.downpayment_is_changeable ?
                        <TextField val={pstate.downpayment_amount_fixed} onch={hich} name="downpayment_amount_fixed"
                                   label="Down-Payment Amount" aclass=""/> : null}
                    {!pstate.downpayment_is_percent && pstate.downpayment_is_changeable ?
                        <TextField val={pstate.downpayment_amount} onch={hich} name="downpayment_amount"
                                   label="Down-Payment Amount - Default" aclass=""/> : null}
                    {!pstate.downpayment_is_percent && pstate.downpayment_is_changeable ?
                        <TextField val={pstate.downpayment_amount_min} onch={hich} name="downpayment_amount_min"
                                   label="Down-Payment Amount - Minimum" aclass=""/> : null}
                    {!pstate.downpayment_is_percent && pstate.downpayment_is_changeable ?
                        <TextField val={pstate.downpayment_amount_max} onch={hich} name="downpayment_amount_max"
                                   label="Down-Payment Amount - Maximum" aclass=""/> : null}
                    {pstate.downpayment_is_percent && !pstate.downpayment_is_changeable ?
                        <TextField val={pstate.downpayment_percent_fixed} onch={hich} name="downpayment_percent_fixed"
                                   label="Down-Payment Percent" aclass=""/> : null}
                    {pstate.downpayment_is_percent && pstate.downpayment_is_changeable ?
                        <TextField val={pstate.downpayment_percent} onch={hich} name="downpayment_percent"
                                   label="Down-Payment Percent - Default" aclass=""/> : null}
                    {pstate.downpayment_is_percent && pstate.downpayment_is_changeable ?
                        <TextField val={pstate.downpayment_percent_min} onch={hich} name="downpayment_percent_min"
                                   label="Down-Payment Percent - Minimum" aclass=""/> : null}
                    {pstate.downpayment_is_percent && pstate.downpayment_is_changeable ?
                        <TextField val={pstate.downpayment_percent_max} onch={hich} name="downpayment_percent_max"
                                   label="Down-Payment Percent - Maximum" aclass=""/> : null}
                </div>

                <div className={"col s12 m6 offset-m2"} id="interest-tab">
                    <TextField val={pstate.interest_text} onch={hich} name="interest_text"
                               label="Interest Text" aclass=""/>
                    <SwitchField name="interest_is_changeable" val={pstate.interest_is_changeable}
                                 onch={hich} offtext="Fixed" ontext="Variable"
                                 label="Interest Rate Is" aclass="bottom40"/>
                    {pstate.interest_is_changeable ?
                        <TextField val={pstate.interest} onch={hich} name="interest"
                                   label="Interest Rate - Default" aclass=""/> : null}
                    {pstate.interest_is_changeable ?
                        <TextField val={pstate.interest_min} onch={hich} name="interest_min"
                                   label="Interest Rate - Mininum" aclass=""/> : null}
                    {pstate.interest_is_changeable ?
                        <TextField val={pstate.interest_max} onch={hich} name="interest_max"
                                   label="Interest Rate - Maximum" aclass=""/> : null}
                    {!pstate.interest_is_changeable ?
                        <TextField val={pstate.interest_fixed} onch={hich} name="interest_fixed"
                                   label="Interest Rate" aclass=""/> : null}
                </div>

                <div className={"col s12 m6 offset-m4"} id="tenure-tab">
                    <TextField val={pstate.tenure_text} onch={hich} name="tenure_text"
                               label="Tenure Text" aclass=""/>
                    <SwitchField name="tenure_is_changeable" val={pstate.tenure_is_changeable}
                                 onch={hich} offtext="Fixed" ontext="Variable"
                                 label="Tenure Is" aclass="bottom40"/>
                    {pstate.tenure_is_changeable ?
                        <TextField val={pstate.tenure} onch={hich} name="tenure"
                                   label="Tenure - Default (Year)" aclass=""/> : null}
                    {pstate.tenure_is_changeable ?
                        <TextField val={pstate.tenure_min} onch={hich} name="tenure_min"
                                   label="Tenure - Mininum (Year)" aclass=""/> : null}
                    {pstate.tenure_is_changeable ?
                        <TextField val={pstate.tenure_max} onch={hich} name="tenure_max"
                                   label="Tenure - Maximum (Year)" aclass=""/> : null}
                    {!pstate.tenure_is_changeable ?
                        <TextField val={pstate.tenure_fixed} onch={hich} name="tenure_fixed"
                                   label="Tenure (Year)" aclass=""/> : null}
                </div>

                <div className={"col s12 m6 offset-m5"} id="tax-tab">
                    <TextField val={pstate.property_tax_text} onch={hich} name="property_tax_text"
                               label="Property Tax Text" aclass=""/>

                    <TextField val={pstate.property_tax} onch={hich} name="property_tax"
                               label="Property Tax - Default (% Per Year)" aclass=""/>

                    <TextField val={pstate.property_tax_min} onch={hich} name="property_tax_min"
                               label="Property Tax - Mininum" aclass=""/>

                    <TextField val={pstate.property_tax_max} onch={hich} name="property_tax_max"
                               label="Property Tax - Maximum" aclass=""/>
                    <br/>
                    <TextField val={pstate.hazard_insurance_text} onch={hich} name="hazard_insurance_text"
                               label="Annual Hazard Insurance Text" aclass=""/>

                    <TextField val={pstate.hazard_insurance} onch={hich} name="hazard_insurance"
                               label="Annual Hazard Insurance- Default (Per Year)" aclass=""/>

                    <TextField val={pstate.hazard_insurance_min} onch={hich} name="hazard_insurance_min"
                               label="Annual Hazard Insurance - Mininum" aclass=""/>

                    <TextField val={pstate.hazard_insurance_max} onch={hich} name="hazard_insurance_max"
                               label="Annual Hazard Insurance - Maximum" aclass=""/>

                    <br/>
                    <TextField val={pstate.monthly_hoa_text} onch={hich} name="monthly_hoa_text"
                               label="Monthly HOA Text" aclass=""/>

                    <TextField val={pstate.monthly_hoa} onch={hich} name="monthly_hoa"
                               label="Monthly HOA" aclass=""/>

                    <TextField val={pstate.monthly_hoa_min} onch={hich} name="monthly_hoa_min"
                               label="Monthly HOA - Mininum" aclass=""/>

                    <TextField val={pstate.monthly_hoa_max} onch={hich} name="monthly_hoa_max"
                               label="Monthly HOA - Maximum" aclass=""/>

                    <br/>
                    <TextField val={pstate.mortgage_insurance_text} onch={hich} name="mortgage_insurance_text"
                               label="Mortgage Insurance Text" aclass=""/>

                    <TextField val={pstate.mortgage_insurance} onch={hich} name="mortgage_insurance"
                               label="Mortgage Insurance" aclass=""/>

                    <TextField val={pstate.mortgage_insurance_min} onch={hich} name="mortgage_insurance_min"
                               label="Mortgage Insurance - Mininum" aclass=""/>

                    <TextField val={pstate.mortgage_insurance_max} onch={hich} name="mortgage_insurance_max"
                               label="Mortgage Insurance - Maximum" aclass=""/>

                </div>

                <div className={"col s12 m6 offset-m6"} id="other-tab">
                    <TextField val={pstate.currency} onch={hich} name="currency"
                               label="Currency Symbol" aclass=""/>
                </div>
            </div>
        );
    }
}

export default SettingsForm;
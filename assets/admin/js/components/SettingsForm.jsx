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
                        <li className="tab"><a href="#other-tab">Other</a></li>
                    </ul>
                </div>

                <div className={"col s12 m6 pr50"} id="property-tab">
                    <TextField val={pstate.property_value_text} onch={hich} name="property_value_text"
                               label="Property Value Text" aclass=""/>
                    <SwitchField name="property_value_is_changeable" val={pstate.property_value_is_changeable}
                                 onch={hich} offtext="Fixed" ontext="Variable"
                                 label="Property Value Is" aclass="bottom40"/>
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

                <div className={"col s12 m6 pr50"} id="downpayment-tab">
                    <TextField val={pstate.down_amount_text} onch={hich} name="down_amount_text"
                               label="Down Payment Text" aclass=""/>
                    <SwitchField name="down_amount_is_changeable" val={pstate.down_amount_is_changeable}
                                 onch={hich} offtext="Fixed" ontext="Variable"
                                 label="Down Payment Is" aclass="bottom40"/>
                    <SwitchField name="down_amount_percent" val={pstate.down_amount_percent}
                                 onch={hich} offtext="Total Amount" ontext="Percent"
                                 label="Down Payment In" aclass="bottom40"/>
                    {!pstate.down_amount_percent && !pstate.down_amount_is_changeable ?
                        <TextField val={pstate.down_amount_fixed_fixed} onch={hich} name="down_amount_fixed_fixed"
                                   label="Down-Payment Amount" aclass=""/> : null}
                    {!pstate.down_amount_percent && pstate.down_amount_is_changeable ?
                        <TextField val={pstate.down_amount_fixed_min} onch={hich} name="property_value_min"
                                   label="Down-Payment Amount - Minimum" aclass=""/> : null}
                    {!pstate.down_amount_percent && pstate.down_amount_is_changeable ?
                        <TextField val={pstate.down_amount_fixed_max} onch={hich} name="property_value_min"
                                   label="Down-Payment Amount - Maximum" aclass=""/> : null}
                    {pstate.down_amount_percent && !pstate.down_amount_is_changeable ?
                        <TextField val={pstate.down_amount_percent_fixed} onch={hich} name="property_value_min"
                                   label="Down-Payment Percent" aclass=""/> : null}
                    {pstate.down_amount_percent && pstate.down_amount_is_changeable ?
                        <TextField val={pstate.down_amount_percent_min} onch={hich} name="property_value_min"
                                   label="Down-Payment Percent - Minimum" aclass=""/> : null}
                    {pstate.down_amount_percent && pstate.down_amount_is_changeable ?
                        <TextField val={pstate.down_amount_percent_max} onch={hich} name="property_value_min"
                                   label="Down-Payment Percent - Maxium" aclass=""/> : null}
                </div>

                <div className={"col s12 m6 pr50"} id="interest-tab">
                    <TextField val={pstate.interest_text} onch={hich} name="interest_text"
                               label="Interest Text" aclass=""/>
                    <SwitchField name="interest_is_changeable" val={pstate.interest_is_changeable}
                                 onch={hich} offtext="Fixed" ontext="Variable"
                                 label="Interest Rate Is" aclass="bottom40"/>
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
                <div className={"col s12 m6 pr50"} id="tenure-tab">
                    <TextField val={pstate.tenure_text} onch={hich} name="tenure_text"
                               label="Tenure Text" aclass=""/>
                    <SwitchField name="tenure_is_changeable" val={pstate.tenure_is_changeable}
                                 onch={hich} offtext="Fixed" ontext="Variable"
                                 label="Tenure Is" aclass="bottom40"/>
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

                <div className={"col s12 m6 pr50"} id="other-tab">
                    <TextField val={pstate.currency} onch={hich} name="currency"
                               label="Currency Symbol" aclass=""/>
                    <p>for dev reference</p>
                    <RangeField val={pstate.total_image_carousel} onch={hich} name="total_image_carousel"
                                aclass="" label="Total image to load (max 33 for this layout)" min={1}
                                max={33}/>
                    <div>
                        <div className="top20">Thumb Position</div>
                        <RadioField val="bottom" label="Bottom" name="carousel_thumb_position"
                                    curval={pstate.carousel_thumb_position} onch={hich}/>
                        <RadioField val="top" label="Top" name="carousel_thumb_position"
                                    curval={pstate.carousel_thumb_position} onch={hich}/>
                        <RadioField val="left" label="Left" name="carousel_thumb_position"
                                    curval={pstate.carousel_thumb_position} onch={hich}/>
                    </div>
                </div>
                <div className={global ? "col s12 m6 top20 pr50" : "col s12 top20 plr0"}>
                </div>
            </div>
        );
    }
}

export default SettingsForm;
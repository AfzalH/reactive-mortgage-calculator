import React, {Component} from 'react';
import RangeField from '../../../../admin/js/components/form/RangeField';
import TextField from '../../../../admin/js/components/form/TextField';


class DownpaymentInput extends Component {
    render() {
        const {form, onch} = this.props;
        return (
            form.downpayment_is_changeable ?
                form.downpayment_is_percent ?
                    <RangeField val={form.downpayment_percent}
                                min={form.downpayment_percent_min}
                                max={form.downpayment_percent_max} name="downpayment_percent"
                                onch={onch}
                                label={form.downpayment_text} step={.5}
                                prefix={form.currency + this.props.getDownpaymentAmountFromPercent() + ' - '}
                                suffix='%'/> :
                    <RangeField val={form.downpayment_amount}
                                min={Math.min(form.downpayment_amount_min,this.props.getPropertyValue())}
                                max={Math.min(form.downpayment_amount_max,this.props.getPropertyValue())}
                                name="downpayment_amount"
                                onch={onch}
                                label={form.downpayment_text} step={1000}
                                prefix={form.currency}
                                suffix={' - '+ this.props.getDownpaymentPercentFromAmount() + '%'}/>
                :
                form.downpayment_is_percent ?
                    <TextField val={form.downpayment_percent_fixed}
                               name="downpayment_percent_fixed"
                               onch={onch}
                               label={form.downpayment_text} disabled={true}/> :
                    <TextField val={form.downpayment_amount_fixed} name="downpayment_amount_fixed"
                               onch={onch}
                               label={form.downpayment_text} disabled={true}/>

        );
    }
}

export default DownpaymentInput;

import React, {Component} from 'react';
import RangeField from '../../../../admin/js/components/form/RangeField';

class MIInput extends Component {
    render() {
        const {form, onch} = this.props;
        return (
            <RangeField val={form.mortgage_insurance} min={form.mortgage_insurance_min}
                        max={form.mortgage_insurance_max} name="mortgage_insurance" onch={onch}
                        label={form.mortgage_insurance_text} step={.01}
                        suffix={'%'}/>
        );
    }
}

export default MIInput;

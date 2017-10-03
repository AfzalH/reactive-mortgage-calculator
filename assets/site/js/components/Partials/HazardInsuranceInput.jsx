import React, {Component} from 'react';
import RangeField from '../../../../admin/js/components/form/RangeField';

class HazardInsuranceInput extends Component {
    render() {
        const {form, onch} = this.props;
        return (
            <RangeField val={form.hazard_insurance} min={form.hazard_insurance_min}
                        max={form.hazard_insurance_max} name="hazard_insurance" onch={onch}
                        label={form.hazard_insurance_text} step={1}
                        prefix={form.currency}/>
        );
    }
}

export default HazardInsuranceInput;

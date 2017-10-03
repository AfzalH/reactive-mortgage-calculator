import React, {Component} from 'react';
import RangeField from '../../../../admin/js/components/form/RangeField';

class HOAInput extends Component {
    render() {
        const {form, onch} = this.props;
        return (
            <RangeField val={form.monthly_hoa} min={form.monthly_hoa_min}
                        max={form.monthly_hoa_max} name="monthly_hoa" onch={onch}
                        label={form.monthly_hoa_text} step={1}
                        prefix={form.currency}/>
        );
    }
}

export default HOAInput;

import React, {Component} from 'react';
import RangeField from '../../../../admin/js/components/form/RangeField';
import TextField from '../../../../admin/js/components/form/TextField';


class TenureInput extends Component {
    render() {
        const {form, onch} = this.props;
        return (
            form.tenure_is_changeable ?
                <RangeField val={form.tenure} min={form.tenure_min}
                            max={form.tenure_max} name="tenure" onch={onch}
                            label={form.tenure_text} step={1}
                            suffix=' Years'/> :
                <TextField val={form.tenure_fixed} name="tenure_fixed"
                           onch={onch}
                           label={form.tenure_text} disabled={true}/>

        );
    }
}

export default TenureInput;

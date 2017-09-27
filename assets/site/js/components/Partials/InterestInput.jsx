import React, {Component} from 'react';
import RangeField from '../../../../admin/js/components/form/RangeField';
import TextField from '../../../../admin/js/components/form/TextField';


class InterestInput extends Component {
    render() {
        const {form, onch} = this.props;
        return (
            form.interest_is_changeable ?
                <RangeField val={form.interest} min={form.interest_min}
                            max={form.interest_max} name="interest" onch={onch}
                            label={form.interest_text} step={.05}
                            suffix='%'/> :
                <TextField val={form.interest_fixed} name="interest_fixed"
                           onch={onch}
                           label={form.interest_text} disabled={true}/>

        );
    }
}

export default InterestInput;

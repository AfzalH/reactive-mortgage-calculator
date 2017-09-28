import React, {Component} from 'react';
import RangeField from '../../../../admin/js/components/form/RangeFieldCommaFormat';
import TextField from '../../../../admin/js/components/form/TextField';



class PropertyInput extends Component {
    render() {
        const {form, onch} = this.props;
        return (
            form.property_value_is_changeable ?
                <RangeField val={form.property_value} min={form.property_value_min}
                            max={form.property_value_max} name="property_value" onch={onch}
                            label={form.property_value_text} step={1000}
                            prefix={form.currency}/> :
                <TextField val={form.property_value_fixed} name="property_value_fixed"
                           onch={onch}
                           label={form.property_value_text} disabled={true}/>

        );
    }
}

export default PropertyInput;

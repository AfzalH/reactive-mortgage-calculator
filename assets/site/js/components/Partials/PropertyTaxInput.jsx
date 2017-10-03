import React, {Component} from 'react';
import RangeField from '../../../../admin/js/components/form/RangeField';

class PropertyTaxInput extends Component {
    render() {
        const {form, onch} = this.props;
        return (
            <RangeField val={form.property_tax} min={form.property_tax_min}
                        max={form.property_tax_max} name="property_tax" onch={onch}
                        label={form.property_tax_text} step={.05}
                        suffix='%'/>
        );
    }
}

export default PropertyTaxInput;

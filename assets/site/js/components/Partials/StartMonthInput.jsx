import React, {Component} from 'react';
import RangeField from '../../../../admin/js/components/form/RangeField';

class StartMonthInput extends Component {
    render() {
        const {form, onch} = this.props;
        return (
            <RangeField val={form.start_month} min={form.start_month_min}
                        max={form.start_month_max} name="start_month" onch={onch}
                        label={form.start_month_text} step={1}
                        suffix={form.start_month==1?' Month':' Months'}/>

        );
    }
}

export default StartMonthInput;

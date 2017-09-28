import React, {Component} from 'react';
import PropertyInput from './Partials/PropertyInput';
import DownpaymentInput from './Partials/DownpaymentInput';
import InterestInput from './Partials/InterestInput';
import TenureInput from './Partials/TenureInput';
import StartMonthInput from './Partials/StartMonthInput';

class UserInputs extends Component {
    render() {
        const {form, onch} = this.props;
        return (
            <div>
                <PropertyInput form={form} onch={onch}/>
                <DownpaymentInput form={form} onch={onch}/>
                <InterestInput form={form} onch={onch}/>
                <TenureInput form={form} onch={onch}/>
                <StartMonthInput form={form} onch={onch}/>
            </div>
        );
    }
}

export default UserInputs;

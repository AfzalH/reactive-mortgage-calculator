import React, {Component} from 'react';
import PropertyInput from './Partials/PropertyInput';
import DownpaymentInput from './Partials/DownpaymentInput';
import InterestInput from './Partials/InterestInput';
import TenureInput from './Partials/TenureInput';
import StartMonthInput from './Partials/StartMonthInput';
import PropertyTaxInput from './Partials/PropertyTaxInput';
import HazardInsuranceInput from './Partials/HazardInsuranceInput';
import HOAInput from './Partials/HOAInput';
import MIInput from './Partials/MIInput';

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
                <PropertyTaxInput form={form} onch={onch}/>
                <HazardInsuranceInput form={form} onch={onch}/>
                <HOAInput form={form} onch={onch}/>
                <MIInput form={form} onch={onch}/>
            </div>
        );
    }
}

export default UserInputs;

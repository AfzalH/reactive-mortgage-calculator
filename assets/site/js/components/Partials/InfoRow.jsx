import React, {Component} from 'react';

class InfoRow extends Component {
    render() {
        const {currency, monthly_installment, mortgage_amount, total_payable, total_interest} = this.props;
        return (
            <div className="row info-row">
                <div className="col s12 m6 center-align">
                            <span>Monthly Installment: <strong
                                className="red-text text-darken-2">{currency + d3.format(',')(monthly_installment)}</strong></span>
                </div>
                <div className="col s12 m6 center-align">
                    <span>Mortgage Amount: <strong>{currency + d3.format(',')(mortgage_amount)}</strong></span>
                </div>
                <div className="col s12 m6 center-align">
                    <span>Total Payment: <strong>{currency + d3.format(',')(total_payable)}</strong></span>
                </div>
                <div className="col s12 m6 center-align">
                    <span>Interest To Be Payed: <strong>{currency + d3.format(',')(total_interest)}</strong></span>
                </div>
            </div>
        );
    }
}

export default InfoRow;

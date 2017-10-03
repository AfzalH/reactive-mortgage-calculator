import React, {Component} from 'react';

class InfoRow extends Component {
    render() {
        const {currency, monthly_installment, mortgage_amount, total_payable, total_interest, total_property_tax} = this.props;
        return (
            <div className="row info-row">
                {false ?
                    <div className="col s12">
                        <div>
                            <span className="left">Monthly Installment: </span>
                            <strong
                                className="red-text text-darken-2">{currency + d3.format(',.2f')(monthly_installment)}</strong>
                        </div>
                    </div> : false}
                <div className="col s12">
                    <div>
                        <span className="left">Mortgage Amount:</span>
                        <strong className="right">{currency + d3.format(',.2f')(mortgage_amount)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Total Interest:</span>
                        <strong className="right">{currency + d3.format(',.2f')(total_interest)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Total Property Tax:</span>
                        <strong className="right">{currency + d3.format(',.2f')(total_property_tax)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Total Payment:</span>
                        <strong className="right">{currency + d3.format(',.2f')(total_payable)}</strong>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoRow;

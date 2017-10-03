import React, {Component} from 'react';

class InfoRowTotal extends Component {
    render() {
        const {currency, mortgage_amount, total_payable, total_interest, total_property_tax, total_mi, total_hoa, total_hazard} = this.props;
        return (
            <div className="row info-row">
                <div className="col s12">
                    <div>
                        <span className="left">Mortgage Amount:</span>
                        <strong className="right">{currency + d3.format(',.0f')(mortgage_amount)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Total Interest:</span>
                        <strong className="right">{currency + d3.format(',.0f')(total_interest)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Total Property Tax:</span>
                        <strong className="right">{currency + d3.format(',.0f')(total_property_tax)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Total MI:</span>
                        <strong className="right">{currency + d3.format(',.0f')(total_mi)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Total HOA:</span>
                        <strong className="right">{currency + d3.format(',.0f')(total_hoa)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Total HI:</span>
                        <strong className="right">{currency + d3.format(',.0f')(total_hazard)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Total Payment:</span>
                        <strong className="right red-text text-darken-2">{currency + d3.format(',.0f')(total_payable)}</strong>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoRowTotal;

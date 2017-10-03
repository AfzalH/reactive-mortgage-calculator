import React, {Component} from 'react';

class InfoRowMonthly extends Component {
    render() {
        const {currency, monthly_installment, monthly_principal_and_interest, monthly_property_tax, monthly_mi, monthly_hoa, monthly_hazard} = this.props;
        return (
            <div className="row info-row">
                <div className="col s12">
                    <div>
                        <span className="left">Principal & Interest:</span>
                        <strong
                            className="right">{currency + d3.format(',.0f')(monthly_principal_and_interest)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Property Tax:</span>
                        <strong className="right">{currency + d3.format(',.0f')(monthly_property_tax)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">MI:</span>
                        <strong className="right">{currency + d3.format(',.0f')(monthly_mi)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">HOA:</span>
                        <strong className="right">{currency + d3.format(',.0f')(monthly_hoa)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">HI:</span>
                        <strong className="right">{currency + d3.format(',.0f')(monthly_hazard)}</strong>
                    </div>
                </div>
                <div className="col s12">
                    <div>
                        <span className="left">Monthly Installment: </span>
                        <strong
                            className="red-text text-darken-2 right">{currency + d3.format(',.0f')(monthly_installment)}</strong>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoRowMonthly;

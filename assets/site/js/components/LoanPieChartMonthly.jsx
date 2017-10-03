import React, {Component} from 'react';

class LoanPieChartMonthly extends Component {
    componentDidMount() {
        const {
            id,
            monthly_installment,
            monthly_principal_and_interest,
            currency, monthly_property_tax, monthly_mi,
            monthly_hoa,
            monthly_hazard
        } = this.props;
        this.piechart = c3.generate({
            bindto: '#pie' + id,
            data: {
                columns: [
                    ['Principal & Interest', monthly_principal_and_interest],
                    ['Property Tax', monthly_property_tax],
                    ['MI', monthly_mi],
                    ['HOA', monthly_hoa],
                    ['HI', monthly_hazard]
                ],
                type: 'donut'
            },
            donut: {
                label: {
                    format: (value, ratio, id) => {
                        return d3.format('.1%')(ratio);
                    }
                },
                title: currency + d3.format(',.2f')(monthly_installment) + '/Mo',
            },
            tooltip: {
                format: {
                    value: (value, ratio, id, index) => {
                        return (currency + d3.format(',')(value.toFixed(2)));
                    }
                }
            }
        });
    }

    componentDidUpdate() {
        const {
            id,
            monthly_installment,
            monthly_principal_and_interest,
            currency,
            monthly_property_tax,
            monthly_mi,
            monthly_hoa,
            monthly_hazard
        } = this.props;
        this.piechart.load({
            columns: [
                ['Principal & Interest', monthly_principal_and_interest],
                ['Property Tax', monthly_property_tax],
                ['MI', monthly_mi],
                ['HOA', monthly_hoa],
                ['HI', monthly_hazard]

            ]
        });

        d3.select('#pie' + id + ' .c3-chart-arcs-title').node().innerHTML = currency + d3.format(',.2f')(monthly_installment) + '/Mo';

    }

    render() {
        const {id} = this.props;
        return (
            <div id={"pie"+id}>
            </div>
        );
    }
}

export default LoanPieChartMonthly;

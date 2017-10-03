import React, {Component} from 'react';

class LoanPieChart extends Component {
    componentDidMount() {
        const {id, monthly_installment, mortgage_amount, currency, total_property_tax, total_interest} = this.props;
        this.piechart = c3.generate({
            bindto: '#pie' + id,
            data: {
                columns: [
                    ['Principal', mortgage_amount],
                    ['Interest', total_interest],
                    ['Property Tax', total_property_tax]
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
        const {id, monthly_installment, mortgage_amount, currency, total_property_tax, total_interest} = this.props;
        this.piechart.load({
            columns: [
                ['Principal', mortgage_amount],
                ['Interest', total_interest],
                ['Property Tax', total_property_tax]
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

export default LoanPieChart;

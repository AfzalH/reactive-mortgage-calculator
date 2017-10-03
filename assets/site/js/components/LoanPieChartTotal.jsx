import React, {Component} from 'react';

class LoanPieChartTotal extends Component {
    componentDidMount() {
        const {id, mortgage_amount, currency, total_property_tax, total_interest, total_hoa, total_hazard, total_payable} = this.props;
        this.piechart = c3.generate({
            bindto: '#pie' + id,
            data: {
                columns: [
                    ['Principal', mortgage_amount],
                    ['Interest', total_interest],
                    ['Property Tax', total_property_tax],
                    ['HOA', total_hoa],
                    ['HI', total_hazard]
                ],
                type: 'donut'
            },
            donut: {
                label: {
                    format: (value, ratio, id) => {
                        return d3.format('.1%')(ratio);
                    }
                },
                title: currency + d3.format(',.0f')(total_payable),
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
        const {id, mortgage_amount, currency, total_property_tax, total_interest, total_hoa, total_hazard, total_payable} = this.props;
        this.piechart.load({
            columns: [
                ['Principal', mortgage_amount],
                ['Interest', total_interest],
                ['Property Tax', total_property_tax],
                ['HOA', total_hoa],
                ['HI', total_hazard]

            ]
        });

        d3.select('#pie' + id + ' .c3-chart-arcs-title').node().innerHTML = currency + d3.format(',.0f')(total_payable);

    }

    render() {
        const {id} = this.props;
        return (
            <div id={"pie"+id}>
            </div>
        );
    }
}

export default LoanPieChartTotal;

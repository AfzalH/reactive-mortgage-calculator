import React, {Component} from 'react';

class LoanPieChart extends Component {
    componentDidMount() {
        const {id, monthly_installment, mortgage_amount, tenure_in_month, currency} = this.props;
        const total_payable = (monthly_installment * tenure_in_month).toFixed(2);
        const total_interest = (total_payable - mortgage_amount).toFixed(2);
        this.piechart = c3.generate({
            bindto: '#pie' + id,
            data: {
                // iris data from R
                columns: [
                    ['Principal', mortgage_amount],
                    ['Interest', total_interest],
                ],
                type: 'donut'
            },
            donut: {
                label: {
                    format: (value, ratio, id) => {
                        return d3.format('.1%')(ratio);
                    }
                },
                title: currency + d3.format(',')(monthly_installment) + '/Mo',
            },
            tooltip: {
                format: {
                    value: (value, ratio, id, index) => {
                        return (currency + d3.format(',')(value));
                    }
                }
            }
        });
    }

    componentDidUpdate() {
        const {id, monthly_installment, mortgage_amount, tenure_in_month, currency} = this.props;
        const total_payable = monthly_installment * tenure_in_month;
        const total_interest = total_payable - mortgage_amount;
        this.piechart.load({
            columns: [
                ['Principal', mortgage_amount],
                ['Interest', total_interest],
            ]
        });

        d3.select('#pie' + id + ' .c3-chart-arcs-title').node().innerHTML = currency + d3.format(',')(monthly_installment) + '/Mo';

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

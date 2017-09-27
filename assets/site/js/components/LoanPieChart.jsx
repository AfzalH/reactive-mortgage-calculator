import React, {Component} from 'react';

class LoanPieChart extends Component {
    componentDidMount() {
        const {id, monthly_installment, mortgage_amount, tenure_in_month, currency} = this.props;
        const total_payable = monthly_installment * tenure_in_month;
        const total_interest = total_payable - mortgage_amount;
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
            },
            tooltip: {
                format: {
                    value: (value, ratio, id, index) => {
                        return (currency + value);
                    }
                }
            }
        });
    }

    componentDidUpdate() {
        const {id, monthly_installment, mortgage_amount, tenure_in_month} = this.props;
        const total_payable = monthly_installment * tenure_in_month;
        const total_interest = total_payable - mortgage_amount;
        this.piechart.load({
            columns: [
                ['Principal', mortgage_amount],
                ['Interest', total_interest],
            ]
        });
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

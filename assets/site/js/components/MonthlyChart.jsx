import React, {Component} from 'react';

class MonthlyChart extends Component {
    componentDidMount() {
        this.breakdown = c3.generate({
            bindto: '#breakdown' + this.id,
            data: {
                // x: 'x',
                columns: [
                    // ['x', 2001, 2002, 2003, 2004, 2005, 2006, 2007],
                    ['Principal', ...this.props.principal],
                    ['Interest', ...this.props.interest],
                    ['Property Tax', ...this.props.property_tax_ar],
                    ['HOA', ...this.props.hoa_ar],
                    ['HI', ...this.props.hazard_ar],
                    ['Balance', ...this.props.balance],
                ],
                axes: {
                    Balance: 'y2',
                },
                type: 'bar',
                types: {
                    Balance: 'spline'
                },
                groups: [
                    ['Principal', 'Interest', 'Property Tax', 'HOA', 'HI']
                ],
                order: null,

            },
            tooltip: {
                format: {
                    value: (value, ratio, id, index) => {
                        return (this.props.currency + d3.format(',.2f')(value));
                    },
                    title: (value)=> (this.props.months[value])
                }
            },
            axis: {
                y: {
                    label: {
                        text: 'Monthly Installment',
                        position: 'outer-middle',
                    },
                    tick: {
                        format: (value)=>(this.props.currency + d3.format(',')(value))
                    },
                    min: 0,
                    padding: {top: 10, bottom: 0}
                },
                y2: {
                    show: true,
                    label: {
                        text: 'Remaining Balance',
                        position: 'outer-middle'
                    },
                    tick: {
                        format: (value)=>(this.props.currency + d3.format(',')(value))
                    },
                    min: 0,
                    padding: {top: 10, bottom: 0}
                },
                x: {
                    tick: {
                        format: (value)=>(this.props.months[value])
                    }
                }

            }
        });
    }

    componentDidUpdate() {
        this.breakdown.load({
            columns: [
                ['Principal', ...this.props.principal],
                ['Interest', ...this.props.interest],
                ['Balance', ...this.props.balance],
                ['Property Tax', ...this.props.property_tax_ar],
                ['HOA', ...this.props.hoa_ar],
                ['HI', ...this.props.hazard_ar]
            ]
        });
    }

    render() {
        const {id, toggleBar} = this.props;
        return (
            <div className="row">
                <div className="col s12">
                    <div className="info-point center">Monthly Breakdown (<a onClick={toggleBar}>Show Yearly</a>)</div>
                    <div id={"breakdown"+id}>
                    </div>
                </div>
            </div>
        );
    }
}

export default MonthlyChart;

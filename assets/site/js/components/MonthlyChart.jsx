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
                    ['Balance', ...this.props.balance],
                ],
                axes: {
                    Balance: 'y2',
                },
                type: 'bar',
                types: {
                    Balance: 'area'
                },
                groups: [
                    ['Principal', 'Interest']
                ],
                order: null,

            },
            axis: {
                y: {
                    label: {
                        text: 'Monthly',
                        position: 'outer-middle',
                    }
                },
                y2: {
                    show: true,
                    label: {
                        text: 'Balance',
                        position: 'outer-middle'
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
            ]
        });
    }

    render() {
        const {id} = this.props;
        return (
            <div id={"breakdown"+id}>
            </div>
        );
    }
}

export default MonthlyChart;

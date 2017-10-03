import React, {Component} from 'react';

class YearlyChart extends Component {
    componentDidMount() {
        this.breakdown_yearly = c3.generate({
            bindto: '#breakdown-yearly' + this.id,
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
                    Balance: 'spline'
                },
                groups: [
                    ['Principal', 'Interest']
                ],
                order: null,

            },
            tooltip: {
                format: {
                    value: (value, ratio, id, index) => {
                        return (this.props.currency + d3.format(',.2f')(value));
                    },
                    title: (value)=> (this.props.years[value])
                }
            },
            axis: {
                y: {
                    label: {
                        text: 'Yearly Breakdown',
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
                        format: (value)=>(this.props.years[value])
                    }
                }

            }
        });
    }

    componentDidUpdate() {
        this.breakdown_yearly.load({
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
            <div className="row">
                <div className="col s12">
                    <div id={"breakdown-yearly"+id}>
                    </div>
                </div>
            </div>
        );
    }
}

export default YearlyChart;

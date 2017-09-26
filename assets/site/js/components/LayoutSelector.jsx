import React from 'react';

class LayoutSelector extends React.Component {
    constructor(props) {
        super(props);
        this.graphid = 'graph' + props.id;
    }

    componentDidMount2() {
        const interest = [50, 20, 10, 40, 15, 25, 60];
        const principal = [500, 200, 100, 400, 150, 250, 700];
        let total = interest.map((val, i)=>(val + principal[i]));
        c3.generate({
            bindto: '#' + this.graphid,
            data: {
                x: 'x',
                columns: [
                    ['x', 2001, 2002, 2003, 2004, 2005, 2006, 2007],
                    ['principal', ...principal],
                    ['interest', ...interest],
                    ['total', ...total],
                ],
                type: 'bar',
                types: {
                    total: 'scatter'
                },
                groups: [
                    ['principal', 'interest']
                ],
                order: null,

            },
            axis: {
                y: {
                    label: { // ADD
                        text: 'Total'
                    }
                }

            }
        });
    }

    render() {
        const {options} = this.props;
        return (
            <div>
                <div id={this.graphid}></div>
                <pre>{JSON.stringify(options, null, 4)}</pre>
            </div>
        )
    }
}

export default LayoutSelector;
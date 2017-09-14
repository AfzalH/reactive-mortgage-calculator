import React, {Component} from 'react'
import FlipMove from 'react-flip-move'

class RotatingText extends Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            hovering: false
        }
    }

    mouseEnter() {
        this.setState({hovering: true})
    }

    mouseLeave() {
        this.setState({hovering: false})
    }

    componentDidMount() {
        const {interval=5} = this.props
        setInterval(()=> {
            !this.state.hovering ? this.setState((pState)=>({index: pState.index + 1})) : null
        }, interval * 1000)
    }

    render() {
        const {children} = this.props
        return (
            <div onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                <FlipMove duration={500} enterAnimation="accordionVertical" leaveAnimation="accordionVertical">
                    {children.length ? children[this.state.index % children.length] : children}
                </FlipMove>
            </div>
        )
    }
}

export default RotatingText

import React from 'react';
import {connect} from 'react-redux';
import TempMessage from '../components/partials/TempMessage';
import FlipMove from 'react-flip-move';


// smart component with redux connect

const FlashMessages = ({count, messages, hidemsg}) => (
    <div className="fixed-top-right">
        <FlipMove duration={500} easing="ease-out">
            {
                count ? messages.map(msg=><TempMessage key={msg.id} msg={msg} hidemsg={hidemsg}/>) : null
            }
        </FlipMove>
    </div>
);

// map state
function mapStateToProps(state) {
    return {
        count: state.messages.count,
        messages: state.messages.messages
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        hidemsg: (id)=> {
            dispatch({
                type: 'SRIZON_INSTAGRAM_MESSAGE_EXPIRED',
                payload: id
            })
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(FlashMessages);

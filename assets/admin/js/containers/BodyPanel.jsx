import React from 'react';
import {connect} from 'react-redux';
import InstanceList from './InstanceList';
import SettingsPanel from './SettingsPanel';

class BodyPanel extends React.Component {
    render() {
        const {show_settings} = this.props;
        return (
            show_settings ? <SettingsPanel /> : <InstanceList />
        )
    }
}

// map state
function mapStateToProps(state) {
    return {
        show_settings: state.settings.show_settings
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        newAction: ()=> {
            dispatch({})
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(BodyPanel);


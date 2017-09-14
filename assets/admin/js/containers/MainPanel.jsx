import React from 'react';
import {connect} from 'react-redux';
import AppTitle from './AppTitle';
import BodyPanel from './BodyPanel';
import FlashMessages from './FlashMessages';

// smart component with redux connect

const MainPannel = ({options}) => (
    <div>

        <AppTitle />

        <FlashMessages />

        <BodyPanel />

    </div>
);

// map state
function mapStateToProps(state) {
    return {
        options: state.settings.options
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {}
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(MainPannel);

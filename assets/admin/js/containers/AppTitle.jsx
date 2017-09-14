import React from 'react';
import {connect} from 'react-redux';
import {toggleSettingsPanel} from '../actions/settingsAction';
import RotatingText from  '../components/RotatingText';

class AppTitle extends React.Component {

    render() {
        const {toggleSettingsPanel, show_settings} = this.props;
        const settings_btn_bg = show_settings ? "grey" : "blue";
        return (
            <div className="row app-title">
                <div className="col m7 title-col">
                    <h5 className="thin main-title">Reactive Mortgage Calculator
                        <a
                            className={"ml10 btn-floating btn-spin btn-floating-small waves-effect waves-light " + settings_btn_bg + " darken-3"}
                            onClick={toggleSettingsPanel}><i
                            className="material-icons">settings</i></a>
                    </h5>
                </div>
                
                <div className="col m12">
                    <RotatingText interval={5}>
                        <p key="1">You are using the free version.{' '}
                            <a href="https://srizon.com" target="_blank">Get Pro Version</a>{' '}for professional
                            support
                            and added feature.
                        </p>
                        <p key="2">Created by <a href="https://srizon.com" target="_blank">Srizon Soft.</a></p>
                        <p key="3">Post a{' '}<a href="https://srizon.com" target="_blank">Review</a>{' '}if you havn't
                            already.</p>
                    </RotatingText>
                </div>
            </div>
        );
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
        toggleSettingsPanel: () => {
            dispatch(toggleSettingsPanel())
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(AppTitle);

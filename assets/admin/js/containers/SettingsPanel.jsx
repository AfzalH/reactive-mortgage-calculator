import React from 'react';
import {connect} from 'react-redux';
import SettingsForm from '../components/SettingsForm';
import {saveGlobalSettings, toggleSettingsPanel} from '../actions/settingsAction';
import CircularLoaderRow from '../components/partials/CircularLoaderRow';

class SettingsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.globalSettings};
        this.hich = this.hich.bind(this);
    }

    componentDidMount() {
        Materialize.updateTextFields();
        jQuery('select').material_select();
    }

    componentDidUpdate() {
        Materialize.updateTextFields();
        jQuery('select').material_select();
    }

    hich(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    render() {
        const {closeSettings, saveSettings, saving_in_progress} = this.props;
        return (
            saving_in_progress ?
                <CircularLoaderRow /> :
                <div className="row">
                    <div className="col s6">
                        <h6>Global Settings</h6>
                    </div>
                    <div className="col s6">
                        <div className="right">
                            <a className="btn wave green btn-small" onClick={()=>saveSettings(this.state)}>Save</a> <a
                            className="btn wave grey btn-small" onClick={closeSettings}>Close</a>
                        </div>
                    </div>
                    <div className="col s12">
                        <hr/>
                    </div>

                    <SettingsForm hich={this.hich} pstate={this.state} global={true}/>

                </div>
        )
    }
}


// map state
function mapStateToProps(state) {
    return {
        globalSettings: state.settings.options.global,
        saving_in_progress: state.settings.saving_settings_in_progress
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        saveSettings: (settings)=> {
            dispatch(saveGlobalSettings(settings))
        },
        closeSettings: ()=> {
            dispatch(toggleSettingsPanel())
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);


import React from 'react';
import {connect} from 'react-redux';
import {successCopy, errorCopy} from '../actions/messagesAction'
import {deleteInstance, settingsClose, settingsOpen} from '../actions/instancesAction';
import AlbumListItemSettings from './AlbumListItemSettings';
import CircularLoaderRow from '../components/partials/CircularLoaderRow';


class AlbumListItem extends React.Component {

    toggleSettingsForm() {
        if (this.props.settings_open) {
            this.props.settingsClose();
        }
        else {
            this.props.settingsOpen(this.props.instance.id);
        }
    }

    componentDidMount() {
        Materialize.updateTextFields();
    }

    handleCopy() {
        const {successCopy, errorCopy} = this.props;
        this.shortcode.select();
        try {
            var successful = document.execCommand('copy');
            successful ? successCopy() : errorCopy();
        } catch (err) {
            errorCopy();
        }
    }

    render() {
        const {instances_updating, instance, deleteAlbum, settings_open} = this.props;

        let this_instance_updating = false;
        if (instances_updating.indexOf(instance.id) != -1) this_instance_updating = true;
        return (
            <div className={(settings_open == instance.id)? "col s12" : "col s12 l4 m6"}>
                <div className={(settings_open || this_instance_updating)?"card":"card small"}>
                    <div className="card-content">
                        {!settings_open ?
                            <div className="row center">
                                <span className="card-title">{instance.title}</span>
                            </div> : null}
                        {!settings_open ?
                            <div className="row plr0 top20">
                                <div className="col s10 pl0">
                                    <div className="input-field">
                                        <input className="grey-text" id="shortcode" type="text" name="shortcode"
                                               value={"[srzmort id="+instance.id+"]"}
                                               onChange={()=>{}}
                                               ref={(input)=>{this.shortcode = input}}
                                        />
                                        <label htmlFor="shortcode">ShortCode</label>
                                    </div>
                                </div>
                                <div className="col s2 pl0 input-align">
                                    <div className="copy-text blue-text text-darken-3"
                                         onClick={this.handleCopy.bind(this)}>
                                        Copy
                                    </div>
                                </div>
                            </div> : null}
                        <div className="row">
                            {this_instance_updating ?
                                <CircularLoaderRow /> :
                                (settings_open == instance.id) ?
                                    <AlbumListItemSettings instance={instance}
                                                           cancelForm={this.toggleSettingsForm.bind(this)}/>
                                    : null}
                        </div>

                    </div>
                    {!settings_open ?
                        <div className="card-action">
                            <a className="no-transform blue-text" onClick={this.toggleSettingsForm.bind(this)}>
                                {(settings_open == instance.id) ? "Hide Settings" : "Show Settings"}
                            </a>
                            <a className="right mlr0" onClick={()=>{deleteAlbum(instance.id)}}><i
                                className="material-icons red-icon">delete</i></a>
                        </div> : null}
                </div>
            </div>
        );
    }
}

// map state
function mapStateToProps(state) {
    return {
        instances_updating: state.instances.instances_updating,
        settings_open: state.instances.settings_open
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        successCopy: ()=> {
            dispatch(successCopy())
        },
        errorCopy: ()=> {
            dispatch(errorCopy())
        },
        deleteAlbum: (id)=> {
            dispatch(deleteInstance(id));
        },
        settingsOpen: (id)=> {
            dispatch(settingsOpen(id));
        },
        settingsClose: ()=> {
            dispatch(settingsClose());
        }
    }
}
// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(AlbumListItem);

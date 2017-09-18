import React from 'react';
import {connect} from 'react-redux';
import TextField from '../components/form/TextField';
import SettingsForm from '../components/SettingsForm';
import {updateInstance} from '../actions/instancesAction';

class AlbumListItemSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.instance.options, title: this.props.instance.title};
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
        const {instance, updateAlbum, cancelForm} = this.props;
        return (
            <div className="row bottom0">
                <div className="col s12 plr0">
                    <div className="row bottom40">
                        <div className="col s6 plr0">
                            <button className="btn btn-small green left"
                                    onClick={()=>{cancelForm();updateAlbum(instance.id,this.state)}}>Save
                            </button>
                        </div>
                        <div className="col s6 plr0">
                            <button className="btn btn-small right grey" onClick={cancelForm}>Cancel</button>
                        </div>
                    </div>

                    <TextField val={this.state.title} onch={this.hich} name="title"
                               label="Title"/>

                    <SettingsForm hich={this.hich} pstate={this.state}/>


                    <div className="row top30 bottom0">
                        <div className="col s6 plr0">
                            <button className="btn btn-small green left"
                                    onClick={()=>{cancelForm();updateAlbum(instance.id,this.state)}}>Save
                            </button>
                        </div>
                        <div className="col s6 plr0">
                            <button className="btn btn-small right grey" onClick={cancelForm}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// map state
function mapStateToProps(state) {
    return {
        instances_updating: state.instances.instances_updating
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        updateAlbum: (id, settings)=> {
            dispatch(updateInstance(id, settings))
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(AlbumListItemSettings);

import React from 'react';
import {connect} from 'react-redux';
import TextField from '../components/form/TextField';
import SettingsForm from '../components/SettingsForm';
import {updateAlbum} from '../actions/albumsAction';

class AlbumListItemSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.album.options, title: this.props.album.title};
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
        const {album, updateAlbum, cancelForm} = this.props;
        return (
            <div className="row bottom0">
                <div className="col s12 plr0">
                    <div className="row bottom40">
                        <div className="col s6 plr0">
                            <button className="btn btn-small green left"
                                    onClick={()=>{cancelForm();updateAlbum(album.id,this.state)}}>Save
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
                                    onClick={()=>{cancelForm();updateAlbum(album.id,this.state)}}>Save
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
        albums_updating: state.instances.albums_updating
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        updateAlbum: (id, settings)=> {
            dispatch(updateAlbum(id, settings))
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(AlbumListItemSettings);

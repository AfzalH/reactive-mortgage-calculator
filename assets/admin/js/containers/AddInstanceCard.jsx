import React from 'react';
import {connect} from 'react-redux';
import {newInstance, cancelInstance, saveInstance} from '../actions/instancesAction';
import AddInstanceFront from '../components/add-new/AddInstanceFront';
import AddInstanceForm from '../components/add-new/AddInstanceForm';

// smart component with redux connect

class AddInstanceCard extends React.Component {
    render() {
        const {newUserAlbum, cancelUserAlbum, open_form, saveUserAlbum} = this.props;
        return (
            <div className="col s12 l4 m6">
                {!open_form ?
                    <AddInstanceFront newUserAlbum={newUserAlbum}/> :
                    <AddInstanceForm cancelUserAlbum={cancelUserAlbum} saveUserAlbum={saveUserAlbum}/>
                }
            </div>
        )
    }
}

// map state
function mapStateToProps(state) {
    return {
        open_form: state.settings.open_instance_form
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        newUserAlbum: ()=> {
            dispatch(newInstance())
        },
        cancelUserAlbum: ()=> {
            dispatch(cancelInstance())
        },
        saveUserAlbum: (data)=> {
            dispatch(saveInstance(data))
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(AddInstanceCard);

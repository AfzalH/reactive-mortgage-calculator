import React from 'react';
import {connect} from 'react-redux';
import {newHashtagAlbum, cancelHashtagAlbum, saveHashtagAlbum} from '../actions/albumsAction';
import AddHashtagAlbumFront from '../components/add-new/AddHashtagAlbumFront'
import AddHashtagAlbumForm from '../components/add-new/AddHashtagAlbumForm'


// smart component with redux connect

const AddHashTagAlbumCard = ({newHashtagAlbum, open_form, saveHashtagAlbum, cancelHashtagAlbum}) => (
    <div className="col s12 l4 m6">
        {!open_form ?
            <AddHashtagAlbumFront newHashtagAlbum={newHashtagAlbum}/>
            :
            <AddHashtagAlbumForm cancelHashtagAlbum={cancelHashtagAlbum} saveHashtagAlbum={saveHashtagAlbum}/>

        }
    </div>
);

// map state
function mapStateToProps(state) {
    return {
        open_form: state.settings.open_hashtag_album_form
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        newHashtagAlbum: ()=> {
            dispatch(newHashtagAlbum())
        },
        cancelHashtagAlbum: ()=> {
            dispatch(cancelHashtagAlbum())
        },
        saveHashtagAlbum: (album)=> {
            dispatch(saveHashtagAlbum(album))
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(AddHashTagAlbumCard);

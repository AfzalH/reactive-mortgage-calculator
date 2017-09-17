import {
    successAlbumSaved,
    errorReceived,
    errorRequesting,
    successAlbumDelete,
    errorUnknown,
    successAlbumUpdated
} from './messagesAction';

export function newUserAlbum() {
    return {
        type: 'SRIZON_MORTGAGE_SETTINGS_NEW_USER_ALBUM'
    }
}

export function cancelUserAlbum() {
    return {
        type: 'SRIZON_MORTGAGE_SETTINGS_CANCEL_USER_ALBUM'
    }
}

export function saveUserAlbum(instanceData) {
    return (dispatch) => {
        dispatch({type: 'SRIZON_MORTGAGE_SETTINGS_SAVING_INSTANCE'});
        axios.post(srzinstbase + 'instance', {title: instanceData.title})
            .then((response)=> {
                if (response.data.result == 'saved') {
                    dispatch(successAlbumSaved());
                    dispatch({type: 'SRIZON_MORTGAGE_SETTINGS_SAVED_USER_ALBUM', payload: response.data.albums});
                }
                else {
                    dispatch({type: 'SRIZON_MORTGAGE_SETTINGS_CANCEL_USER_ALBUM'});
                }
            })
            .catch((error)=> {
                if (error.response) {
                    dispatch(errorReceived(error));
                    dispatch({type: 'SRIZON_MORTGAGE_SETTINGS_NEW_USER_ALBUM'});
                }
                else if (error.request) {
                    dispatch(errorRequesting(error));
                    dispatch({type: 'SRIZON_MORTGAGE_SETTINGS_NEW_USER_ALBUM'});
                }
            })
    };
}


export function deleteAlbum(id) {
    if ((window.confirm('Are you sure?'))) {
        return (dispatch) => {
            dispatch({type: 'SRIZON_MORTGAGE_ALBUM_DELETEING', payload: id});
            axios.delete(srzinstbase + 'album/' + id)
                .then((response)=> {
                    if (response.data.result == 'deleted') {
                        dispatch(successAlbumDelete());
                        dispatch({type: 'SRIZON_MORTGAGE_ALBUM_DELETED', payload: response.data.albums});
                    }
                })
                .catch(()=> {
                    dispatch(errorUnknown());
                    dispatch({type: 'ACTION_CANCELLED'});
                })
        };

    } else {
        return {type: 'ACTION_CANCELLED'}
    }
}

export function updateAlbum(id, settings) {
    return (dispatch)=> {
        dispatch({type: 'SRIZON_MORTGAGE_ALBUM_UPDATING', payload: id});
        axios.post(srzinstbase + 'album-settings', {id: id, settings: settings})
            .then((response)=> {
                if (response.data.result == 'updated') {
                    dispatch(successAlbumUpdated());
                    dispatch({type: 'SRIZON_MORTGAGE_ALBUM_UPDATED', payload: {id: id, albums: response.data.albums}});
                }
            })
            .catch(()=> {
                dispatch(errorUnknown());
                dispatch({type: 'ACTION_CANCELLED'});
            })
    }
}
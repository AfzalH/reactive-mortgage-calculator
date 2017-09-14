import {
    successAlbumSaved,
    errorReceived,
    errorRequesting,
    successAlbumDelete,
    errorUnknown,
    successAlbumUpdated
} from './messagesAction';

export function newHashtagAlbum() {
    return {
        type: 'SRIZON_INSTAGRAM_SETTINGS_NEW_HASHTAG_ALBUM'
    }
}

export function cancelHashtagAlbum() {
    return {
        type: 'SRIZON_INSTAGRAM_SETTINGS_CANCEL_HASHTAG_ALBUM'
    }
}

export function saveHashtagAlbum(album) {
    return (dispatch)=> {
        dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_SAVING_HASHTAG_ALBUM'});
        console.log(album);
        axios.post(srzinstbase + 'hashtagalbum', {
            hashtag: album.hashtag,
            title: album.title
        })
            .then((response)=> {
                if (response.data.result == 'saved') {
                    dispatch(successAlbumSaved());
                    dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_SAVED_HASHTAG_ALBUM', payload: response.data.albums});
                }
                else {
                    dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_CANCEL_HASHTAG_ALBUM'});
                }
            })
            .catch((error)=> {
                if (error.response) {
                    dispatch(errorReceived(error));
                    dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_NEW_HASHTAG_ALBUM'});
                }
                else if (error.request) {
                    dispatch(errorRequesting(error));
                    dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_NEW_HASHTAG_ALBUM'});
                }
            })
    }
}

export function newUserAlbum() {
    return {
        type: 'SRIZON_INSTAGRAM_SETTINGS_NEW_USER_ALBUM'
    }
}

export function cancelUserAlbum() {
    return {
        type: 'SRIZON_INSTAGRAM_SETTINGS_CANCEL_USER_ALBUM'
    }
}

export function saveUserAlbum(album) {
    return (dispatch) => {
        dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_SAVING_USER_ALBUM'});
        axios.post(srzinstbase + 'useralbum', {username: album.username, title: album.title})
            .then((response)=> {
                if (response.data.result == 'saved') {
                    dispatch(successAlbumSaved());
                    dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_SAVED_USER_ALBUM', payload: response.data.albums});
                }
                else if (response.data.result == 'selection') {
                    dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_TEMP_ALBUM_TITLE', payload: album.title});
                    dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_USER_SELECTION', payload: response.data.users});
                }
                else {
                    dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_CANCEL_USER_ALBUM'});
                }
            })
            .catch((error)=> {
                if (error.response) {
                    dispatch(errorReceived(error));
                    dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_NEW_USER_ALBUM'});
                }
                else if (error.request) {
                    dispatch(errorRequesting(error));
                    dispatch({type: 'SRIZON_INSTAGRAM_SETTINGS_NEW_USER_ALBUM'});
                }
            })
    };
}


export function deleteAlbum(id) {
    if ((window.confirm('Are you sure?'))) {
        return (dispatch) => {
            dispatch({type: 'SRIZON_INSTAGRAM_ALBUM_DELETEING', payload: id});
            axios.delete(srzinstbase + 'album/' + id)
                .then((response)=> {
                    if (response.data.result == 'deleted') {
                        dispatch(successAlbumDelete());
                        dispatch({type: 'SRIZON_INSTAGRAM_ALBUM_DELETED', payload: response.data.albums});
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
        dispatch({type: 'SRIZON_INSTAGRAM_ALBUM_UPDATING', payload: id});
        axios.post(srzinstbase + 'album-settings', {id: id, settings: settings})
            .then((response)=> {
                if (response.data.result == 'updated') {
                    dispatch(successAlbumUpdated());
                    dispatch({type: 'SRIZON_INSTAGRAM_ALBUM_UPDATED', payload: {id: id, albums: response.data.albums}});
                }
            })
            .catch(()=> {
                dispatch(errorUnknown());
                dispatch({type: 'ACTION_CANCELLED'});
            })
    }
}
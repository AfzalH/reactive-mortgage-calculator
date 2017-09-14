import store from '../store';

export function getAlbum(id) {
    return (dispatch) => {
        axios.get(srzinstbase + 'album/' + id)
            .then((response) => {
                if (response.data.result == 'success') {
                    dispatch({
                        type: 'ALBUM_OPTIONS_LOADED',
                        id: id,
                        payload: response.data.album
                    });
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: 'ALBUM_ERROR_RECEIVED', id: id, payload: error.response });
                }
                else if (error.request) {
                    dispatch({ type: 'ALBUM_ERROR_REQUESTING', id: id, payload: error.request });
                }
            })
    }
}

export function getAlbumData(id) {
    return (dispatch) => {
        axios.post(srzinstbase + 'album-data', { id: id })
            .then((response) => {
                if (response.data.result == 'success') {
                    dispatch({
                        type: 'ALBUM_DATA_LOADED',
                        id: id,
                        payload: response.data.data
                    });
                    dispatch(backgroundUpdate(id));
                    dispatch(preFetchData(id, response.data.data.pagination.next_url));
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: 'ALBUM_DATA_ERROR_RECEIVED', id: id, payload: error.response });
                }
                else if (error.request) {
                    dispatch({ type: 'ALBUM_DATA_ERROR_REQUESTING', id: id, payload: error.request });
                }
            })
    }
}

function backgroundUpdate(id) {
    return (dispatch) => {
        axios.post(srzinstbase + 'album-sync', { id: id })
            .then((response) => {
                dispatch({
                    type: 'ALBUM_DATA_SYNCED',
                    id: id,
                    payload: response.data.data
                })
            })
    }
}

export function loadMoreData(id, url) {
    return (dispatch) => {
        const prefetched_data = store.getState().albums[id].prefetched_data;
        if (prefetched_data) {
            dispatch({
                type: 'ALBUM_DATA_LOADING_MORE',
                id: id
            });
            dispatch({
                type: 'ALBUM_DATA_LOADED_MORE_PREFETCH',
                id: id,
                payload: prefetched_data
            });
            dispatch(preFetchData(id, prefetched_data.pagination.next_url));
        }
        else if (url) {
            dispatch({
                type: 'ALBUM_DATA_LOADING_MORE',
                id: id
            });
            axios.post(srzinstbase + 'album-load-more', { id: id, url: url })
                .then((response) => {
                    if (response.data.result == 'success') {
                        dispatch({
                            type: 'ALBUM_DATA_LOADED_MORE',
                            id: id,
                            payload: response.data.data
                        });
                        dispatch(preFetchData(id, response.data.data.pagination.next_url));
                    }
                });
        }
    }
}

export function preFetchData(id, url) {
    return (dispatch) => {
        if (url) {
            dispatch({
                type: 'ALBUM_DATA_PREFETCHING',
                id: id
            });
            axios.post(srzinstbase + 'album-load-more', { id: id, url: url })
                .then((response) => {
                    if (response.data.result == 'success') {
                        dispatch({
                            type: 'ALBUM_DATA_PREFETCHED',
                            id: id,
                            payload: response.data.data
                        });
                    }
                });
        }
    }
}
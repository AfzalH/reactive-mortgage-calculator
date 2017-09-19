export function getAlbum(id) {
    return (dispatch) => {
        axios.get(srzmortbase + 'instance/' + id)
            .then((response) => {
                if (response.data.result == 'success') {
                    dispatch({
                        type: 'INSTANCE_OPTIONS_LOADED',
                        id: id,
                        payload: response.data.instance
                    });
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: 'INSTANCE_ERROR_RECEIVED', id: id, payload: error.response });
                }
                else if (error.request) {
                    dispatch({ type: 'INSTANCE_ERROR_REQUESTING', id: id, payload: error.request });
                }
            })
    }
}

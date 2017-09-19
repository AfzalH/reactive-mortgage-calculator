import {
    successInstanceSaved,
    errorReceived,
    errorRequesting,
    successInstanceDelete,
    errorUnknown,
    successInstanceUpdated
} from './messagesAction';

export function newInstance() {
    return {
        type: 'SRIZON_MORTGAGE_SETTINGS_NEW_INSTANCE'
    }
}

export function cancelInstance() {
    return {
        type: 'SRIZON_MORTGAGE_SETTINGS_CANCEL_INSTANCE'
    }
}

export function settingsOpen(id) {
    return {
        type: 'SRIZON_MORTGAGE_INSTANCE_SETTINGS_OPEN',
        payload: id
    }
}
export function settingsClose() {
    return {
        type: 'SRIZON_MORTGAGE_INSTANCE_SETTINGS_OPEN'
    }
}

export function saveInstance(instanceData) {
    return (dispatch) => {
        dispatch({type: 'SRIZON_MORTGAGE_SETTINGS_SAVING_INSTANCE'});
        axios.post(srzmortbase + 'instance', {title: instanceData.title})
            .then((response)=> {
                if (response.data.result == 'saved') {
                    dispatch(successInstanceSaved());
                    dispatch({type: 'SRIZON_MORTGAGE_SETTINGS_SAVED_INSTANCE', payload: response.data.instances});
                }
                else {
                    dispatch({type: 'SRIZON_MORTGAGE_SETTINGS_CANCEL_INSTANCE'});
                }
            })
            .catch((error)=> {
                if (error.response) {
                    dispatch(errorReceived(error));
                    dispatch({type: 'SRIZON_MORTGAGE_SETTINGS_NEW_INSTANCE'});
                }
                else if (error.request) {
                    dispatch(errorRequesting(error));
                    dispatch({type: 'SRIZON_MORTGAGE_SETTINGS_NEW_INSTANCE'});
                }
            })
    };
}


export function deleteInstance(id) {
    if ((window.confirm('Are you sure?'))) {
        return (dispatch) => {
            dispatch({type: 'SRIZON_MORTGAGE_INSTANCE_DELETEING', payload: id});
            axios.delete(srzmortbase + 'instance/' + id)
                .then((response)=> {
                    if (response.data.result == 'deleted') {
                        dispatch(successInstanceDelete());
                        dispatch({type: 'SRIZON_MORTGAGE_INSTANCE_DELETED', payload: response.data.instances});
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

export function updateInstance(id, settings) {
    return (dispatch)=> {
        dispatch({type: 'SRIZON_MORTGAGE_INSTANCE_UPDATING', payload: id});
        axios.post(srzmortbase + 'instance-settings', {id: id, settings: settings})
            .then((response)=> {
                if (response.data.result == 'updated') {
                    dispatch(successInstanceUpdated());
                    dispatch({type: 'SRIZON_MORTGAGE_INSTANCE_UPDATED', payload: {id: id, instances: response.data.instances}});
                }
            })
            .catch(()=> {
                dispatch(errorUnknown());
                dispatch({type: 'ACTION_CANCELLED'});
            })
    }
}
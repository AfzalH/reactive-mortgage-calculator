const initial_state = {
    instances: [],
    instances_updating: [],
    settings_open: false,
    initial_load: false
};
export default function instanceReducer(state = initial_state, action) {
    switch (action.type) {
        case 'SRIZON_MORTGAGE_INSTANCE_SETTINGS_OPEN':
            return {...state, settings_open: action.payload};
        case 'SRIZON_MORTGAGE_INSTANCE_SETTINGS_CLOSE':
            return {...state, settings_open: false};
        case 'SRIZON_MORTGAGE_INSTANCES_RECEIVED':
            return {...state, initial_load: true, instances: action.payload};
        case 'SRIZON_MORTGAGE_INSTANCE_DELETEING':
            return {...state, instances: state.instances.filter(instance=>(instance.id != action.payload))};
        case 'SRIZON_MORTGAGE_INSTANCE_DELETED':
            return {...state, instances: action.payload};
        case 'SRIZON_MORTGAGE_INSTANCE_ADDED':
            return {...state, instances: [...state.instances, action.payload]};
        case 'SRIZON_MORTGAGE_SETTINGS_SAVED_INSTANCE':
            return {...state, instances: action.payload, settings_open: false};
        case 'SRIZON_MORTGAGE_INSTANCE_UPDATING':
            return {...state, instances_updating: [...state.instances_updating, action.payload]};
        case 'SRIZON_MORTGAGE_INSTANCE_UPDATED':
            return {
                ...state,
                instances_updating: state.instances_updating.filter(id=>(id != action.payload.id)),
                instances: action.payload.instances
            };
        default:
            return state;
    }
}
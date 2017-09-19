const initialState = {};
export default function instanceReducer(state = initialState, action) {
    switch (action.type) {
        case 'INIT_INSTANCES':
            return {
                ...state,
                [action.id]: {
                    options_loaded: false,
                    error_received: false
                }
            };
            break;
        case 'INSTANCE_OPTIONS_LOADED':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    options_loaded: true,
                    error_received: false,
                    options: action.payload
                }
            };
            break;
        case 'INSTANCE_ERROR_RECEIVED':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    error_received: action.payload.data.message
                }
            };
            break;
        default:
            return state;
    }
}

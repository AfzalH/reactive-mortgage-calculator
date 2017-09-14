const initialState = {};
export default function albumReducer(state = initialState, action) {
    switch (action.type) {
        case 'INIT_ALBUMS':
            return {
                ...state,
                [action.id]: {
                    options_loaded: false,
                    data_loaded: false,
                    prefetching: false,
                    prefetched_data: false,
                    error_received: false,
                    loading_more: false
                }
            };
            break;
        case 'ALBUM_OPTIONS_LOADED':
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
        case 'ALBUM_ERROR_RECEIVED':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    error_received: action.payload.data.message
                }
            };
            break;
        case 'ALBUM_DATA_LOADED':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    data_loaded: true,
                    data: action.payload
                }
            };
            break;
        case 'ALBUM_DATA_LOADING_MORE':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    loading_more: true
                }
            };
            break;
        case 'ALBUM_DATA_PREFETCHING':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    prefetching: true,
                    prefetched_data: false
                }
            };
            break;
        case 'ALBUM_DATA_PREFETCHED':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    prefetching: false,
                    prefetched_data: {
                        data: [...action.payload.data],
                        meta: action.payload.meta,
                        pagination: action.payload.pagination
                    }
                }
            };
            break;
        case 'ALBUM_DATA_LOADED_MORE':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    data_loaded: true,
                    loading_more: false,
                    data: {
                        data: [...state[action.id].data.data, ...action.payload.data].slice(0, 17 * 3),
                        meta: action.payload.meta,
                        pagination: (state[action.id].data.data.length + action.payload.data.length) >= (17 * 3) ? false : action.payload.pagination
                    }
                }
            };
            break;
        case 'ALBUM_DATA_LOADED_MORE_PREFETCH':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    data_loaded: true,
                    loading_more: false,
                    data: {
                        data: [...state[action.id].data.data, ...action.payload.data].slice(0, 17 * 3),
                        meta: action.payload.meta,
                        pagination: (state[action.id].data.data.length + action.payload.data.length) >= (17 * 3) ? false : action.payload.pagination
                    },
                    prefetching: false,
                    prefetched_data: false
                }
            };
            break;
        default:
            return state;
    }
}

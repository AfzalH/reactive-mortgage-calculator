const initialState = {};
export default function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'INC':
            return {...state, [action.payload]: (state[action.payload] !== undefined) ? state[action.payload] + 1 : 0};
            break;
        case 'DEC':
            return {...state, [action.payload]: (state[action.payload] !== undefined) ? state[action.payload] - 1 : 0};
            break;
        default:
            return state;
    }
}
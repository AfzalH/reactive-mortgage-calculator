const initial_state = {
    albums: [],
    albums_updating: [],
    initial_load: false
};
export default function albumsReducer(state = initial_state, action) {
    switch (action.type) {
        case 'SRIZON_MORTGAGE_ALBUMS_RECEIVED':
            return {...state, initial_load: true, albums: action.payload};
        case 'SRIZON_MORTGAGE_ALBUM_DELETEING':
            return {...state, albums: state.albums.filter(album=>(album.id != action.payload))};
        case 'SRIZON_MORTGAGE_ALBUM_DELETED':
            return {...state, albums: action.payload};
        case 'SRIZON_MORTGAGE_ALBUM_ADDED':
            return {...state, albums: [...state.instances, action.payload]};
        case 'SRIZON_MORTGAGE_SETTINGS_SAVED_USER_ALBUM':
            return {...state, albums: action.payload};
        case 'SRIZON_MORTGAGE_ALBUM_UPDATING':
            return {...state, albums_updating: [...state.instances_updating, action.payload]};
        case 'SRIZON_MORTGAGE_ALBUM_UPDATED':
            return {
                ...state,
                albums_updating: state.instances_updating.filter(id=>(id != action.payload.id)),
                albums: action.payload.albums
            };
        default:
            return state;
    }
}
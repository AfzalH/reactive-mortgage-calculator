const initial_state = {
    init: true,
    user_removing: false,
    open_user_album_form: false,
    open_hashtag_album_form: false,
    show_user_selection_prompt: false,
    users_to_select: false,
    temp_album_title: '',
    saving_instance_in_progress: false,
    show_settings: false,
    saving_hashtag_in_progress: false,
    saving_settings_in_progress: false
};
export default function settingsReducer(state = initial_state, action) {
    switch (action.type) {
        case 'SRIZON_INSTAGRAM_SETTINGS_RECEIVED':
            return {...state, init: false, options: action.payload, user_removing: false};
        case 'SRIZON_INSTAGRAM_SETTINGS_USER_REMOVEING':
            return {...state, user_removing: true};
        case 'SRIZON_INSTAGRAM_SETTINGS_TOGGLE_SETTINGS_PANEL':
            return {...state, show_settings: !state.show_settings};
        case 'SRIZON_INSTAGRAM_SETTINGS_NEW_USER_ALBUM':
            return {...state, open_user_album_form: true, saving_instance_in_progress: false};
        case 'SRIZON_INSTAGRAM_SETTINGS_CANCEL_USER_ALBUM':
            return {
                ...state,
                open_user_album_form: false,
                saving_instance_in_progress: false,
                show_user_selection_prompt: false
            };
        case 'SRIZON_INSTAGRAM_SETTINGS_NEW_HASHTAG_ALBUM':
            return {...state, open_hashtag_album_form: true, saving_hashtag_in_progress: false};
        case 'SRIZON_INSTAGRAM_SETTINGS_CANCEL_HASHTAG_ALBUM':
            return {...state, open_hashtag_album_form: false, saving_hashtag_in_progress: false};
        case 'SRIZON_INSTAGRAM_SETTINGS_TEMP_ALBUM_TITLE':
            return {...state, temp_album_title: action.payload};
        case 'SRIZON_INSTAGRAM_SETTINGS_SAVING_USER_ALBUM':
            return {...state, saving_instance_in_progress: true, show_user_selection_prompt: false};
        case 'SRIZON_INSTAGRAM_SETTINGS_SAVING_HASHTAG_ALBUM':
            return {...state, saving_hashtag_in_progress: true};
        case 'SRIZON_INSTAGRAM_SETTINGS_SAVED_USER_ALBUM':
            return {...state, open_user_album_form: false, saving_instance_in_progress: false};
        case 'SRIZON_INSTAGRAM_SETTINGS_SAVED_HASHTAG_ALBUM':
            return {...state, open_hashtag_album_form: false, saving_hashtag_in_progress: false};
        case 'SRIZON_INSTAGRAM_SETTINGS_USER_SELECTION':
            return {...state, show_user_selection_prompt: true, users_to_select: action.payload};
        case 'SRIZON_INSTAGRAM_SETTINGS_SAVING_GLOBAL':
            return {...state, saving_settings_in_progress: true};
        case 'SRIZON_INSTAGRAM_SETTINGS_SAVING_ERROR_GLOBAL':
            return {...state, saving_settings_in_progress: false};
        case 'SRIZON_INSTAGRAM_SETTINGS_SAVED_GLOBAL':
            return {
                ...state,
                options: {...state.options, global: action.payload},
                saving_settings_in_progress: false,
                show_settings: false
            };
        default:
            return state;
    }
}
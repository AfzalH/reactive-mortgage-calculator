const initial_state = {
    init: true,
    open_instance_form: false,
    saving_instance_in_progress: false,
    show_settings: false,
    saving_settings_in_progress: false
};
export default function settingsReducer(state = initial_state, action) {
    switch (action.type) {
        case 'SRIZON_MORTGAGE_SETTINGS_RECEIVED':
            return {...state, init: false, options: action.payload};
        case 'SRIZON_MORTGAGE_SETTINGS_TOGGLE_SETTINGS_PANEL':
            return {...state, show_settings: !state.show_settings};
        case 'SRIZON_MORTGAGE_SETTINGS_NEW_INSTANCE':
            return {...state, open_instance_form: true, saving_instance_in_progress: false};
        case 'SRIZON_MORTGAGE_SETTINGS_CANCEL_INSTANCE':
            return {
                ...state,
                open_instance_form: false,
                saving_instance_in_progress: false,
            };
        case 'SRIZON_MORTGAGE_SETTINGS_SAVING_INSTANCE':
            return {...state, saving_instance_in_progress: true};
        case 'SRIZON_MORTGAGE_SETTINGS_SAVED_INSTANCE':
            return {...state, open_instance_form: false, saving_instance_in_progress: false};
        case 'SRIZON_MORTGAGE_SETTINGS_SAVING_GLOBAL':
            return {...state, saving_settings_in_progress: true};
        case 'SRIZON_MORTGAGE_SETTINGS_SAVING_ERROR_GLOBAL':
            return {...state, saving_settings_in_progress: false};
        case 'SRIZON_MORTGAGE_SETTINGS_SAVED_GLOBAL':
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
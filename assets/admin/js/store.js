import {createStore, combineReducers, applyMiddleware} from 'redux';
import settingsReducer from './reducers/settingsReducer';
import instanceReducer from './reducers/instanceReducer';
import messagesReducer from './reducers/messagesReducer';
import thunk from 'redux-thunk';

// flip commented/uncommented parts below this line to dev/prod build

import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';


export default  createStore(combineReducers({
    settings: settingsReducer,
    messages: messagesReducer,
    instances: instanceReducer
}), composeWithDevTools(applyMiddleware(logger, thunk)));

// export default  createStore(combineReducers({
//     settings: settingsReducer,
//     messages: messagesReducer,
//     instances: instanceReducer
// }), applyMiddleware(thunk));
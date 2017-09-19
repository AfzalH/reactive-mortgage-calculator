import {createStore, combineReducers, applyMiddleware} from 'redux';
import instanceReducer from './reducers/instanceReducer';
import thunk from 'redux-thunk';

// flip commented/uncommented parts below this line to dev/prod build

import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
export default  createStore(combineReducers({
    instances: instanceReducer
}), composeWithDevTools(applyMiddleware(logger, thunk)));

// export default  createStore(combineReducers({
//     instances: instanceReducer
// }), applyMiddleware(thunk));
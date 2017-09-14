import {createStore, combineReducers, applyMiddleware} from 'redux';
import albumReducer from './reducers/albumReducer';
import thunk from 'redux-thunk';

// flip commented/uncommented parts below this line to dev/prod build

// import logger from 'redux-logger';
// import {composeWithDevTools} from 'redux-devtools-extension';
// export default  createStore(combineReducers({
//     albums: albumReducer
// }), composeWithDevTools(applyMiddleware(logger, thunk)));

export default  createStore(combineReducers({
    albums: albumReducer
}), applyMiddleware(thunk));
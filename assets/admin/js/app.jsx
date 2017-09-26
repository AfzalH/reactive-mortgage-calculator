import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import {Provider} from 'react-redux';
import Base from './containers/Base';
import {loadSettings} from './actions/settingsAction';

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Base/>
        </Provider>
        ,
        document.getElementById('srizon-mortgage-admin')
    );
};

window.axios = require('axios');

if (wpApiSettings) {
    window.axios.defaults.headers.common['X-WP-Nonce'] = wpApiSettings.nonce;
    window.srzmortbase = wpApiSettings.root + 'srizon-mortgage/v1/';
}
window.store = store;
store.dispatch(loadSettings());
store.subscribe(render);
render();

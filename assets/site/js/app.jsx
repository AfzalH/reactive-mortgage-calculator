import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import {Provider} from 'react-redux';
import Base from './containers/Base';

const render = () => {
    var elements = document.querySelectorAll('.srzmort');
    Array.prototype.forEach.call(elements, function (el, i) {
        const id = el.getAttribute('data-id');
        ReactDOM.render(
            <Provider store={store}>
                <Base id={id}/>
            </Provider>
            ,
            elements[i]
        );
    });

    // jQuery('.srzmort').each(function () {
    //     const id = jQuery(this).data('id');
    //     ReactDOM.render(
    //         <Provider store={store}>
    //             <Base id={id}/>
    //         </Provider>
    //         ,
    //         this
    //     );
    // });
};

window.axios = require('axios');
window.store = store;

if (wpApiSettings) {
    window.axios.defaults.headers.common['X-WP-Nonce'] = wpApiSettings.nonce;
    window.srzmortbase = wpApiSettings.root + 'srizon-mortgage/v1/';
}
var elements = document.querySelectorAll('.srzmort');
Array.prototype.forEach.call(elements, function (el) {
    const id = el.getAttribute('data-id');
    store.dispatch({type: 'INIT_INSTANCES', id: id});
});

// jQuery('.srzmort').each(function () {
//     const id = jQuery(this).data('id');
//     store.dispatch({type: 'INIT_INSTANCES', id: id});
//     // axios.get(srzmortbase + 'instance/' + id);
// });

store.subscribe(render);
render();

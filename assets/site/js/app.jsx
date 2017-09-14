import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import {Provider} from 'react-redux';
import Base from './containers/Base';

const render = () => {
    var elements = document.querySelectorAll('.srzinst');
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

    // jQuery('.srzinst').each(function () {
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
    window.srzinstbase = wpApiSettings.root + 'srizon-instagram/v1/';
}
var elements = document.querySelectorAll('.srzinst');
Array.prototype.forEach.call(elements, function (el) {
    const id = el.getAttribute('data-id');
    store.dispatch({type: 'INIT_ALBUMS', id: id});
});

// jQuery('.srzinst').each(function () {
//     const id = jQuery(this).data('id');
//     store.dispatch({type: 'INIT_ALBUMS', id: id});
//     // axios.get(srzinstbase + 'album/' + id);
// });

store.subscribe(render);
render();

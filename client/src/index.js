import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Router from './router';
import { getCookie } from './util/cookie-utils';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
//For importing stylesheets -> import './public/stylesheets/pollasenvinagre.scss';

const store = createStore( reducers, {}, applyMiddleware(reduxThunk));

const token = getCookie('token');
if(token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}><Router /></Provider>,
    document.querySelector('.wrapper')
);
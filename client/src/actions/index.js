import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from '../util/cookie-utils';
import { AUTH_USER,
        AUTH_ERROR,
        CURRENT_USER,
        UNAUTH_USER,
        PROTECTED_TEST } from './types';

const API_URL = 'http://localhost:3000/api';

export function errorHandler(dispatch, error, type) {
    let errorMessage = "";

    if(error.data.error) {
        errorMessage = error.data.error;
    } else if(error.data){
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }

    if(error.status === 401) {
        dispatch({
            type: type,
            payload: 'You are not authorized to do this. Please login and try again.'
        });
        logoutUser();
    } else {
        dispatch({
            type: type,
            payload: errorMessage
        });
    }
}

export function loginUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${API_URL}/auth/login`, { email, password })
            .then(response => {
				setCookie('token', response.data.token, { maxAge: response.tokenExpiration, path: '/' });
                dispatch({ type: AUTH_USER });
                window.location.href = '/dashboard'
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function registerUser({ email, firstName, lastName, password }) {
    return function(dispatch) {
        axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
            .then(response => {
				setCookie('token', response.token, { maxAge: response.tokenExpiration });
                dispatch({ type: AUTH_USER });
                window.location.href = '/dashboard';
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function logoutUser() {
    return function(dispatch) {
        dispatch({ type: UNAUTH_USER });
				deleteCookie('token');
        window.location.href = '/login';
    }
}

export function currentUser() {
    return function(dispatch) {
        axios.get(`${API_URL}/auth/currentuser`, {
            headers: { 'Authorization': getCookie('token') }
            }).then( response => {
                dispatch({ 
                    type: CURRENT_USER,
                    payload: response.data.user
                });
            }
        )
    }
}

export function protectedTest() {
    return function(dispatch) {
        axios.get(`${API_URL}/protected`, {
            headers: { 'Authorization': getCookie('token') }
        })
            .then(response => {
                dispatch({
                    type: PROTECTED_TEST,
                    payload: response.data.content
                });
            })
    }
}
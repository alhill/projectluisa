import {
    AUTH_USER,
    UNAUTH_USER,
    CURRENT_USER,
    AUTH_ERROR,
    PROTECTED_TEST
} from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false, user: {}}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, error: '', message: '', authenticated: true };
        case UNAUTH_USER:
            return { ...state, authenticated: false };
        case CURRENT_USER:
            return { ...state, error: '', message: '', authenticated: true, user: action.payload }
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case PROTECTED_TEST:
            return { ...state, content: action.payload };
				default:
            break;
    }

    return state;
}
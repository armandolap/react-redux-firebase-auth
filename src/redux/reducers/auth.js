import {
    ISSIGNEDIN_SUCCESS,
    ISSIGNEDIN_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    SIGNIN_GOOGLE_SUCCESS,
    SIGNIN_GOOGLE_ERROR,
    EMAIL_NOT_VERIFIED,
    SIGNOUT_SUCCESS,
    SIGNOUT_ERROR,
    RESET_SUCCESS,
    RESET_ERROR
} from '../actions/types'

const INITIAL_STATE = {
    auth: {}
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ISSIGNEDIN_SUCCESS:
        case ISSIGNEDIN_ERROR:
        case SIGNIN_SUCCESS:
        case SIGNOUT_SUCCESS:
        case SIGNIN_GOOGLE_SUCCESS:
        case SIGNUP_SUCCESS:
        case SIGNUP_ERROR:
        case SIGNIN_ERROR:
        case SIGNIN_GOOGLE_ERROR:
        case EMAIL_NOT_VERIFIED:
        case SIGNOUT_ERROR:
        case RESET_SUCCESS:
        case RESET_ERROR:
            return {
                ...state,
                auth: action.payload
            }
        default:
            return state;
    }
}

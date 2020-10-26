import {
    USER_IS_SIGNED,
    USER_IS_NOT_SIGNED,
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
} from './types'

import firebaseApp from '../../services/Firebase.config'
import firebase from 'firebase/app'
// Check if User is signed in
export const userIsSignedIn = () => async dispatch => {
    firebaseApp.auth().onAuthStateChanged((dataUser) => {
        if (dataUser) {
            dispatch({
                type: USER_IS_SIGNED,
                payload: { Uid: true }
            })
        } else {
            dispatch({
                type: USER_IS_NOT_SIGNED,
                payload: { Uid: false }
            })
        }
    })
}
// Signup with Firebase
export const signup = (email, password, nickName) => async dispatch => {
    firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((dataUser) => { // Signup successful
            dataUser.user.updateProfile({
                displayName: nickName
            }).then(() => {
                dataUser.user.sendEmailVerification()
                    .then(() => { // email ok
                        dispatch({
                            type: SIGNUP_SUCCESS,
                            payload: { attempt: true, alertType: 'success', message: 'Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox.' }
                        })
                    }).catch((err) => { // email ko
                        dispatch({
                            type: SIGNUP_ERROR,
                            payload: { attempt: true, alertType: 'error', message: err.message }
                        })
                    })
            })
        }).catch((err) => { // Signup failed
            dispatch({
                type: SIGNUP_ERROR,
                payload: { attempt: true, alertType: 'error', message: err.message }
            })
        })
}
// Signin with Firebase
export const signin = (email, password) => async dispatch => {
    firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(dataUser => {
            if (dataUser.user.emailVerified) {
                dispatch({
                    type: SIGNIN_SUCCESS,
                    payload: { Uid: dataUser.user.uid }
                })
            } else {
                dispatch({
                    type: EMAIL_NOT_VERIFIED,
                    payload: { attempt: true, alertType: 'error', message: "You haven't verified your e-mail address." }
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: SIGNIN_ERROR,
                payload: { attempt: true, alertType: 'error', message: err.message }
            })
        })
}
// Signin with Google Firebase
export const signinGoogle = (email, password) => async dispatch => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebaseApp
        .auth()
        .signInWithPopup(provider)
        .then((dataUser) => {
            dispatch({ 
                type: SIGNIN_GOOGLE_SUCCESS,
                payload: { Uid: dataUser.user.uid }
            })
        })
        .catch((err) => { 
            dispatch({
                type: SIGNIN_GOOGLE_ERROR,
                payload: { attempt: true, alertType: 'error', message: err.message }
            })
        })
}
// SignOut with Firebase
export const signout = () => async dispatch => {
    try {
        firebaseApp
            .auth()
            .signOut()
            .then(() => {
                dispatch({ 
                    type: SIGNOUT_SUCCESS,
                    payload: { Uid: false }
                })
            })
            .catch(() => {
                dispatch({
                    type: SIGNOUT_ERROR,
                    payload: 'Error, we were not able to log you out. Please try again.'
                })
            })
    } catch (err) {
        dispatch({
            type: SIGNOUT_ERROR,
            payload: 'Error, we were not able to log you out. Please try again.'
        })
    }
}
// Reset password with Firebase
export const resetPassword = email => async dispatch => {
    firebaseApp
        .auth()
        .sendPasswordResetEmail(email)
        .then(() =>
            dispatch({
                type: RESET_SUCCESS,
                payload: { attempt: true, alertType: 'success', message: "Check your inbox. We've sent you a secured reset link by e-mail." }
            })
        )
        .catch((err) => {
            dispatch({
                type: RESET_ERROR,
                payload: { attempt: true, alertType: 'error', message: err.message }
            })
        })
}

import React, { useEffect } from 'react'

import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import AuthUserContext from './context'
import { withFirebase } from '../firebase'

const withAuthorization = condition => Component => {

    function WithAuthorization(props) {

        useEffect(() => {
            props.firebase.onAuthUserListener(
                // callbacks for AUTH ROUTER
                authUser => {
                    if (!condition(authUser)) {
                        props.history.push('/')
                    }
                    props.history.push('/admin')
                },
                () => props.history.push('/')
            )
        }, [props.firebase, props.history])

        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    condition(authUser) ? <Component {...props} /> : null
                }
            </AuthUserContext.Consumer>
        )
    }

    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorization)
}

export default withAuthorization

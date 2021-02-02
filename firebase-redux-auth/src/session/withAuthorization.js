import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { withFirebase } from '../firebase'

const withAuthorization = condition => Component => {

    function WithAuthorization(props) {

        useEffect(() => {
            props.firebase.onAuthUserListener(
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
            condition(props.authUser) 
                ? <Component {...props} />
                : null
        )
    }

    const mapStateToProps = state => ({
        authUser: state.sessionState.authUser
    })

    return compose(
        withRouter,
        withFirebase,
        connect(mapStateToProps),
    )(WithAuthorization)
}

export default withAuthorization

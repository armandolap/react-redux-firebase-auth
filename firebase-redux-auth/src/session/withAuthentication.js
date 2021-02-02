import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { withFirebase } from '../firebase'

const withAuthentication = Component => {

    function WithAuthentication(props) {

        useEffect(() => {

            props.onSetAuthUser(
                JSON.parse(localStorage.getItem('authUser'))
            )
            props.firebase.onAuthUserListener(
                authUser => {
                    localStorage.setItem('authUser', JSON.stringify(authUser))
                    props.onSetAuthUser(authUser)
                },
                () => {
                    localStorage.removeItem('authUser')
                    props.onSetAuthUser(null)
                }
            )
        }, [props])

        return (
            <Component {...props} />
        )
    }

    const mapDispatchToProps = dispatch => ({
        onSetAuthUser: authUser =>
            dispatch({ type: 'AUTH_USER_SET', authUser })
    })

    return compose(
        withFirebase,
        connect(
            null,
            mapDispatchToProps,
        ),
    )(WithAuthentication)
}

export default withAuthentication

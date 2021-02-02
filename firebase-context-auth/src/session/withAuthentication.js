import React, { useEffect, useState } from 'react'

import AuthUserContext from './context'
import { withFirebase } from '../firebase'

const withAuthentication = Component => {

    function WithAuthentication(props) {

        const [state, setState] = useState({ authUser: JSON.parse(localStorage.getItem('authUser')) })

        useEffect(() => {
            props.firebase.onAuthUserListener(
                // callbacks 
                authUser => {
                    localStorage.setItem('authUser', JSON.stringify(authUser))
                    setState({ authUser })
                },
                () => {
                    localStorage.removeItem('authUser')
                    setState({ authUser: null })
                }
            )
        }, [props.firebase])

        return (
            <AuthUserContext.Provider value={state}>
                <Component {...props} />
            </AuthUserContext.Provider>
        )
    }
    
    return withFirebase(WithAuthentication)
}

export default withAuthentication

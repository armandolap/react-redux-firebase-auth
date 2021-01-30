import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PublicRoute({ signed: Signed, component: Component, ...rest }) {
    return (
        Signed
            ?   <Redirect to='/dashboard' />
            :   <Route {...rest} component={(props) => (
                    (<Component {...props} />)
                )} />
    )
}

export default PublicRoute
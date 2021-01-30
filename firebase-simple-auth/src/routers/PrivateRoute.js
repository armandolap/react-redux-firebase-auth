import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ signed: Signed, component: Component, ...rest }) {
    return (
        Signed
            ?   <Route {...rest} component={(props) => (
                    (<Component {...props} />)
                )} />
            :   <Redirect to='/' />
    )
}

export default PrivateRoute
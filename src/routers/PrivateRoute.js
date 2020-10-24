import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            isAuthenticated 
                ? ( <Component {...props} /> ) 
                : ( <Redirect to='/' /> )
        )} />
    )

const mapStatetoProps = (state) => ({
    isAuthenticated: !!state.data.auth.Uid
})

export default connect(mapStatetoProps)(PrivateRoute)
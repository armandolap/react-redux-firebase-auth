import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            isAuthenticated 
                ? ( <Redirect to='/auth' /> ) 
                : ( <Component {...props} /> )
        )} />
    )

const mapStatetoProps = (state) => ({
    isAuthenticated: !!state.data.auth.Uid
})

export default connect(mapStatetoProps)(PublicRoute)
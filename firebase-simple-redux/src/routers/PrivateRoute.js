import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ isAuthenticated, component: Component, ...rest }) {
    return (
        isAuthenticated
            ? (
                <Route {...rest} component={(props) => (
                    (<Component {...props} />)
                )} />
            )
            : <Redirect to='/' />
    )
}

const mapStatetoProps = (state) => ({
    isAuthenticated: state.data.auth.Uid
})

export default connect(mapStatetoProps)(PrivateRoute)
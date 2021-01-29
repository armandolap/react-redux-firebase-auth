import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

function PublicRoute({ isAuthenticated, component: Component, ...rest }) {
    return (
        isAuthenticated
            ? <Redirect to='/dashboard' />
            : (
                <Route {...rest} component={(props) => (
                    (<Component {...props} />)
                )} />
            )
    )
}

const mapStatetoProps = (state) => ({
    isAuthenticated: state.data.auth.Uid
})

export default connect(mapStatetoProps)(PublicRoute)
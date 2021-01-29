import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ResetPass from '../pages/ResetPass'
import NotFound from '../pages/NotFound'
import Auth from '../pages/Auth'

import firebaseApp from '../services/Firebase.config'

function AppRouter() {
    // state 
    const [signed, setSigned] = useState(false)

    useEffect(() => {
        // Check if User is signed in Firebase
        const userIsSignedIn = () => {
            firebaseApp.auth().onAuthStateChanged((dataUser) => {
                if (dataUser) { setSigned(true) }
                else { setSigned(false) }
            })
        }
        userIsSignedIn()
    })

    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute exact path='/' component={SignIn} signed={signed} />
                <PublicRoute path='/register' component={SignUp} signed={signed} />
                <PublicRoute path='/reset' component={ResetPass} signed={signed} />
                <PrivateRoute path='/dashboard' component={Auth} signed={signed} />
                <Route><NotFound /></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter




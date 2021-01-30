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
    // is Logged User in Firebase ?
    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged(dataUser => {
            const currentUser = firebaseApp.auth().currentUser
            if (currentUser != null) {
                if (dataUser.emailVerified) { setSigned(true) }
            }else{ setSigned(false) }         
        })
    }, [])

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




import React from 'react'
import { useDispatch } from 'react-redux'
import { userIsSignedIn } from '../redux/actions/auth'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ResetPass from '../pages/ResetPass'
import NotFound from '../pages/NotFound'
import Auth from '../pages/Auth'

function AppRouter() {

    const dispatch = useDispatch()

    dispatch(userIsSignedIn())

    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute exact path='/' component={SignIn} />
                <PublicRoute path='/register' component={SignUp} />
                <PublicRoute path='/reset' component={ResetPass} />
                <PrivateRoute path='/dashboard' component={Auth} />
                <Route><NotFound /></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter;




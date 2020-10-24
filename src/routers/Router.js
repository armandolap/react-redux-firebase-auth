import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ResetPass from '../pages/ResetPass'
import _404 from '../pages/_404'
import Auth from '../pages/Auth'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <PublicRoute exact path='/' component={SignIn} />
            <PublicRoute path='/register' component={SignUp} />
            <PublicRoute path='/reset' component={ResetPass} />
            <PrivateRoute path='/auth' component={Auth} />
            <Route component={_404} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;




import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ResetPass from './pages/ResetPass'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'

import { withAuthentication } from './session'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#555',
            light: '#666'
        },
        secondary: {
            main: '#d65d5d',
            light: '#d65d5dd9'
        },
        background: {
            default: "#eee"
        }
    }
})

const useStyles = makeStyles({
    appMain: {
        margin: '0',
        boxSizing: 'border-box',
        /* footer abajo */
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
})

function App() {

    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.appMain}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={SignIn} />
                        <Route path='/register' component={SignUp} />
                        <Route path='/reset' component={ResetPass} />
                        <Route path='/admin' component={Admin} />
                        <Route><NotFound /></Route>
                    </Switch>
                </Router>
            </div>
        </ThemeProvider>
    )
}

export default withAuthentication(App)
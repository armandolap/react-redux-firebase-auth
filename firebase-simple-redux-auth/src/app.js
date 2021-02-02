import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core'
import Routes from './routers/Router'

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
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div className={classes.appMain}>
                    <Routes />
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
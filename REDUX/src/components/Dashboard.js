import React from 'react'
import { useDispatch } from 'react-redux'
import { signout } from '../redux/actions/auth'
import { Container, CssBaseline, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    pageContent: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    main: {
        flex: 1
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(2, 0, 2)
    },
    button: {
        margin: theme.spacing(0, 0, 2),
        backgroundColor: '#4c8bf5',
        '&:hover': {
            backgroundColor: '#126DF6',
        }
    }
}))

function Dashboard() {

    const classes = useStyles()
    const dispatch = useDispatch()
    // logout submit
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(signout())
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.main}>
            <CssBaseline />
            <div className={classes.pageContent}>
                <Typography component="h1" variant="h5">
                    Dashboard
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        LogOut
                    </Button>
                </form>
            </div>    
        </Container>
    );
}

export default Dashboard
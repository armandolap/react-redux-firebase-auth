import React from 'react'
import { withFirebase } from '../firebase'
import { withAuthorization } from '../session'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

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
            backgroundColor: '#126DF6'
        }
    }
}))

function AdminBase(props) {

    const classes = useStyles()
    // logout submit
    const handleSubmit = e => {
        e.preventDefault()
        // logout 
        props.firebase.doSignOut()
            .then(() => {
                console.log('Correct LogOut')
            })
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.main}>
            <CssBaseline />
            <div className={classes.pageContent}>
                <Typography component="h1" variant="h5">
                    Dashboard
                </Typography>
                <p>The Admin Page is accessible only by every signed user.</p>
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
    )
}

const condition = authUser => authUser 

export default compose(
    withFirebase,
    withRouter,
    withAuthorization(condition)
)(AdminBase)
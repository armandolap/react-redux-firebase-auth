import React, { useState } from 'react'
import { Container, CssBaseline, Link, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import AlertMessage from './AlertMessage'

import firebaseApp from '../services/Firebase.config'

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

function ResetPassForm() {
    // Material UI 
    const classes = useStyles()
    // state 
    const [state, setState] = useState({
        email: ''
    })
    const [attempt, setAttempt] = useState(false)
    const [alertType, setAlertType] = useState('error')
    const [message, setMessage] = useState('')
    // Reset password with Firebase
    const resetPassword = email  => {
        firebaseApp
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                setAttempt(true)
                setAlertType('success')
                setMessage("Check your inbox. We've sent you a secured reset link by e-mail.")
            })
            .catch((err) => {
                setAttempt(true)
                setAlertType('error')
                setMessage(err.message)
            })
    }
    // form inputs values
    const handleChange = e => {
        const value = e.target.value;
        setState({
            ...state.email,
            [e.target.name]: value
        })
    }
    // reset password
    const handleSubmit = e => {
        e.preventDefault()
        resetPassword(state.email)
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.main}>
            <CssBaseline />
            <div className={classes.pageContent}>
                {attempt
                    ? <AlertMessage severity={alertType} text={message} />
                    : false
                }
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
                    <TextValidator
                        variant="outlined"
                        color="primary"
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Send
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/" variant="body2" color="primary">
                                {"<- Go back"}
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        </Container>
    );
}

export default ResetPassForm
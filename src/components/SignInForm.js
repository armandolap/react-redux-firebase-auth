import React, { useState } from 'react'
import { Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { Container, CssBaseline, Link, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Google } from '@material-ui/icons'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import AlertMessage from './AlertMessage'

import firebaseApp from '../services/Firebase.config'
import firebase from 'firebase/app'

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

function SignInForm() {
    // Material UI 
    const classes = useStyles()
    // state 
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const [attempt, setAttempt] = useState(false)
    const [alertType, setAlertType] = useState('error')
    const [message, setMessage] = useState('')
    // Signin with Firebase
    const signin = (email, password) => {
        firebaseApp
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(dataUser => {
                if (dataUser.user.emailVerified) { // login ok
                    console.log('Correct LogIn', dataUser)
                } else {
                    setAttempt(true)
                    setAlertType('error')
                    setMessage("You haven't verified your e-mail address.")
                }
            })
            .catch((err) => {
                setAttempt(true)
                setAlertType('error')
                setMessage(err.message)
            })
    }
    // Signin with Google Firebase
    const signinGoogle = (email, password) => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(provider)
            .then((dataUser) => {
                console.log('Correct LogIn', dataUser)
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
            ...state,
            [e.target.name]: value
        })
    }
    // login google
    const handleGoogleButton = () => {
        signinGoogle(state.email, state.password)
    }
    // login email
    const handleSubmit = e => {
        e.preventDefault()
        signin(state.email, state.password)
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
                    Sign in
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
                        validators={['required']}
                        errorMessages={['this field is required']}
                        autoFocus
                    />
                    <TextValidator
                        variant="outlined"
                        color="primary"
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<Google />}
                        onClick={handleGoogleButton}
                    >
                        Sign In with Google
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/reset" variant="body2" color="primary">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2" color="primary">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        </Container>
    );
}

export default SignInForm
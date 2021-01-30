import React, { useState, useEffect } from 'react'
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

function SignUpForm() {
    // Material UI 
    const classes = useStyles()
    // state 
    const [state, setState] = useState({
        nickName: '',
        email: '',
        password: '',
        rpassword: '',
    })
    const [attempt, setAttempt] = useState(false)
    const [alertType, setAlertType] = useState('error')
    const [message, setMessage] = useState('')
    // validation 
    useEffect(() => {
        ValidatorForm.addValidationRule('isPassLength', (value) => {
            if (value.length < 6) return false
            return true
        })
        ValidatorForm.addValidationRule('isPassMatch', (value) => {
            if (value !== state.password) return false
            return true
        })
    })
    // Signup with Firebase
    const signup = (email, password, nickName) => {
        firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((dataUser) => { // Signup successful
                dataUser.user.updateProfile({
                    displayName: nickName
                }).then(() => {
                    dataUser.user.sendEmailVerification()
                        .then(() => { // email ok
                            setAttempt(true)
                            setAlertType('success')
                            setMessage('Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox.')
                        }).catch((err) => { // email ko
                            setAttempt(true)
                            setAlertType('error')
                            setMessage(err.message)
                        })
                })
            }).catch((err) => { // Signup failed
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
    // register submit
    const handleSubmit = e => {
        e.preventDefault()
        signup(state.email, state.password, state.nickName)
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
                    Sign up
                </Typography>
                <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextValidator
                                color="primary"
                                variant="outlined"
                                fullWidth
                                label="Nick Name"
                                name="nickName"
                                value={state.nickName}
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                color="primary"
                                fullWidth
                                label="Email Address"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                color="primary"
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                                validators={['required', 'isPassLength']}
                                errorMessages={['this field is required', 'password should be at leats 6 characters']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                color="primary"
                                fullWidth
                                label="Repeat Password"
                                type="password"
                                name="rpassword"
                                value={state.rpassword}
                                onChange={handleChange}
                                validators={['required', 'isPassMatch']}
                                errorMessages={['this field is required', 'passwords do not match']}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/" variant="body2" color="primary">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        </Container>
    );
}

export default SignUpForm
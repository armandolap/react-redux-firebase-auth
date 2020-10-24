import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../redux/actions/auth'
import { Container, CssBaseline, Link, Grid, Box, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Copyright from './Copyright'
import AlertMessage from './AlertMessage'

const useStyles = makeStyles((theme) => ({
    pageContent: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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

    const classes = useStyles()
    const dispatch = useDispatch()
    const signUpRedux = useSelector((state) => state.data.auth)

    const [state, setState] = useState({
        nickName: '',
        email: '',
        password: '',
        rpassword: ''
    })

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
        dispatch(signup(state.email, state.password, state.nickName))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.pageContent}>
                {signUpRedux.attempt
                    ? <AlertMessage severity={signUpRedux.alertType} text={signUpRedux.message} />
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
            <Box mt={5}>
                <Copyright href={"https://github.com/armandolap"} linkText={"GitHub:armandolap"} />
            </Box>
        </Container>
    );
}

export default SignUpForm
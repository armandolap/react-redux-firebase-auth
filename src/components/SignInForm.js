import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin, signinGoogle } from '../redux/actions/auth'
import { Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { Container, CssBaseline, Link, Grid, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Google } from '@material-ui/icons'
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

function SignInForm() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const signInRedux = useSelector((state) => state.data.auth)

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        })
    }
    // login google
    const handleGoogleButton = () => {
        dispatch(signinGoogle(state.email, state.password))
    }
    // login email
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(signin(state.email, state.password))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.pageContent}>
                {signInRedux.attempt
                    ? <AlertMessage severity={signInRedux.alertType} text={signInRedux.message} />
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
            <Box mt={8}>
                <Copyright href={"https://github.com/armandolap"} linkText={"GitHub:armandolap"} />
            </Box>
        </Container>
    );
}

export default SignInForm
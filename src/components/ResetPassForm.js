import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../redux/actions/auth'
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

function ResetPassForm() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const resetRedux = useSelector((state) => state.data.auth)

    const [state, setState] = useState({
        email: '',
    })

    const handleChange = e => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        })
    }
    // reset password
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(resetPassword(state.email))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.pageContent}>
                {resetRedux.attempt
                    ? <AlertMessage severity={resetRedux.alertType} text={resetRedux.message} />
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
            <Box mt={8}>
                <Copyright href={"https://github.com/armandolap"} linkText={"GitHub:armandolap"} />
            </Box>
        </Container>
    );
}

export default ResetPassForm
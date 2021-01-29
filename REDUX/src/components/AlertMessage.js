import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
    alert: {
        width: '100%',
        marginBottom: theme.spacing(1)
    }
}))

function AlertMessage({ severity, text}) {
    const classes = useStyles()
    return ( <Alert severity={severity} className={classes.alert}>{text}</Alert> )
}

export default AlertMessage

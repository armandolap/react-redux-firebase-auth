import React from 'react'
import Copyright from './Copyright'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    footer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        color: '#fff',
        backgroundColor: '#000'
    }
}))

function Footer() {
    const classes = useStyles()
    return (
        <footer className={classes.footer}>
            <Copyright href={"https://github.com/armandolap"} linkText={"GitHub:armandolap"} />
        </footer>
    )
}

export default Footer

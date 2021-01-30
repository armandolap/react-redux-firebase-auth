import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        color: '#fff',
        backgroundColor: '#000'
    }
}))

function Header() {
    const classes = useStyles()
    return (
        <header className={classes.header}>
            <h2>REACT FIREBASE AUTH</h2>
        </header>
    )
}

export default Header

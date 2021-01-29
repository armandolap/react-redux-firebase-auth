import React from 'react'
import { Typography, Link } from '@material-ui/core'

function Copyright({ href, linkText }) {
    return (
        <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link color="inherit" href={href}>
                {linkText}
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright
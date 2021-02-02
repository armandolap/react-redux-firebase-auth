import React from 'react'
import { Container, CssBaseline, Link, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    pageContent: {
        marginTop: theme.spacing(8),
        textAlign: 'center'
    }
}))

function NotFound() {

    const classes = useStyles()

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.pageContent}>
                <Typography variant='h5'>
                    Error 404!
                    </Typography>
                <Typography variant='h3'>
                    Page not found
                    </Typography>
                <Box m={3}>
                    <Link href='/' variant='body2' color='secondary'>
                        Back to Home
                    </Link>
                </Box>
            </div>
        </Container>
    )
}

export default NotFound


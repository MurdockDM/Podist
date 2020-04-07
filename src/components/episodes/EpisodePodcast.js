import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
    root: {
        width: '25%',
        margin: '3%',
        boxShadow: '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: '3%',
        border: '1px solid #1565c0'
    },
    label: {
        fontWeight: 600,
        padding: '0rem 0 1rem 4rem',
        color: '#1565c0'

    },
    title: {
        padding: '1rem'
    }
})


const EpisodePodcast = (props) => {

    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            <Typography className={classes.label}>Episode Title</Typography>
            <Typography className={classes.title} >{props.episode.title}</Typography>
        </Paper>
    )
}

export default EpisodePodcast
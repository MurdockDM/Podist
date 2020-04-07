import React, { useState, useEffect } from 'react'
import HomePagePodcasts from '../Podcasts/HomePagePodcasts'
import LocalAPIManager from '../modules/LocalAPIManager'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import ExternalAPIManager from '../modules/ExternalAPIManager'
import RedoIcon from '@material-ui/icons/Redo';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions'
import Paper from "@material-ui/core/Paper"


const useStyles = makeStyles({
    root: {
        marginTop: '2rem',
        backgroundColor: '#eeeeee',

    },
    card: {
        width: '28%',
        marginTop: '2rem',
        border: '1px solid #1565c0',
        padding: '1rem',
        boxShadow: "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)"

    },
    cardMedia: {
        paddingTop: '100%'
    },
    cardTitle: {
        margintop: '1rem',
        marginBottom: '1rem'
    },
    cardActionsBottom: {

    },
    redoIcon: {
        width: '2rem',
        height: 'auto',
        color: 'white',
        backgroundColor: '#1565c0'
    },
    paper: {
        margin: '3rem',
        padding: '2rem',
        border: '1px solid #1565c0'
    }
})


const PodcastGallery = (props) => {

    const classes = useStyles()

    const [currentPodcasts, setCurrentPodcasts] = useState([])
    const [randomPodcastSpotlight, setRandomPodcastSpotlight] = useState({})

    useEffect(() => {
        window.scrollTo(0, 235);
    }, [randomPodcastSpotlight])

    useEffect(() => {
        LocalAPIManager.getAllSavedPodcasts().then(response => setCurrentPodcasts(response))
        ExternalAPIManager.getRandomPodcastEpisode().then(resp => setRandomPodcastSpotlight(resp))
    }, [])

    return (
        <Grid container direction='column' className={classes.root}>
            <Grid justify='center' item container>
                <Card className={classes.card}>
                    <Grid container justify='center' item>
                        <Typography className={classes.cardTitle} >Discover Random Podcast Episodes</Typography>
                    </Grid>
                    <Grid>
                        <Typography variant='h5'>Episode Title: {randomPodcastSpotlight.title}</Typography>
                    </Grid>
                    <CardMedia
                        className={classes.cardMedia}
                        src='image'
                        image={randomPodcastSpotlight.thumbnail}
                    />
                    <CardContent>
                        <Typography variant='h6'>Podcast Title: {randomPodcastSpotlight.podcast_title}</Typography>
                        <Typography>{randomPodcastSpotlight.description}</Typography>
                    </CardContent>
                    <CardActions >
                        <IconButton onClick={() => { ExternalAPIManager.getRandomPodcastEpisode().then(resp => setRandomPodcastSpotlight(resp)) }} >
                            <RedoIcon className={classes.redoIcon} ></RedoIcon>
                        </IconButton>
                        <Typography variant='h6'>Try another random episode</Typography>
                    </CardActions>
                </Card>
            </Grid>
            <Grid justify='center' container item xs={12}>
                <Paper className={classes.paper} >
                    <Typography variant='h4'>Database of Saved Podcasts</Typography>
                </Paper>
            </Grid>
            <Grid container item direction='row' justify='space-around' wrap='wrap'>
                {currentPodcasts.map(podcast =>
                    <HomePagePodcasts
                        podcast={podcast}
                        key={podcast.id}
                        {...props} />)}
            </Grid>
        </Grid>
    )


}

export default PodcastGallery
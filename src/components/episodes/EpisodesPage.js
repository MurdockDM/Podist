import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, Paper, Typography } from '@material-ui/core'
import ExternalAPIManager from '../modules/ExternalAPIManager'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import EpisodePodcast from './EpisodePodcast';


const useStyles = makeStyles({
    root: {

    },
    card: {
        minWidth: 15,
        margin: 10,
        border: '1px solid #1565c0',
        boxShadow: '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)'
    },
    media: {
        maxWidth: '100%',
        paddingTop: '100%',
        height: 'auto'

    },
    title: {
        fontSize: 10,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        background: 'linear-gradient(45deg, #1565c0 30%, #42a5f5 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        marginLeft: '8rem'
    }
})


const EpisodesPage = (props) => {

    const classes = useStyles()

    const [podcastData, setPodcastData] = useState({ episodes: [] })


    useEffect(() => {
        ExternalAPIManager.getPodcastByAPIId(props.match.params.PodcastAPIId).then(resp => { setPodcastData(resp) })

    }, [])

    useEffect(() => {
        console.log(podcastData.episodes)
    }, [podcastData])

    return (
        <Grid justify='center' container>
            <Grid container justify='center'>
                <Paper>
                    <Typography>
                        Podcast Episodes
                    </Typography>
                </Paper>
            </Grid>
            <Grid item container justify='center' xs={6}>
                <Card className={classes.card} variant="outlined" >
                    <CardContent>
                        <Typography variant="h5" component="h4">{podcastData.title}</Typography>
                        <CardMedia
                            image={podcastData.image}
                            src='image'
                            className={classes.media}
                            title="podcast imagery"
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={8} container >
                {podcastData.episodes.map(episodeObject =>
                    <EpisodePodcast
                        key={episodeObject.id}
                        episode={episodeObject} />)}
            </Grid>
        </Grid>


    )

}

export default EpisodesPage
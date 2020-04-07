import React, { useState, useEffect } from "react";
import { Button, Card, CardMedia, Typography, CardContent, Collapse, Grid } from "@material-ui/core";
import LocalAPIManager from "../modules/LocalAPIManager";
import { makeStyles } from "@material-ui/core/styles"
import CardActions from "@material-ui/core/CardActions"
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    root: {
        width: '26%',
        margin: '2%',
        border: '1px solid #1565c0',
        boxShadow: '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)'
    },
    media: {
        paddingTop: '100%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    addDatabaseButton: {
        background: 'linear-gradient(45deg, #1565c0 10%, #42a5f5 30%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        fontWeight: 500,
        height: 48,
        padding: '0 30px',
    },
    addToListButton: {
        background: 'linear-gradient(45deg, #1565c0 10%, #42a5f5 30%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        fontWeight: 500,
        height: 48,
        padding: '0 30px',
    }
}))





const PodcastCard = props => {

    const classes = useStyles();

    const [podcastDetails, setPodcastDetails] = useState({
        APIId: "",
        title: "",
        description: "",
        link: "",
        imageLink: "",
        thumbnail: ""
    })

    const [savedPodcastsInAPI, setSavedPodcastsInAPI] = useState([])
    const [podcastStoredId, setPodcastStoredId] = useState("")
    const [isAvailable, setIsAvailable] = useState(false)
    const [buttonOff, setButtonOff] = useState(true)
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const storeCardData = () => {
        const stateToChange = { ...podcastDetails }
        stateToChange.APIId = props.podcast.id
        stateToChange.title = props.podcast.title_original
        stateToChange.description = props.podcast.description_original
        stateToChange.link = props.podcast.website
        stateToChange.imageLink = props.podcast.image
        stateToChange.thumbnail = props.podcast.thumbnail
        setPodcastDetails(stateToChange)
        setIsAvailable(true)
    }

    const checkStoredPodcasts = () => {
        const checkedPodcasts = savedPodcastsInAPI.filter(podcast => {
            return podcast.APIId === podcastDetails.APIId
        })
        if (checkedPodcasts.length === 0 && podcastDetails.APIId !== "") {
            postToDatabase()
        } else if (podcastDetails !== "" && checkedPodcasts.length >= 1) { alert("This podcast is already in the database") }
    }

    const postToDatabase = () => {
        LocalAPIManager.postSinglePodcast(podcastDetails).then(response => {
            setPodcastStoredId(response.id)
            setButtonOff(false)
        })
    }

    useEffect(() => {
        LocalAPIManager.getAllSavedPodcasts()
            .then(arrayOfPodcasts => {
                setSavedPodcastsInAPI(arrayOfPodcasts)
            }).then(checkStoredPodcasts())

    }, [podcastDetails])

    return (
        <Card className={classes.root} spacing={2} variant='outlined'>
            <CardContent>
                <Grid>
                    <Typography variant='h5'>{props.podcast.title_original}</Typography>
                    <Typography variant='h5'>{props.podcast.title}</Typography>
                </Grid>
                <Grid>
                    <CardMedia className={classes.media}
                        image={props.podcast.image}
                        title="podcast imagery">
                    </CardMedia>
                    <CardActions>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto">
                        <Typography>{props.podcast.description_original}</Typography>
                        <Typography>{props.podcast.description}</Typography>
                        <Typography>Website:<a target="_blank" rel='noopener noreferrer' href={props.podcast.website}>Go to Podcast Website</a></Typography>
                    </Collapse>
                </Grid>
                <CardActions>
                    <Button className={classes.addDatabaseButton} disabled={isAvailable} onClick={() => storeCardData()} >Save Podcast</Button>
                    <Button className={classes.addToListButton} disabled={buttonOff} onClick={() => props.history.push(`/${podcastStoredId}/podcasttolist`)}>Add to a List</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default PodcastCard
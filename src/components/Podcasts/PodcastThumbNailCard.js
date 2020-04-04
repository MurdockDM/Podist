import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import LocalAPIManager from "../modules/LocalAPIManager"
import "./PodcastThumbNailCard.css"
import { Card, makeStyles, CardActions, CardContent, CardMedia, Typography, Collapse } from "@material-ui/core"
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';



const useStyles = makeStyles(theme => ({
    root: {
        border: '1px solid black',
        margin: '2%',
        width: '95%',
        boxShadow: "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)"

    },
    media: {
        maxWidth: '100%',
        paddingTop: '100%',
        height: 'auto'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}))




const PodcastThumbNailCard = props => {

    const classes = useStyles()
    const userHasRights = props.userHasRights

    const [expanded, setExpanded] = useState(false);
    const [podcastDetails, setPodcastDetails] = useState({
        id: "",
        APIId: "",
        title: "",
        description: "",
        link: "",
        imageLink: "",
        thumbnail: ""
    })

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    useEffect(() => {
        LocalAPIManager.getSavedPodcastById(props.podcast.savedPodcastId)
            .then(response => setPodcastDetails(response))
    }, [])


    return (
        <Card className={classes.root}>
            <div className="podcastCard__thumbnail__content">
                <CardContent>
                    <Typography variant='h5'><span>{podcastDetails.title}</span></Typography>
                    <CardMedia
                        image={podcastDetails.thumbnail}
                        title='podcast imagery'
                        className={classes.media} />
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}>
                        <ExpandMoreIcon />
                    </IconButton>
                    <CardActions>
                        <Collapse in={expanded} timeout="auto">
                            <Typography variant='h6'>Description: {podcastDetails.description}</Typography>
                            <Typography>Website:<a target="_blank" href={podcastDetails.link}>Go to Podcast Website</a></Typography>
                        </Collapse>
                    </CardActions>
                </CardContent>
                <CardActions>
                    {userHasRights
                        ? <Button onClick={() => { props.removeFromList(props.podcast.id) }} color="secondary"><RemoveCircleOutlineRoundedIcon></RemoveCircleOutlineRoundedIcon>Remove Podcast From List</Button>
                        : null}
                </CardActions>
            </div>
        </Card>


    )

}

export default PodcastThumbNailCard
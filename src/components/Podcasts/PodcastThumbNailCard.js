import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import LocalAPIManager from "../modules/LocalAPIManager"
import "./PodcastThumbNailCard.css"
import { Card, makeStyles, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core"
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';



const useStyles = makeStyles({
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
    }
})




const PodcastThumbNailCard = props => {

    const classes = useStyles()

    const [podcastDetails, setPodcastDetails] = useState({
        id: "",
        APIId: "",
        title: "",
        description: "",
        link: "",
        imageLink: "",
        thumbnail: ""
    })


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
                    <Typography variant='h6'>Description: {podcastDetails.description}</Typography>
                    <Typography>Website:<a target="_blank" href={podcastDetails.link}>Go to Podcast Website</a></Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => { props.removeFromList(props.podcast.id) }} color="secondary"><RemoveCircleOutlineRoundedIcon></RemoveCircleOutlineRoundedIcon>Remove Podcast From List</Button>
                </CardActions>
            </div>
        </Card>


    )

}

export default PodcastThumbNailCard
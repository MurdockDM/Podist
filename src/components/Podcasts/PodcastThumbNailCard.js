import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import LocalAPIManager from "../modules/LocalAPIManager"
import "./PodcastThumbNailCard.css"
import { Card, makeStyles } from "@material-ui/core"


const useStyles = makeStyles({
    root: {
        border: '1px solid black',
        margin: '2%',
        width: '95%'
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
        imageLink: ""
    })


    useEffect(() => {
        LocalAPIManager.getSavedPodcastById(props.podcast.savedPodcastId)
            .then(response => setPodcastDetails(response))
    }, [])

    
    return (
        <Card className={classes.root}>
            <div className="podcastCard__thumbnail__content">
                <picture>
                    <img src={podcastDetails.imageLink} alt="Podcast Imagery"></img>
                </picture>
                <h5>Title: <span className="podcastCard__thumbnail__content__title">{podcastDetails.title}</span></h5>
                <p className="podcast__thumbnail__content__description">Description: {podcastDetails.description}</p>
                <p>Website:<a target="_blank" href={podcastDetails.link}>Go to Podcast Website</a></p>
                <Button onClick={() => {props.removeFromList(props.podcast.id)}} color="secondary">Remove Podcast From List</Button>
            </div>
        </Card>


    )

}

export default PodcastThumbNailCard
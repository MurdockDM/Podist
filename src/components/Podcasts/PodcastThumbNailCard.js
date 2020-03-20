import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import LocalAPIManager from "../modules/LocalAPIManager"
import "./PodcastThumbNailCard.css"

const PodcastThumbNailCard = props => {

    const [podcastDetails, setPodcastDetails] = useState({
        id: "",
        APIId: "",
        title: "",
        description: "",
        link: "",
        imageLink: ""
    })

    const [isAvailable, setIsAvailable] = useState(false)



    useEffect(() => {
        LocalAPIManager.getSavedPodcastById(props.podcast.savedPodcastId)
            .then(response => setPodcastDetails(response))
    }, [])

    return (
        <div className="podcastCard__thumbnail">
            <div className="podcastCard__thumbnail__content">
                <picture>
                    <img src={podcastDetails.imageLink} alt="Podcast Imagery"></img>
                </picture>
                <h5>Title: <span className="podcastCard__thumbnail__content__title">{podcastDetails.title}</span></h5>
                <p className="podcast__thumbnail__content__description">Description: {podcastDetails.description}</p>
                <p>Website:<a target="_blank" href={podcastDetails.link}>Go to Podcast Website</a></p>
                <Button disabled={isAvailable} onClick={() => props.removeFromList(props.podcast.id)} color="secondary">Remove Podcast From List</Button>
            </div>
        </div>


    )

}

export default PodcastThumbNailCard
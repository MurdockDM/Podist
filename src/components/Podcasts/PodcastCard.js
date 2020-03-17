import React, { useState, useEffect } from "react";
import "./PodcastCard.css";
import { Button } from "@material-ui/core";
import LocalAPIManager from "../modules/LocalAPIManager";




const PodcastCard = props => {

    const [podcastDetails, setPodcastDetails] = useState({APIId: "",
        title: "",
        description: "",
        link: "",
        imageLink: ""})

    const [savedPodcastsInAPI, setSavedPodcastsInAPI] = useState([])    
    
    const [isAvailable, setIsAvailable] = useState(false)    

    const storeCardData = () => {
        const stateToChange = {...podcastDetails}
        stateToChange.APIId = props.podcast.id
        stateToChange.title = props.podcast.title_original
        stateToChange.description = props.podcast.description_original
        stateToChange.link = props.podcast.website
        stateToChange.imageLink = props.podcast.image
        setPodcastDetails(stateToChange)
    }

    const checkSavedPodcasts = () => {
        const filteredArray = LocalAPIManager.getAllSavedPodcasts().then(response => {
            response.filter(el => {
               return el.APIId === podcastDetails.APIId
            })
        })
        setSavedPodcastsInAPI(filteredArray)

    }

    const postToDatabase = () => {
        LocalAPIManager.postSinglePodcast(podcastDetails).then(response => {
            props.history.push(`/${response.id}/newlist`)})
    }

    useEffect(() => {
        checkSavedPodcasts()
        if (podcastDetails.APIId != "" && savedPodcastsInAPI.length === 0) {
            postToDatabase()
        }
    },[podcastDetails])

    return (
        <div className="podcastCard">
            <div className="podcastCard__content">
                <picture>
                    <img src={props.podcast.image} alt="Podcast Imagery"></img>
                </picture>
                <h4>Title <span className="podcastCard__content__title">{props.podcast.title_original}</span></h4>
                <p>Description: {props.podcast.description_original}</p>
                <p>Website:<a target="_blank" href={props.podcast.website}>Go to Podcast Website</a></p>
                <Button onClick={() =>  storeCardData()} color="secondary">Save Podcast to add to a list</Button>
                <Button color="secondary">Add to Current List</Button>
            </div>
        </div>
    )
}

export default PodcastCard
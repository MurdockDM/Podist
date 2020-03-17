import React, { useState, useEffect} from "react"
import PodcastThumbNailCard from "../Podcasts/PodcastThumbNailCard"
import ExternalAPIManager from "../modules/ExternalAPIManager"
import LocalAPIManager from "../modules/LocalAPIManager"




const NewList = props => {
    console.log(props)
    const currentUser = sessionStorage.getItem("userInfo")
    const [podcastDetails, setPodcastDetails] = useState({
        APIId: props.match.params.APIPodcastId,
        title: "",
        description: "",
        link: "",
        imageLink: ""
    })
    const [listDetails, setListDetails] = useState({title:"", comments:"", userId: currentUser.id })

    const findPodcastDetails = () => {
        const stateToChange = {...podcastDetails}
        ExternalAPIManager.getPodcastByAPIId(podcastDetails.APIId)
        .then(podcastResponse => {
            stateToChange.title = podcastResponse.title
            stateToChange.description = podcastResponse.description
            stateToChange.link = podcastResponse.website
            stateToChange.imageLink = podcastResponse.image
            setPodcastDetails(stateToChange)
        })
    }

    const handleFieldChange = event => {
        const stateToChange = {...listDetails}
        stateToChange[event.target.id] = event.target.value;
        setListDetails(stateToChange)
    }

    useEffect(() => {
        findPodcastDetails()
    })

}

export default NewList
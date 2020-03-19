import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"


const PodcastThumbNailCard = props => {

    const [podcastDetails, setPodcastDetails] = useState({APIId: "",
        title: "",
        description: "",
        link: "",
        imageLink: ""})

    const [isAvailable, setIsAvailable] = useState(false)


    const removeFromList = () => {

    }    


    useEffect(() => {
        
    },[])
        
    return (
        <div className="podcastCard">
            <div className="podcastCard__content">
                <picture>
                    <img src={props.podcast.image} alt="Podcast Imagery"></img>
                </picture>
                <h4>Title <span className="podcastCard__content__title">{props.podcast.title_original}</span></h4>
                <p>Description: {props.podcast.description_original}</p>
                <p>Website:<a target="_blank" href={props.podcast.website}>Go to Podcast Website</a></p>
                <Button disabled={isAvailable} onClick={() => removeFromList  } color="secondary">Remove Podcast From List</Button>
            </div>
        </div>


    )

}

export default PodcastThumbNailCard
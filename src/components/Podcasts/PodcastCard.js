import React from "react";
import "./PodcastCard.css";
import { Button } from "@material-ui/core";



const PodcastCard = props => {
    return (
        <div className="podcastCard">
            <div className="podcastCard__content">
                <picture>
                    <img src={props.podcast.image} alt="Podcast Imagery"></img>
                </picture>
                <h4>Title <span className="podcastCard__content__title">{props.podcast.title_original}</span></h4>
                <p>Description: {props.podcast.description_original}</p>
                <p>Website:<a target="_blank" href={props.podcast.website}>Go to Podcast Website</a></p>
                <p hidden>Podcast Id: {props.podcast.id}</p>
                <Button onClick={()=> {props.history.push("/newlist")}} color="secondary">Create New List</Button>
                <Button color="secondary">Add to Current List</Button>
            </div>
        </div>
    )
}

export default PodcastCard
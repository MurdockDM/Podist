import React, { useState, useEffect } from "react"
import PodcastThumbNailCard from "../Podcasts/PodcastThumbNailCard"
import { Button } from "@material-ui/core"
import "./CurrentList.css"
import LocalAPIManager from "../modules/LocalAPIManager"


const CurrentList = props => {

    const removeFromList = props.removeFromList

    const [podcastsOnList, setPodcastsOnList] = useState([props.list.listsSavedPodcasts])
    
    console.log(podcastsOnList)
    const handleDeleteList = () => {

    }

    

    

    return (
        <>
            <div className="homePage__currentList">
                <div>
                    <h4>{props.list.title}</h4>
                </div>
                <div>
                    <p>{props.list.comments}</p>
                </div>
                <Button onClick={handleDeleteList}>Delete this list </Button>
            </div>

            <div className="podcast__thumbnail__container">
                {props.list.listsSavedPodcasts.map(podcast => 
                    <PodcastThumbNailCard 
                    removeFromList={removeFromList}
                    key={podcast.savedPodcastId}
                    podcast={podcast}
                    {...props} />)}
            
            </div>       
        </>


    )


}

export default CurrentList
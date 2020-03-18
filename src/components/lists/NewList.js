import React, { useState, useEffect} from "react"
import PodcastThumbNailCard from "../Podcasts/PodcastThumbNailCard"
import ExternalAPIManager from "../modules/ExternalAPIManager"
import LocalAPIManager from "../modules/LocalAPIManager"
import Button from "@material-ui/core/Button"




const NewList = props => {
    const currentUser = sessionStorage.getItem("userInfo")
    const [podcastDetails, setPodcastDetails] = useState({
        id: "",
        APIId: "",
        title: "",
        description: "",
        link: "",
        imageLink: ""
    })
    const [listDetails, setListDetails] = useState({title:"", comments:"", userId: currentUser.id })

    const findPodcastDetails = () => {
        LocalAPIManager.getSavedPodcastById(props.match.params.PodcastId)
        .then(response => {
            setPodcastDetails(response)
        })
        }
        
    const checkLists = () => {
        LocalAPIManager.getAllLists()
    }

    const handleFieldChange = event => {
        const stateToChange = {...listDetails}
        stateToChange[event.target.id] = event.target.value;
        setListDetails(stateToChange)
    }

    useEffect(() => {
        findPodcastDetails()
    },[])

    return (
        <>
          <form>
              <h2>Please add a title and any comments about the list</h2>
              <fieldset>
                  <div className="listInfo">  
                    <input type="text" onChange={handleFieldChange} id="title" placeholder="Title"></input>
                    <input type="textarea" onChange={handleFieldChange} id="comments" placeholder="Comments"></input>
                  </div>
                  <Button onClick={} >Save New List</Button>
              </fieldset>
          </form>

          <div>
          <h2>Podcast to be Added to List</h2>
          <div className="podcastCard__content">
                <picture>
                    <img src={podcastDetails.imageLink} alt="Podcast Imagery"></img>
                </picture>
                <h4>Title <span className="podcastCard__content__title">{podcastDetails.title}</span></h4>
                <p>Description: {podcastDetails.description}</p>                
            </div>
          </div>
        
        </>
    )

}

export default NewList
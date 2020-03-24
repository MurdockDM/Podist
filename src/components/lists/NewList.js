import React, { useState, useEffect} from "react"
import PodcastThumbNailCard from "../Podcasts/PodcastThumbNailCard"
import ExternalAPIManager from "../modules/ExternalAPIManager"
import LocalAPIManager from "../modules/LocalAPIManager"
import Button from "@material-ui/core/Button"




const NewList = props => {
    const currentUserId = JSON.parse(sessionStorage.getItem("userInfo"))

    const [listDetails, setListDetails] = useState({title:"", comments:"", userId: parseInt(currentUserId.id) })
    const [isAvailable, setIsAvailable] = useState(false)

    const handleFieldChange = event => {
        const stateToChange = {...listDetails}
        stateToChange.userId = parseInt(currentUserId.id)
        stateToChange[event.target.id] = event.target.value;
        setListDetails(stateToChange)
    }

    const postNewList = () => {
        LocalAPIManager.postNewList(listDetails)
        .then(setIsAvailable(true)).then(props.history.push('/home'))
    }


    return (
        <>
          <form>
              <h2>Please add a title and any comments about the list</h2>
              <fieldset>
                  <div className="listInfo">  
                    <input type="text" onChange={handleFieldChange} id="title" placeholder="Title"></input>
                    <input type="textarea" onChange={handleFieldChange} id="comments" placeholder="Comments"></input>
                  </div>
                  <Button disabled={isAvailable} onClick={()=> {postNewList()}} >Save New List</Button>
              </fieldset>
          </form>
        
        </>
    )

}

export default NewList
import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"
import Button from "@material-ui/core/Button"



const EditList = (props) => {

    const currentUserId = JSON.parse(sessionStorage.getItem("userInfo"))

    const [currentListDetails, setCurrentListDetails] = useState({id: props.match.params.listId, title:"", comments:"", userId: parseInt(currentUserId.id)})
    const [isAvailable, setIsAvailable] = useState(false)

    const handleFieldChange = (event) => {
        const stateToChange = {...currentListDetails}
        stateToChange[event.target.id] = event.target.value
        setCurrentListDetails(stateToChange)
    }
    
    const postEditedList = () => {
        LocalAPIManager.updateList(currentListDetails)
        .then(setIsAvailable(true)).then(alert("Edits saved"))
    }

    useEffect(() => {
        LocalAPIManager.getSingleListByIdWithoutJoinTable(props.match.params.listId).then(setCurrentListDetails)
    },[])

    return(
        <>
          <form>
              <h2>Edit the title or comments for the list</h2>
              <fieldset>
                  <div className="listInfo">  
                    <input type="text" onChange={handleFieldChange} id="title" value={currentListDetails.title} ></input>
                    <input type="textarea" onChange={handleFieldChange} id="comments" value={currentListDetails.comments}></input>
                  </div>
                  <Button disabled={isAvailable} onClick={()=> {postEditedList()}} >Save Edited List</Button>
              </fieldset>
          </form>
        
        </>


    )

}

export default EditList
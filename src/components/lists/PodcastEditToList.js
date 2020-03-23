import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"
import ListOptions from "./ListOptions"
import { Button } from "@material-ui/core"



const PodcastEditToList = props => {

    const [podcastDetails, setPodcastDetails] = useState({
        id: "",
        APIId: "",
        title: "",
        description: "",
        link: "",
        imageLink: ""
    })

    const [listId , setListId] = useState({id: 0})
    const [newJoinList, setNewJoinList] = useState({listId: "",
    savedPodcastId: ""})

    const [currentAllLists, setCurrentAllLists] = useState([])
    const [userOnlyLists, setUserOnlyLists] = useState([])

    const currentUserId = JSON.parse(sessionStorage.getItem("userInfo"))

    const filterListsForUser = () => {
        const filteredLists = currentAllLists.filter((listObject) => {
            return listObject.userId === parseInt(currentUserId.id)
        })
        setUserOnlyLists(filteredLists)
    }

    const handleFocusSelect = (event) => {
        const stateToChange = {...listId}
        stateToChange.id = parseInt(event.target.value)
        setListId(stateToChange)
    }

    const builtNewJoinList = () => {
         const stateToChange = {...newJoinList}
         stateToChange.listId = listId.id
         stateToChange.savedPodcastId = podcastDetails.id
         setNewJoinList(stateToChange)
    }


    

    useEffect(() => {
        LocalAPIManager.getOnlyBasicLists().then(response => setCurrentAllLists(response))
        LocalAPIManager.getSavedPodcastById(props.match.params.PodcastId).then(response => setPodcastDetails(response))
    },[])

    useEffect(() => {
        filterListsForUser()
    },[currentAllLists])

    useEffect(() => {
        const filteredForPrevPodcast = userOnlyLists.map(listItem => {
           return listItem.userId === currentUserId && listItem.listsSavedPodcasts.savedPodcastId === newJoinList.savedPodcastId
        })
        if (newJoinList.listId !== "" ) {
            LocalAPIManager.postNewJoinList(newJoinList)
        }
    },[newJoinList])


    return(
        <>
            <form>
                <select onChange={handleFocusSelect}>
                    <option>Select One</option>
                    {userOnlyLists.map((listObject)=> 
                    <ListOptions 
                    key={listObject.id}
                    value={listObject.id}
                    listObject={listObject}
                    {...props}
                     />)}
                </select>
                <Button onClick={builtNewJoinList}>Add to list</Button>
            </form>

            <div className="podcastCard__thumbnail">
            <div className="podcastCard__thumbnail__content">
                <picture>
                    <img src={podcastDetails.imageLink} alt="Podcast Imagery"></img>
                </picture>
                <h5>Title: <span className="podcastCard__thumbnail__content__title">{podcastDetails.title}</span></h5>
                <p className="podcast__thumbnail__content__description">Description: {podcastDetails.description}</p>
                <p>Website:<a target="_blank" href={podcastDetails.link}>Go to Podcast Website</a></p>
            </div>
        </div>
        
        </>
    )



}

export default PodcastEditToList
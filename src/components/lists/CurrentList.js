import React, { useState, useEffect } from "react"
import PodcastThumbNailCard from "../Podcasts/PodcastThumbNailCard"
import { Button } from "@material-ui/core"
import "./CurrentList.css"
import LocalAPIManager from "../modules/LocalAPIManager"


const CurrentList = props => {
    // const deleteList = props.deleteList
    
    const deleteList = (id) => {
        LocalAPIManager.deleteMainListbyId(id)
    } 

    const [podcastsObjectsOnList, setPodcastsObjectsOnList] = useState([])
    const [currentAllList, setCurrentAllList] = useState([])
    const [joinListsForPodcasts, setJoinListsForPodcasts] = useState([])
    
    const [isAvailable, setIsAvailable] = useState(true)
    
    
    const removeFromList = (id) => {
        LocalAPIManager.removePodcastFromListButNotDelete(id).then(() => {
            LocalAPIManager.getSingleListById(props.list.id).then(resp => setCurrentAllList(resp))
        })
    }
    
    
 
    const findPodcastsOnList = () => {
        const filteredPodcasts = joinListsForPodcasts.filter(objectInArray => {
            return objectInArray.listId === props.list.id
        })
        setPodcastsObjectsOnList(filteredPodcasts)
    }

    useEffect(() => {
        LocalAPIManager.getSingleListById(props.list.id)
        .then(resp => setCurrentAllList(resp))
        LocalAPIManager.getListsForPodcasts().then(resp => setJoinListsForPodcasts(resp) )
    }, [])

    useEffect(() => {
        findPodcastsOnList()
        
    },[joinListsForPodcasts])
    

    useEffect(()=> {
        setIsAvailable(false)
    },[currentAllList])
    


    return (
        <>
            <div className="homePage__currentList">
                <div>
                    <h4>{currentAllList.title}</h4>
                </div>
                <div>
                    <p>{currentAllList.comments}</p>
                </div>
                <div>
                    <button onClick={() => {deleteList(props.list.id)}} >Delete this list </button>
                </div>
            </div>

            <div className="podcast__thumbnail__container">
                {podcastsObjectsOnList.map(podcastListObject =>
                    <PodcastThumbNailCard
                        removeFromList={removeFromList}
                        key={podcastListObject.id}
                        podcast={podcastListObject}
                        {...props} />)}

            </div>
        </>


    )


}

export default CurrentList
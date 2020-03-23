import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"
import CurrentList from "../lists/CurrentList"
import HomePagePodcasts from "../Podcasts/HomePagePodcasts"
import "./Home.css"
import { Button } from "@material-ui/core"

const Home = props => {

    const [currentAvailablePodcasts, setCurrentAvailablePodcasts] = useState([])
    const [currentAllLists, setCurrentAllLists] = useState([])
    const [userOnlyLists, setUserOnlyLists] = useState([])

    const currentUserId = JSON.parse(sessionStorage.getItem("userInfo"))

    const filterListsForUser = () => {
        const filteredLists = currentAllLists.filter((listObject) => {
            return listObject.userId === parseInt(currentUserId.id)
        })
        setUserOnlyLists(filteredLists)
    }

    const deleteList = (id) => {
        LocalAPIManager.deleteMainListbyId(id).then(LocalAPIManager.getOnlyBasicLists().then(response=> setCurrentAllLists(response)))
    } 
    

    useEffect(() => {
       LocalAPIManager.getOnlyBasicLists().then(response => setCurrentAllLists(response))
       LocalAPIManager.getAllSavedPodcasts().then(response => setCurrentAvailablePodcasts(response)) 
    },[])

    useEffect(() => {
        filterListsForUser()
    }, [currentAllLists])


    return (
        <>
            <div>
                <div>
                    <Button onClick={() => props.history.push(`/newlist`)}>Create A New List</Button>
                </div>

                <div className="userListsContainer">
                    {userOnlyLists.map((listObject) =>
                        <CurrentList
                            deleteList={deleteList}
                            key={listObject.id}
                            list={listObject}
                            {...props} />)}


                </div>
                <div className="otherListsContainer">

                </div>
            </div>
            <div>
                <div className="podcastsAvailableContainer">
                    {currentAvailablePodcasts.map(podcast => 
                        <HomePagePodcasts 
                          podcast={podcast}
                          key={podcast.id}
                          {...props} />)}        
                </div>
            </div>




        </>




    )



}

export default Home
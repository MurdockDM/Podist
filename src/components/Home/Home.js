import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"
import CurrentList from "../lists/CurrentList"


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

    const removeFromList = (id) => {
        LocalAPIManager.removePodcastFromListButNotDelete(id).then(() => {
            LocalAPIManager.getOnlyBasicLists().then(response => setCurrentAllLists(response))
        })
    }

    useEffect(() => {
       LocalAPIManager.getOnlyBasicLists().then(response => setCurrentAllLists(response))

    }, [])

    useEffect(() => {
        filterListsForUser()
    }, [currentAllLists])

    return (
        <>
            <div>
                <div className="userListsContainer">
                    {userOnlyLists.map((listObject) =>
                        <CurrentList
                            key={listObject.id}
                            removeFromList={removeFromList}
                            list={listObject}
                            {...props} />)}


                </div>
                <div className="otherListsContainer">

                </div>
            </div>
            <div>
                <div className="podcastsAvailableContainer">

                </div>
            </div>




        </>




    )



}

export default Home
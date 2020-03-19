import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"
import CurrentList from "../lists/CurrentList"


const Home = props => {

    const [currentAvailablePodcasts, setCurrentAvailablePodcasts] = useState([])
    const [currentAllLists, setCurrentAllLists] = useState([])
    const [userOnlyLists, setUserOnlyLists] = useState([])

    const currentUserId = JSON.parse(sessionStorage.getItem("userInfo"))

    const filterListsForUser = () => {
        const filteredLists = currentAllLists.filter(listObject => {
            return listObject.list.userId === currentUserId.id
        })
        setUserOnlyLists(filteredLists)
        console.log(filteredLists)
    }

    useEffect(() => {
        LocalAPIManager.getAllLists().then(response => setCurrentAllLists(response))

    }, [])

    useEffect(() => {
        filterListsForUser()
    },[currentAllLists])

    return (
        <>
            <div>
                <div className="userListsContainer">
                    {userOnlyLists.map((listObject) =>
                        <CurrentList
                            key={listObject.id}
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
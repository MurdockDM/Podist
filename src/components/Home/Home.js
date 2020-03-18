import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"


const Home = props => {

    const [currentAvailablePodcasts, setCurrentAvailablePodcasts] = useState([])
    const [currentAllLists, setCurrentAllLists] = useState([])

    useEffect(() => {
        LocalAPIManager.getAllLists().then(response => setCurrentAllLists(response))
    })

    return (
        <>
            <div>
                <div classname="userListsContainer">


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
import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"
import CurrentList from "../lists/CurrentList"
import HomePagePodcasts from "../Podcasts/HomePagePodcasts"
import "./Home.css"
import { Button, Grid, makeStyles } from "@material-ui/core"
import Container from "@material-ui/core/Container"


const useStyles = makeStyles({
    root:{

    },
    listButton: {
        margin: '2rem 0 2rem 0'
    }
})


const Home = props => {

    const classes = useStyles()

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
        LocalAPIManager.deleteMainListbyId(id)
        .then(LocalAPIManager.getOnlyBasicLists)
        .then(response => setCurrentAllLists(response))
    }


    useEffect(() => {
        LocalAPIManager.getOnlyBasicLists().then(response => setCurrentAllLists(response)).then(filterListsForUser)
        LocalAPIManager.getAllSavedPodcasts().then(response => setCurrentAvailablePodcasts(response))
        
    }, [])

    useEffect(() => {
        if (currentAllLists !== []){ 
        filterListsForUser()}
    }, [currentAllLists])



    return (
        <Container>
            <Grid>
                <Grid container item justify='center'>
                    <Button className={classes.listButton} onClick={() => props.history.push(`/newlist`)}>Create A New List</Button>
                </Grid>

                <Grid item xs={12} container direction='row' wrap='wrap'>
                    {userOnlyLists.map((listObject) =>
                        <CurrentList
                            deleteList={deleteList}
                            key={listObject.id}
                            list={listObject}
                            {...props} />)}


                </Grid>
                <div className="otherListsContainer">

                </div>
            </Grid>
            <Grid>
                <div className="podcastsAvailableContainer">
                    {currentAvailablePodcasts.map(podcast =>
                        <HomePagePodcasts
                            podcast={podcast}
                            key={podcast.id}
                            {...props} />)}
                </div>
            </Grid>




        </Container>




    )



}

export default Home
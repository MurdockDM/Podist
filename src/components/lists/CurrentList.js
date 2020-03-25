import React, { useState, useEffect } from "react"
import PodcastThumbNailCard from "../Podcasts/PodcastThumbNailCard"
import { Button, Grid } from "@material-ui/core"
import "./CurrentList.css"
import LocalAPIManager from "../modules/LocalAPIManager"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import { findByLabelText } from "@testing-library/react"

const useStyles = makeStyles({
    root: { 
      minWidth: 15,
      maxWidth: 200,
      margin: 10,
    },
    media: {
      maxWidth: '100%',  
      paddingTop: '100%',
    },
    title: {
      fontSize: 10,
    },
    pos: {
      marginBottom: 12,
    },
    mainContainer: {
        flexDirection: "row",
        border: '2px black solid',
    }
  });



const CurrentList = props => {
    const deleteList = props.deleteList
    const classes = useStyles()

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
        if (currentAllList !== []){
        LocalAPIManager.getListsForPodcasts().then(resp => setJoinListsForPodcasts(resp))
        setIsAvailable(false)}  
    },[currentAllList])
    


    return (
        <Container display="flex" >
            <Grid lg={3} container className={classes.mainContainer}>
                <Grid item>
                    <div className={classes.root}>
                        <div>
                            <h4>{currentAllList.title}</h4>
                        </div>
                        <div>
                            <p>{currentAllList.comments}</p>
                        </div>
                        <div>
                            <button onClick={() => (props.history.push(`/${props.list.id}/editlist`))}>Edit List Details</button>
                            <button onClick={() => {deleteList(props.list.id)}} >Delete this list </button>
                        </div>
                        
                    </div>

                    <Grid className={classes.root}>
                        {podcastsObjectsOnList.map(podcastListObject =>
                            <PodcastThumbNailCard
                                removeFromList={removeFromList}
                                key={podcastListObject.id}
                                podcast={podcastListObject}
                                {...props} />)}

                    </Grid>
                </Grid>
            </Grid>        
        </Container>


    )


}

export default CurrentList
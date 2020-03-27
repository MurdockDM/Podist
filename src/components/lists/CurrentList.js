import React, { useState, useEffect } from "react"
import PodcastThumbNailCard from "../Podcasts/PodcastThumbNailCard"
import { Button, Grid } from "@material-ui/core"
import "./CurrentList.css"
import LocalAPIManager from "../modules/LocalAPIManager"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import { findByLabelText } from "@testing-library/react"
import { borders } from '@material-ui/system';

const useStyles = makeStyles({
    root: {
        width: '29%',
        height: '40%',
        borderRadius: '1%',
        border: '1px dotted black'
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
        LocalAPIManager.getListsForPodcasts().then(resp => setJoinListsForPodcasts(resp))
    }, [])

    useEffect(() => {
        findPodcastsOnList()
    }, [joinListsForPodcasts])


    useEffect(() => {
        if (currentAllList !== []) {
            LocalAPIManager.getListsForPodcasts().then(resp => setJoinListsForPodcasts(resp))
            setIsAvailable(false)
        }
    }, [currentAllList])



    return (
        <Container direction='column' className={classes.root} >
            <Grid container>
                <Grid justify="space-evenly" container spacing={3} >
                    <Grid item>
                        <h4>{currentAllList.title}</h4>
                    </Grid>
                    <Grid item>
                        <p>{currentAllList.comments}</p>
                    </Grid>
                    <Grid item container>
                        <Button onClick={() => (props.history.push(`/${props.list.id}/editlist`))}>Edit List Details</Button>
                        <Button onClick={() => { deleteList(props.list.id) }} >Delete this list </Button>
                    </Grid>

                </Grid>

                <Grid container>
                    {podcastsObjectsOnList.map(podcastListObject =>
                        <PodcastThumbNailCard
                            removeFromList={removeFromList}
                            key={podcastListObject.id}
                            podcast={podcastListObject}
                            {...props} />)}

                </Grid>
            </Grid>
        </Container>


    )


}

export default CurrentList
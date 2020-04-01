import React, { useState, useEffect } from "react"
import PodcastThumbNailCard from "../Podcasts/PodcastThumbNailCard"
import { Button, Grid } from "@material-ui/core"
import "./CurrentList.css"
import LocalAPIManager from "../modules/LocalAPIManager"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import { findByLabelText } from "@testing-library/react"
import { borders } from '@material-ui/system';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const useStyles = makeStyles({
    root: {
        width: '29%',
        height: '40%',
        borderRadius: '1%',
        border: '1px dotted black',
        xs: 12,
        boxShadow: '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)'
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
    },
    listButtons: {
        margin: '1rem'
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
                    <Grid item container direction='row'>
                        <Button color='primary' variant='outlined' className={classes.listButtons} onClick={() => (props.history.push(`/${props.list.id}/editlist`))}><EditRoundedIcon></EditRoundedIcon>Edit List Details</Button>
                        <Button color='secondary' variant='outlined' className={classes.listButtons} onClick={() => { deleteList(props.list.id) }} ><DeleteForeverRoundedIcon></DeleteForeverRoundedIcon>Delete this list </Button>
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
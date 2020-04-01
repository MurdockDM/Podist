import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"
import ListOptions from "./ListOptions"
import { Button, Grid } from "@material-ui/core"
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'

const PodcastEditToList = props => {

    const [podcastDetails, setPodcastDetails] = useState({
        id: "",
        APIId: "",
        title: "",
        description: "",
        link: "",
        imageLink: ""
    })

    const [listId, setListId] = useState({ id: 0 })
    const [newJoinList, setNewJoinList] = useState({
        listId: "",
        savedPodcastId: ""
    })

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
        const stateToChange = { ...listId }
        stateToChange.id = parseInt(event.target.value)
        setListId(stateToChange)
    }

    const builtNewJoinList = () => {
        const stateToChange = { ...newJoinList }
        stateToChange.listId = listId.id
        stateToChange.savedPodcastId = podcastDetails.id
        setNewJoinList(stateToChange)
    }




    useEffect(() => {
        LocalAPIManager.getOnlyBasicLists().then(response => setCurrentAllLists(response))
        LocalAPIManager.getSavedPodcastById(props.match.params.PodcastId).then(response => setPodcastDetails(response))
    }, [])

    useEffect(() => {
        filterListsForUser()
    }, [currentAllLists])

    useEffect(() => {
        if (newJoinList.listId !== "" && newJoinList.listId !== 0) {
            LocalAPIManager.postNewJoinList(newJoinList).then(props.history.push('/home'))
        }
    }, [newJoinList])


    return (
        <Grid container justify='center' direction='column-reverse' wrap='wrap'>
            <Grid container direction='column' justify='center' item>
                <Grid container justify='center' item>
                    <Select variant='outlined' color='primary' native variant='standard' label='Select a Genre' onChange={handleFocusSelect}>
                        <option variant='filled'>Select One</option>
                        {userOnlyLists.map((listObject) =>
                            <ListOptions
                                key={listObject.id}
                                value={listObject.id}
                                listObject={listObject}
                                {...props}
                            />)}
                    </Select>
                </Grid>
                <Grid container justify='center' item>
                    <Button onClick={builtNewJoinList}>Add to list</Button>
                </Grid>
            </Grid>
            <Grid container justify='center' item>
                <Grid container justify='space-around' direction='column' item >
                    <Grid item container justify='center'>
                        <Typography variant='h5'>
                            Which list do you want to add this podcast to?
                        </Typography>
                    </Grid>
                    <Grid container justify='center' item>
                        <picture>
                            <img src={podcastDetails.imageLink} alt="Podcast Imagery"></img>
                        </picture>
                    </Grid>
                    <Grid container justify='center' item>   
                        <p>Website:<a target="_blank" href={podcastDetails.link}>Go to Podcast Website</a></p>
                    </Grid>
                </Grid>
            </Grid>

        </Grid >
    )



}

export default PodcastEditToList
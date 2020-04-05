import React, { useState, useEffect } from "react"
import PodcastThumbNailCard from "../Podcasts/PodcastThumbNailCard"
import { Button, Grid } from "@material-ui/core"
import "./CurrentList.css"
import LocalAPIManager from "../modules/LocalAPIManager"
import { makeStyles } from "@material-ui/core/styles"
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '5%',
        borderRadius: '1%',
        border: '1px dotted black',
        xs: 12,
        boxShadow: '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
        margin: '1.5rem',
        padding: '1rem',
        backgroundColor: '#fafafa'

    },
    media: {
        maxWidth: '100%',
        paddingTop: '100%',
    },
    cardHeader: {
        border: '4px solid #1565c0',
        borderRadius: '5%',
        marginBottom: '3%'
    },
    title: {
        fontSize: '1rem',
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
    },
    comments: {
        justifyContent: 'center'
    },
    editButton: {
        background: 'linear-gradient(45deg, #1565c0 10%, #42a5f5 30%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        fontWeight: 500,
        height: 36,
        padding: '0 30px',
    },
    deleteButton: {
        background: 'linear-gradient(45deg, #c62828 10%, #ef5350 30%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        fontWeight: 500,
        height: 36,
        padding: '0 30px',
    }

});



const CurrentList = props => {

    const deleteList = props.deleteList
    const classes = useStyles()
    const currentUserId = JSON.parse(sessionStorage.getItem("userInfo"))

    const [podcastsObjectsOnList, setPodcastsObjectsOnList] = useState([])
    const [currentAllList, setCurrentAllList] = useState([])
    const [joinListsForPodcasts, setJoinListsForPodcasts] = useState([])

    const [isAvailable, setIsAvailable] = useState(true)

    const [userHasRights, setUserHasRights] = useState(false)

    const removeFromList = (id) => {
        LocalAPIManager.removePodcastFromListButNotDelete(id).then(() => {
            LocalAPIManager.getSingleListById(props.list.id).then(resp => setCurrentAllList(resp))
        })
    }

    const handleUserCheck = () => {
        if (parseInt(currentUserId.id) === props.list.userId) {
            setUserHasRights(true)
        }
    }

    const findPodcastsOnList = () => {
        const filteredPodcasts = joinListsForPodcasts.filter(objectInArray => {
            return objectInArray.listId === props.list.id
        })
        setPodcastsObjectsOnList(filteredPodcasts)
    }

    useEffect(() => {
        handleUserCheck();
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
        <Grid container direction='row' wrap='wrap' className={classes.root} >
            <Grid container>
                <Grid justify="space-evenly" container spacing={2} >
                    <Grid className={classes.cardHeader} justify='center' container>
                        <Grid wrap='wrap' container justify='space-around' item>
                            <Typography variant='h5'>{currentAllList.title}</Typography>
                        </Grid>
                        <Grid xs={6} container item>
                            <Typography className={classes.comments} justify='center' variant='h6'>{currentAllList.comments}</Typography>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid direction='row' wrap='wrap' container>
                    {podcastsObjectsOnList.map(podcastListObject =>
                        <PodcastThumbNailCard
                            userHasRights={userHasRights}
                            removeFromList={removeFromList}
                            key={podcastListObject.id}
                            podcast={podcastListObject}
                            {...props} />)}

                </Grid>
                    <Grid justify='space-around' item container direction='row'>
                        {userHasRights
                            ? <Button className={classes.editButton} variant='outlined' onClick={() => (props.history.push(`/${props.list.id}/editlist`))}><EditRoundedIcon></EditRoundedIcon>Edit List Details</Button>
                            : null}
                        {userHasRights
                            ? <Button className={classes.deleteButton} variant='outlined' onClick={() => { deleteList(props.list.id) }} ><DeleteForeverRoundedIcon></DeleteForeverRoundedIcon>Delete this list </Button>
                            : null}
                    </Grid>
            </Grid>
        </Grid>


    )


}

export default CurrentList
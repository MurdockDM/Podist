import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"
import CurrentList from "../lists/CurrentList"
import HomePagePodcasts from "../Podcasts/HomePagePodcasts"
import "./Home.css"
import { Button, Grid, makeStyles, Paper } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
    root:{
        backgroundColor: '#eeeeee',
        border: 'solid #7986cb',
        borderRadius: '2%'
    },
    listButton: {
        margin: '2rem 0 2rem 0'
    },
    listsTitlePaper: {
        margin: '2rem',
        backgroundColor: '#7986cb'
    },
    listsTitle: {
        color: '#fff',
        margin: '1rem'

    }
})


const Home = props => {

    const classes = useStyles()

    const [currentAvailablePodcasts, setCurrentAvailablePodcasts] = useState([])
    const [currentAllLists, setCurrentAllLists] = useState([])
    const [userOnlyLists, setUserOnlyLists] = useState([])
    const [otherUserLists, setOtherUserLists] = useState([])

    const currentUserId = JSON.parse(sessionStorage.getItem("userInfo"))

    const filterListsForUser = () => {
        const filteredLists = currentAllLists.filter((listObject) => {
            return listObject.userId === parseInt(currentUserId.id)
        })    
    setUserOnlyLists(filteredLists)
    }

    const filterListsForNotUser = () => {
        const filteredLists = currentAllLists.filter((listObject) => {
            return listObject.userId !== parseInt(currentUserId.id)
        })
        setOtherUserLists(filteredLists)
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
        filterListsForUser()
        filterListsForNotUser()}
    }, [currentAllLists])



    return (
        <Container className={classes.root}>
            <Grid container direction='column'>
                <Grid container item justify='center'>
                    <Button color='primary' variant='outlined' className={classes.listButton} onClick={() => props.history.push(`/newlist`)}>Create A New List</Button>
                </Grid>
                <Grid container justify='center' item>
                    <Paper className={classes.listsTitlePaper}>
                        <Typography className={classes.listsTitle} variant='h4'>Your lists</Typography>
                    </Paper>
                </Grid>    
                <Grid item container direction='row' wrap='wrap'>
                    {userOnlyLists.map((listObject) =>
                        <CurrentList
                            deleteList={deleteList}
                            key={listObject.id}
                            list={listObject}
                            {...props} />)}
                </Grid>
                <Grid container justify='center' item>
                    <Paper className={classes.listsTitlePaper}>
                        <Typography className={classes.listsTitle} variant='h5'>Other user lists</Typography>
                    </Paper>
                </Grid>    
                <Grid item container direction='row' wrap='wrap'>
                    {otherUserLists.map((listObject) =>
                       <CurrentList
                            key={listObject.id}
                            list={listObject}
                            {...props} />
                            )}
                </Grid>
            </Grid>
        </Container>




    )



}

export default Home
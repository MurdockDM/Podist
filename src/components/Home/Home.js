import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"
import CurrentList from "../lists/CurrentList"
import "./Home.css"
import { Button, Grid, makeStyles, Paper } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
    root:{
        backgroundColor: '#eeeeee',
        border: 'solid #1565c0',
        borderRadius: '2%'
    },
    listButton: {
        background: 'linear-gradient(45deg, #388e3c 10%, #66bb6a 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        fontWeight: 600,
        height: 48,
        padding: '0 30px',
        marginTop: '1rem'
    },
    listsTitlePaper: {
        margin: '2rem',
        backgroundColor: '#42a5f5'
    },
    listsTitle: {
        color: '#fff',
        margin: '1rem',
        fontWeight: 600

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
                <Grid container justify='center' item>
                    <Paper className={classes.listsTitlePaper}>
                        <Typography className={classes.listsTitle} variant='h4'>Your lists</Typography>
                    </Paper>
                </Grid>    
                <Grid container item justify='center'>
                    <Button className={classes.listButton} onClick={() => props.history.push(`/newlist`)}>Create A New List</Button>
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
                <Grid item container direction='column' wrap='wrap'>
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
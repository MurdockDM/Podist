import React, { useState, useEffect } from "react"
import LocalAPIManager from "../modules/LocalAPIManager"
import Button from "@material-ui/core/Button"
import { Grid, TextField, TextareaAutosize, Typography, makeStyles } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

const useStyles = makeStyles({
    root:{

    },
    title: {
        margin: '2rem'
    },
    listTitle: {
        margin: '1rem'
    },
    listComments: {
        margin: '1rem'
    }
})

const EditList = (props) => {

    const classes = useStyles()

    const currentUserId = JSON.parse(sessionStorage.getItem("userInfo"))

    const [currentListDetails, setCurrentListDetails] = useState({ id: props.match.params.listId, title: "", comments: "", userId: parseInt(currentUserId.id) })
    const [isAvailable, setIsAvailable] = useState(false)

    const handleFieldChange = (event) => {
        const stateToChange = { ...currentListDetails }
        stateToChange[event.target.id] = event.target.value
        setCurrentListDetails(stateToChange)
    }

    const postEditedList = () => {
        LocalAPIManager.updateList(currentListDetails)
            .then(setIsAvailable(true)).then(alert("Edits Saved")).then(props.history.push('/home'))
    }

    useEffect(() => {
        LocalAPIManager.getSingleListByIdWithoutJoinTable(props.match.params.listId).then(setCurrentListDetails)
    }, [])

    return (
        <Grid>
            <Grid container justify='center'>
                <Grid xs={4} container direction='column' justify='center'>
                    <Grid item container justify='center'>
                        <Typography className={classes.title} variant='h5'>Edit the title or comments for the list</Typography>
                    </Grid>
                    <Grid item container direction='column' className="listInfo">
                        <TextField color='primary' label='List Title' className={classes.listTitle} margin='normal' type="text" variant='outlined' onChange={handleFieldChange} id="title" value={currentListDetails.title} ></TextField>
                        <TextareaAutosize color='primary' label='List Comments' rowsMin={4} className={classes.listComments} variant='outlined' onChange={handleFieldChange} id="comments" value={currentListDetails.comments}></TextareaAutosize>
                    </Grid>
                    <Grid container direction='row' justify='flex-end' item>
                        <Button color='primary' variant='contained' disabled={isAvailable} onClick={() => { postEditedList() }} >Save Edited List</Button>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>


    )

}

export default EditList
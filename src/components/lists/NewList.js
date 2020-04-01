import React, { useState, useEffect} from "react"
import PodcastThumbNailCard from "../Podcasts/PodcastThumbNailCard"
import LocalAPIManager from "../modules/LocalAPIManager"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { TextField } from "@material-ui/core"


const NewList = props => {
    const currentUserId = JSON.parse(sessionStorage.getItem("userInfo"))

    const [listDetails, setListDetails] = useState({title:"", comments:"", userId: parseInt(currentUserId.id) })
    const [isAvailable, setIsAvailable] = useState(false)

    const handleFieldChange = event => {
        const stateToChange = {...listDetails}
        stateToChange.userId = parseInt(currentUserId.id)
        stateToChange[event.target.id] = event.target.value;
        setListDetails(stateToChange)
    }

    const postNewList = () => {
        LocalAPIManager.postNewList(listDetails)
        .then(setIsAvailable(true)).then(props.history.push('/home'))
    }


    return (
        <Grid container justify='center' alignContent='center'>
          <Grid container direction='column' xs={12} sm={6} item>
              <Typography variant='h6'>Please add a title and any comments about the list</Typography>
              <Grid>
                  <Grid className="listInfo">  
                    <TextField margin='normal' required fullWidth label='Title' autoFocus variant='outlined' onChange={handleFieldChange} id="title"></TextField>
                    <TextField margin='normal' required fullWidth label='Comments'  variant='outlined' onChange={handleFieldChange} id="comments"></TextField>
                  </Grid>
                  <Button variant='contained' color='primary' disabled={isAvailable} onClick={()=> {postNewList()}} >Save New List</Button>
              </Grid>
          </Grid>
        
        </Grid>
    )

}

export default NewList
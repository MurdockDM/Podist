import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';



const useStyles = makeStyles({
  root: { 
    minWidth: 15,
    maxWidth: 200,
    margin: 10,
    xs: 12,
    boxShadow: '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)' 
  },
  media: {
    maxWidth: '100%',  
    paddingTop: '100%',
    height: 'auto'
  },
  title: {
    fontSize: 10,
  },
  pos: {
    marginBottom: 12,
  },
});

const HomePagePodcasts = (props) => {
    const podcast = props.podcast
  
const classes = useStyles();

  const [isAvailable, setIsAvailable] = useState(false)

  const [podcastDetails, setPodcastDetails] = useState({
    id: "",
    APIId: "",
    title: "",
    description: "",
    link: "",
    imageLink: "",
    thumbnail: ""
  })

  useEffect(()=> {
      setPodcastDetails(podcast)
      setIsAvailable(true)
  },[])

  

  

  return (
    <Card className={classes.root} variant="outlined" >
      <CardContent>
        <CardMedia
            src="image"
            className={classes.media}
            image={podcastDetails.thumbnail}
            title="podcast imagery"
        />
        <Typography variant="h5" component="h4">
            {podcastDetails.title}
        </Typography>
        <Typography>
            <a target="_blank" href={podcastDetails.link}>Podcast website</a>
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => {props.history.push(`/${podcastDetails.id}/podcasttolist`)}} color="primary"><AddBoxIcon></AddBoxIcon>Add to a List</Button>
      </CardActions>
    </Card>
  );
}

export default HomePagePodcasts

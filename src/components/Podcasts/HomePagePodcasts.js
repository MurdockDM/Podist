import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Icon } from '@material-ui/core';

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
});

export default function HomePagePodcasts(props) {
  const classes = useStyles();

  const [isAvailable, setIsAvailable] = useState(false)

  const [podcastDetails, setPodcastDetails] = useState({
    id: "",
    APIId: "",
    title: "",
    description: "",
    link: "",
    imageLink: ""
  })

  useEffect(()=> {
      setPodcastDetails(props.podcast)
      setIsAvailable(true)
  },[])

  

  

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <CardMedia
            className={classes.media}
            image={podcastDetails.imageLink}
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
        <Button onClick={() => {props.history.push(`/${podcastDetails.id}/podcasttolist`)}} color="primary">Add to a List</Button>
        <Button disabled={isAvailable} color="secondary">Delete from database</Button>
      </CardActions>
    </Card>
  );
}

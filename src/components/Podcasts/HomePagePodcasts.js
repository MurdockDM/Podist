import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse'


const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 15,
    maxWidth: 200,
    margin: 10,
    xs: 12,
    border: '1px solid #1565c0',
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
  button: {
    background: 'linear-gradient(45deg, #1565c0 10%, #42a5f5 40%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    fontWeight: 500,
    height: 48,
    padding: '0 30px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

const HomePagePodcasts = (props) => {
  const podcast = props.podcast

  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setPodcastDetails(podcast)
    setIsAvailable(true)
  }, [])





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
      </CardContent>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}>
        <ExpandMoreIcon />
      </IconButton>
      <CardActions>
        <Collapse in={expanded} timeout="auto">
          <Typography>
            <a target="_blank" rel='noopener noreferrer' href={podcastDetails.link}>Podcast website</a>
          </Typography>
          <Typography>{podcastDetails.description}</Typography>
        </Collapse>
      </CardActions>
      <CardActions>
        <Button className={classes.button} onClick={() => { props.history.push(`/${podcastDetails.id}/podcasttolist`) }} color="primary"><AddBoxIcon fontSize='large'></AddBoxIcon>Add to a List</Button>
      </CardActions>
    </Card>
  );
}

export default HomePagePodcasts

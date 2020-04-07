import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import Textfield from "@material-ui/core/TextField"
import ExternalAPIManager from "../modules/ExternalAPIManager"
import PodcastCard from "../Podcasts/PodcastCard"
import { FormControl, makeStyles, Grid, Typography } from "@material-ui/core"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import GenreOptions from "./GenreOptions"

const useStyles = makeStyles(theme => ({
    root: {
        border: '0.2rem #1565c0 ridge',
        marginTop: '5%',
        
    },
    formcontrol: {
        margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme,
    },
    searchResultsGrid: {
        display: 'flex'

    },
    podcastsGrid: {
        width: '23%',
        display: 'flex',
        flexDirection: 'row'
    },
    submitButtons: {
        background: 'linear-gradient(45deg, #1565c0 10%, #42a5f5 30%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        fontWeight: 500,
        height: 36,
        padding: '0 30px',
        marginTop: '0.5rem'
    }
}))







const Search = (props) => {
    const [searchTerms, setSearchTerms] = useState({ searchedWords: "", genres: "" })
    const [podcastResults, setPodcastResults] = useState([])
    const [genreOptions, setGenreOptions] = useState([])
    const [isAvailable, setIsAvailable] = useState(false)
    const [selectedGenre, setSelectedGenre] = useState({ genre: 0 })



    const classes = useStyles()

    const handleInputChange = event => {
        const stateToChange = { ...searchTerms };
        const textString = event.target.value
        const encodedSearch = encodeURI(textString)
        stateToChange[event.target.id] = encodedSearch
        setSearchTerms(stateToChange)
    }

    const handleFocusSelect = (event) => {
        const stateToChange = { ...selectedGenre }
        stateToChange.genre = parseInt(event.target.value)
        setSelectedGenre(stateToChange)
    }

    const populateOptions = () => {
        return ExternalAPIManager.getGenres().then(genresFromAPI => {
            setGenreOptions(genresFromAPI.genres)
        })
    }

    const handleSearch = event => {
        event.preventDefault();

        return ExternalAPIManager.getSearchPodcastsWithOutGenresExplicit(searchTerms.searchedWords)
            .then(searchedPodcasts => {
                setPodcastResults(searchedPodcasts.results)
                setIsAvailable(true)
            })
    }

    const searchGenres = (event) => {
        event.preventDefault();
        ExternalAPIManager.getBestPodcastsByGenre(selectedGenre.genre).then(resp => setPodcastResults(resp.podcasts))
    }

    useEffect(() => {
        populateOptions();
    }, [])

    return (
        <Grid >
            <Grid container direction="row" justify='space-evenly' className={classes.root}>
                <FormControl className={classes.formcontrol}>
                    <Grid container direction='column' justify='center' item alignContent='center'>
                        <Textfield variant='outlined' label='Find New Podcasts' autoFocus color='primary' type="search" onChange={handleInputChange} id="searchedWords" />
                        <Button className={classes.submitButtons} onClick={handleSearch}>Search</Button>
                    </Grid>
                </FormControl>
                <Grid>
                    <Typography variant='h5'>Search by key words or by genres</Typography>
                </Grid>
                <FormControl>
                    <Grid container direction='column' justify='center' item alignContent='space-between'>
                        <Select native variant='standard' label="select a genre" color='primary' onChange={handleFocusSelect} id="genreSelect" className={classes.formcontrol}>
                            <option value='0' >Random</option>
                            {genreOptions.map(genre =>
                                <GenreOptions
                                    key={genre.id}
                                    genre={genre}
                                    {...props} />)}
                        </Select>
                        <InputLabel htmlFor="genreSelect">Select a genre instead</InputLabel>
                        <Button className={classes.submitButtons} onClick={searchGenres}>Search Genres</Button>
                    </Grid>
                </FormControl>
            </Grid>
            <Grid container>
                <Grid container direction="row" justify="space-evenly">
                    {podcastResults.map((podcast, index) =>
                        <PodcastCard
                            key={index}
                            podcast={podcast}
                            {...props} />)}

                </Grid>

            </Grid>
        </Grid>

    )

}

export default Search

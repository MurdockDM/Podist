import React, { useState, useEffect } from "react"
// import ExternalAPIManager from "../modules/ExternalAPIManager"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import Textfield from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Typography from "@material-ui/core/Typography"
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Grid from "@material-ui/core/Grid"
import ExternalAPIManager from "../modules/ExternalAPIManager"
import GenreOptions from "./GenreOptions"
import PodcastCard from "../Podcasts/PodcastCard"

const Search = (props) => {
    const [searchTerms, setSearchTerms] = useState({searchedWords: "", genres: ""})
    const [podcastResults, setPodcastResults] = useState([])
    const [genreOptions, setGenreOptions] = useState([])
    const [isAvailable, setIsAvailable] = useState(false)


    const handleInputChange = event => {
        const stateToChange = { ...searchTerms };
        const textString = event.target.value
        const arrayOfTextString = textString.split(" ")
        if (arrayOfTextString.length === 1) {
            
            stateToChange[event.target.id] = arrayOfTextString.join("")
        }else if (arrayOfTextString.length >= 2) {
            stateToChange[event.target.id] = arrayOfTextString.join("%20")
        }
        setSearchTerms(stateToChange)
    }

    const populateOptions = () => {
      return ExternalAPIManager.getGenres().then(genresFromAPI => {
          setGenreOptions(genresFromAPI.genres)
      })
    }

    const handleSearch = event => {
        event.preventDefault();

        return ExternalAPIManager.getSearchPodcastsWithOutGenresExplicit(searchTerms.searchedWords, "57")
        .then(searchedPodcasts => {
            setPodcastResults(searchedPodcasts.results)
        })
    }

    useEffect(() => {
        populateOptions();
    }, [])

    return (
        <>
            <form>
                <fieldset>
                    <input type="search" onChange={handleInputChange} id="searchedWords" />
                </fieldset>
                <Button variant="contained" color="primary" onClick={handleSearch}>Search Podcasts</Button>
            </form>
            <form>
                <fieldset>
                    <select>
                        {genreOptions.map(genre => 
                            <GenreOptions 
                                key={genre.id}
                                genre={genre}
                                {...props}/>)}
                    </select>
                </fieldset>
            </form>

            <div className="searchedPodcasts__container">
                {podcastResults.map((podcast, index) => 
                    <PodcastCard 
                        key={index}
                        podcast={podcast}
                        {...props} />)}

            </div>
        </>
    )

}

export default Search

import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import ExternalAPIManager from "../modules/ExternalAPIManager"
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

        return ExternalAPIManager.getSearchPodcastsWithOutGenresExplicit(searchTerms.searchedWords)
        .then(searchedPodcasts => {
            setPodcastResults(searchedPodcasts.results)
            setIsAvailable(true)
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

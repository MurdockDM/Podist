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

const Search = (props) => {
    const [searchTerms, setSearchTerms] = useState({searchedWords: "", genres: ""})
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
        
    }

    const handleSearch = event => {
        event.preventDefault();

        ExternalAPIManager.getSearchWithGenresExplicit(searchTerms.searchedWords, parseInt(searchTerms.genres) )
    }

    useEffect(() => {

    })

    return (
        <>
            <form>
                <fieldset>
                    <input type="search" onChange={handleInputChange} id="searchedWords" />
                </fieldset>
                <button onClick={handleSearch}>Search Podcasts</button>
            </form>
        </>
    )

}

export default Search

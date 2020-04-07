import React from "react"



const GenreOptions = props => {
    return (
        <option value={props.genre.id} >{props.genre.name}</option>
    )
}

export default GenreOptions
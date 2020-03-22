import React from "react"


const ListOptions = props => {
    return(
    <option value={props.listObject.id} >{props.listObject.title}</option>
    )
}

export default ListOptions
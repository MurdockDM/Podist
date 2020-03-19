import React, { useState, useEffect } from "react"





const CurrentList = props => {

    const [podcastsOnList, setPodcastsOnList] = useState([])
    


    return (
        <>
            <div>
                <div>
                    <h5>{props.list.list.title}</h5>
                </div>
                <div>
                    <p>{props.list.list.comments}</p>
                </div>
            </div>

            <div>
            
            </div>       
        </>


    )


}

export default CurrentList
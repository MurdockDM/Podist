import { Route, Redirect } from "react-router-dom"
import React from "react"
import Login from "./auth/Login"
import Search from "./search/Search"
import NewList from "./lists/NewList"
import Home from "./Home/Home"
import PodcastEditToList from "./lists/PodcastEditToList"


const ApplicationViews = (props) => {
    const loggedInUser = props.loggedInUser
    const setAsUser = props.setAsUser

    return (
        <React.Fragment>
            <Route path="/search" render={props => {
                return <Search loggedInUser={loggedInUser} {...props} /> 
            }}
            />
            <Route path="/login" render={props => {
                return <Login loggedInUser={loggedInUser} setAsUser={setAsUser} {...props} /> 
            }}
            />
            <Route path="/:PodcastId/podcasttolist" render={props => {
                return <PodcastEditToList PodcastId={parseInt(props.match.params.PodcastId)} loggedInUser={loggedInUser} setAsUser={setAsUser} {...props} /> 
            }}
            />
            <Route path="/home" render={props => {
                return <Home loggedInUser={loggedInUser} setAsUser={setAsUser} {...props} /> 
            }}
            />




        </React.Fragment>
    )
}

export default ApplicationViews
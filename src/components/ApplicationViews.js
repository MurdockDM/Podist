import { Route, Redirect } from "react-router-dom"
import React from "react"
import Login from "./auth/Login"
import Search from "./search/Search"
import NewList from "./lists/NewList"


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
            <Route path="/:PodcastId/newlist" render={props => {
                return <NewList loggedInUser={loggedInUser} setAsUser={setAsUser} {...props} /> 
            }}
            />




        </React.Fragment>
    )
}

export default ApplicationViews
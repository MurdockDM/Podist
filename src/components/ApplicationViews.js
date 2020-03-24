import { Route, Redirect } from "react-router-dom"
import React from "react"
import Login from "./auth/Login"
import Search from "./search/Search"
import NewList from "./lists/NewList"
import Home from "./Home/Home"
import PodcastEditToList from "./lists/PodcastEditToList"
import NewUserForm from "./auth/NewUserForm"
import EditList from "./lists/EditList"

const ApplicationViews = (props) => {
    const loggedInUser = props.loggedInUser
    const setAsUser = props.setAsUser
    const clearUser = props.clearUser

    return (
        <React.Fragment>
            <Route path="/search" render={props => {
                return <Search loggedInUser={loggedInUser} {...props} />
            }}
            />
            <Route exact path="/login" render={props => {
                return <Login loggedInUser={loggedInUser} clearUser={clearUser} setAsUser={setAsUser} {...props} />
            }}
            />
            <Route path="/:PodcastId/podcasttolist" render={props => {
                if (loggedInUser) {
                    return <PodcastEditToList PodcastId={parseInt(props.match.params.PodcastId)} loggedInUser={loggedInUser} setAsUser={setAsUser} {...props} />
                } else {
                    return <Redirect to='/login' />
                }
            }}
            />
            <Route path="/home" render={props => {
                if (loggedInUser) {
                    return <Home loggedInUser={loggedInUser} setAsUser={setAsUser} {...props} />
                } else {
                    return <Redirect to='/login' />
                }
            }}
            />
            <Route path="/newuser" render={props => {
                return <NewUserForm loggedInUser={loggedInUser} setAsUser={setAsUser} {...props} />
            }}
            />
            <Route path="/newlist" render={props => {
                return <NewList loggedInUser={loggedInUser} setAsUser={setAsUser} {...props} />
            }}
            />
            <Route path="/:listId/editlist" render={props => {
                return <EditList listId={parseInt(props.match.params.listId)} loggedInUser={loggedInUser} setAsUser={setAsUser} {...props} />
            }}
            />




        </React.Fragment>
    )
}

export default ApplicationViews
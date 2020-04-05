import React, { useState } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Podist.css";
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  root:{
    backgroundColor: '#eeeeee'
  }
})


const Podist = () => {
    const userAuthenticated = () => sessionStorage.getItem("userInfo") !== null;
    const classes = useStyles();

    const [loggedInUser , setLoggedInUser] = useState(userAuthenticated());

    const setAsUser = user => {
        sessionStorage.setItem("userInfo", JSON.stringify(user));
        setLoggedInUser(userAuthenticated())
    }

    const clearUser = () => {
      sessionStorage.removeItem("userInfo")
      setLoggedInUser(userAuthenticated())
    }
  
    return (
        <>
          <NavBar loggedInUser={loggedInUser} clearUser={clearUser} />
          <ApplicationViews loggedInUser={loggedInUser} clearUser={clearUser} setAsUser={setAsUser} />
        </>
      );


}

export default Podist

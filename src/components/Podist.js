import React, { useState } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Podist.css";

const Podist = () => {
    const userAuthenticated = () => sessionStorage.getItem("userInfo") !== null;

    const [loggedInUser , setLoggedInUser] = useState(userAuthenticated());

    const setAsUser = user => {
        sessionStorage.setItem("userInfo", JSON.stringify(user));
        setLoggedInUser(userAuthenticated())
    }

    return (
        <>
          {/* <NavBar loggedInUser={loggedInUser} /> */}
          <ApplicationViews loggedInUser={loggedInUser} setAsUser={setAsUser} />
        </>
      );


}

export default Podist

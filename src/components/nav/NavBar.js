import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
    
    const handleLogout = () => {
        props.clearUser();
        props.history.push("/login")
    }

    return (
        <header>
            <h1 className="site-title">Podist</h1>
            <nav className="navbar__links__container">
                <ul>
                    <li>
                        <NavLink className="navLink" to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/newuser">New User Signup</NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/search">Search For New Podcasts</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )


}

export default withRouter(NavBar);
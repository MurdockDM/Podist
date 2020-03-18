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
            <nav>
                <ul>
                    <li>
                        <NavLink className="navLink" to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/search">Search Page</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )


}

export default withRouter(NavBar);
import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { Link } from "@material-ui/core";

const NavBar = props => {
    const clearUser = props.clearUser
    
    const handleLogout = () => {
        clearUser();
        props.history.push('/login')
    }

    const loggedInUser = props.loggedInUser

    return (
        <header>
            <h1 className="site-title">Podist</h1>
            <nav className="navbar__links__container">
                <ul>
                {loggedInUser
                        ?<li>
                            <NavLink to="/login" className="navlink" onClick={handleLogout}>Logout</NavLink>
                        </li>
                        : <li>
                            <NavLink className="navlink" to="/login">Login</NavLink>
                        </li>}
                    {loggedInUser
                        ? null
                        : <li>
                            <NavLink className="navLink" to="/newuser">New User Signup</NavLink>
                        </li>
                    }
                    {loggedInUser
                        ? <li>
                            <NavLink className="navLink" to="/home">Home</NavLink>
                        </li>
                        : null}
                    <li>
                        <NavLink className="navLink" to="/search">Search For New Podcasts</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )


}

export default withRouter(NavBar);
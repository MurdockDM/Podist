import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Link from "@material-ui/core/Link";
import { Breadcrumbs, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'



const useStyles = makeStyles({
    root: {

    },
    title: {
        padding: '1rem',
        color: '#fff'
    },
    titlePaper: {
        marginBottom: '3rem',
        marginTop: '2rem',
        backgroundColor: '#7986cb'
    }
})



const NavBar = props => {
    const clearUser = props.clearUser

    const classes = useStyles()
    
    const handleLogout = () => {
        clearUser();
        props.history.push('/login')
    }

    const loggedInUser = props.loggedInUser

    return (
        <Grid container>
            <Grid item container justify='center'>
                <Paper variant='elevation' elevation={10} className={classes.titlePaper}>
                    <Typography variant='h2' className={classes.title}>Podist</Typography>
                </Paper>
            </Grid>
            <Grid item justify='center' container>
                <Breadcrumbs justify='center'>
                    {loggedInUser
                        ? null
                        :<NavLink className="navLink" to="/newuser">New User Signup</NavLink>
                        
                    }
                    {loggedInUser
                        ?<NavLink className="navLink" to="/home"><HomeIcon></HomeIcon>Home</NavLink>
                        : null}
                    <NavLink className="navLink" to="/search"><SearchIcon></SearchIcon>Search For New Podcasts</NavLink>
                    {loggedInUser
                            ?<NavLink to="/login" className="navlink" onClick={handleLogout}>Logout</NavLink>
                            : <NavLink className="navlink" to="/login">Login</NavLink>
                            }
                </Breadcrumbs>
            </Grid>
        </Grid>
    )


}

export default withRouter(NavBar);
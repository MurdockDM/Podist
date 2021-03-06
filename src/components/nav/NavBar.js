import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { Breadcrumbs, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';



const useStyles = makeStyles({
    root: {
        backgroundColor: '#eeeeee',
        borderBottom: '5px solid #1565c0',
        marginBottom: '1rem'
    },
    title: {
        padding: '1rem',
        color: '#fff',
        fontWeight: '700'
    },
    titlePaper: {
        marginBottom: '3rem',
        marginTop: '2rem',
        backgroundColor: '#1565c0'
    },
    loginLogout: {
        width: '95%',
        marginTop: '1rem'
    },
    loginLogoutLinks: {
        marginLeft: '1rem'
    },
    breadCrumbs:{
        marginBottom: '2rem',
    },
    breadCrumbLinks: {
       color: '#1565c0'
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
        <Grid className={classes.root} container justify='center'>
            <Grid className={classes.loginLogout} container justify='flex-end'>
                {loggedInUser
                    ? <Typography variant='h6'><NavLink to="/login" className="navlink" onClick={handleLogout}>Logout</NavLink></Typography>
                    : <Typography variant='h6'><NavLink className="navlink" to="/login">Login</NavLink></Typography>
                }
                {loggedInUser
                    ? null
                    : <Typography variant='h6'><NavLink className={classes.loginLogoutLinks} to="/newuser">New User Signup</NavLink></Typography>
                }
            </Grid>    
            <Grid item container justify='center'>
                <Paper variant='elevation' elevation={10} className={classes.titlePaper}>
                    <Typography variant='h2' className={classes.title}>Podist</Typography>
                </Paper>
            </Grid>
            <Grid xs={12} item justify='center' container>
                <Breadcrumbs className={classes.breadCrumbs} justify='center'>
                    {loggedInUser
                        ? <Typography variant='h5'><NavLink className={classes.breadCrumbLinks} to="/home"><HomeIcon fontSize='large'></HomeIcon>Home</NavLink></Typography>
                        : null}
                    <Typography variant='h5'><NavLink className={classes.breadCrumbLinks} to="/search"><SearchIcon fontSize='large'></SearchIcon>Search For New Podcasts</NavLink></Typography>
                    {loggedInUser    
                        ?<Typography variant='h5'><NavLink className={classes.breadCrumbLinks} to="/gallery"><DashboardRoundedIcon fontSize='large'></DashboardRoundedIcon>Gallery</NavLink></Typography>
                        :null}
                </Breadcrumbs>
            </Grid>
        </Grid>
    )


}

export default withRouter(NavBar);
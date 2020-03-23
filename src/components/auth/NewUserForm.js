import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LocalAPIManager from '../modules/LocalAPIManager';
import LoginManager from "../modules/LoginManager"



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(18),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(6),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const NewUserForm = (props) => {
    const classes = useStyles();

    const [credentials, setCredentials] = useState({ id: "", email: "", userName: "" })

    const handleFieldChange = (evt) => {
        const stateToChange = { ...credentials };
        stateToChange[evt.target.id] = evt.target.value;
        setCredentials(stateToChange);
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        LoginManager.getUsers().then(arrayOfUsers => {
            const user = arrayOfUsers.find(userObject =>
                userObject.email === credentials.email &&
                userObject.userName === credentials.userName)
            if (user == undefined) {
                LocalAPIManager.postNewUser(credentials).then(resp => {
                    const stateToChange = { ...credentials }
                    stateToChange.id = resp.id
                    props.setAsUser(stateToChange)
                    props.history.push("/search")
                })
            } else { alert("These credentials are already in use. Try logging in.") }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign up
            </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleFieldChange}
                                autoComplete="user name"
                                name="userName"
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleFieldChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={handleSignUp}
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href={`/login`} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default NewUserForm
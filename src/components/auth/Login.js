import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import Textfield from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import LoginManager from "../modules/LoginManager"
import Link from "@material-ui/core/Link"
import { Container, makeStyles } from "@material-ui/core"
import TextField from '@material-ui/core/TextField'


const useStyles = makeStyles({
    root: {

    },
    loginTitle: {
        margin: '10%'
    }
})

const Login = props => {
    const [credentials, setCredentials] = useState({ id: "", email: "", userName: "" })
    const classes = useStyles()



    const handleFieldChange = (evt) => {
        const stateToChange = { ...credentials };
        stateToChange[evt.target.id] = evt.target.value;
        setCredentials(stateToChange);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        LoginManager.getUsers().then(arrayOfUsers => {
            const user = arrayOfUsers.find(userObject =>
                userObject.email === credentials.email &&
                userObject.userName === credentials.userName)
            if (user !== undefined) {
                const stateToChange = { ...credentials }
                stateToChange.id = JSON.stringify(user.id)
                props.setAsUser(stateToChange)
                props.history.push("/home")
            } else {
                alert("Not a valid user. Please register as a new user.")
            }

        })
    }

    return (
        <Container justify='center' component='main' maxWidth='xs'>
            <Grid justify='center' direction='column' container>
                <Grid container justify='center' item xs={12}>
                    <Typography className={classes.loginTitle} variant='h5'>Please Sign in</Typography>
                </Grid>
                <Grid container justify='center' item xs={12}>
                    <TextField
                        onChange={handleFieldChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <Textfield
                        onChange={handleFieldChange}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='userName'
                        label='User Name'
                        name='userName'
                        autoComplete='user name' />
                </Grid>
                <Grid container item xs={12}>
                    <Button fullWidth variant='contained' color='primary' onClick={handleLogin} type="submit">Login</Button>
                </Grid>
            </Grid>
            <Link href={`/newuser`} >
                Need to sign up for a new account?
            </Link>
        </Container>
    );
};

export default Login
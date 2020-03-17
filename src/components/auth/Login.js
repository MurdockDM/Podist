import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import Textfield from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Typography from "@material-ui/core/Typography"
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Grid from "@material-ui/core/Grid"
import LoginManager from "../modules/LoginManager"

const Login = props => {
    const [credentials, setCredentials] = useState({id: "", email: "", userName: ""})

    const handleFieldChange = (evt) => {
        const stateToChange = { ...credentials};
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
                const stateToChange = {...credentials}
                stateToChange.id = user.id
                props.setAsUser(stateToChange)
                props.history.push("/search")
            }else {
                alert("Not a valid user. Please register as a new user.")
            }
            
        })
    }

    return (
        <form>
            <fieldset>
                <h3>Please sign in</h3>
                <div className="formBox">
                    <input onChange={handleFieldChange} type="email" id="email" placeholder="Email address" required="" autoFocus="" />
                    <label htmlFor="inputEmail">Email address</label>

                    <input onChange={handleFieldChange} type="text" id="userName" placeholder="UserName" required="" />
                    <label htmlFor="inputUserName">User Name</label>
                </div>
                <Button onClick={handleLogin} type="submit">Login</Button>
            </fieldset>
        </form>
    );
};

export default Login
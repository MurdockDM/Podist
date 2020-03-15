import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Podist from "./components/Podist"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
    <Router>
        <Podist />
    </Router>
    ,document.getElementById('root'));

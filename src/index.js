import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(
    <Router key={0}>
        <App />
    </Router>,
    document.getElementById("root")
);
registerServiceWorker();
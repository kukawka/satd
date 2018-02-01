import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Stories from "./containers/Stories";
import AppliedRoute from "./components/AppliedRoute";

export default ({ stateProps }) =>
    <Switch>
        {!stateProps.isLoggedIn? [
        <AppliedRoute path="/" exact component={Login} props={stateProps}/>,
                <AppliedRoute path="/login" exact component={Login} props={stateProps}/>
        ]
            :[
                <AppliedRoute path="/" exact component={Home} props={stateProps}/>,
                <AppliedRoute path="/login" exact component={Home} props={stateProps}/>
            ]
        }
        <AppliedRoute path="/stories" exact component={Stories} props={stateProps}/>
    </Switch>;
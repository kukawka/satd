import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Stories from "./containers/Stories";
import AppliedRoute from "./components/AppliedRoute";
import WriteAStory from "./containers/WriteAStory";

export default ({ stateProps }) =>
    <Switch>
        {!stateProps.isLoggedIn? [
        <AppliedRoute key={0} path="/" exact component={Login} props={stateProps}/>,
                <AppliedRoute key={1} path="/login" exact component={Login} props={stateProps}/>
        ]
            :[
                <AppliedRoute key={2} path="/" exact component={Home} props={stateProps}/>,
                <AppliedRoute key={3} path="/login" exact component={Home} props={stateProps}/>
            ]
        }
        <AppliedRoute key={4} path="/stories" exact component={Stories} props={stateProps}/>
        <AppliedRoute key={5} path="/writeastory" exact component={WriteAStory} props={stateProps}/>
    </Switch>;
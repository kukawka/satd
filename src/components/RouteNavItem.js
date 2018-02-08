import React from "react";
import { Route } from "react-router-dom";
import  NavItem  from "./NavItem";

//automatically set active link in the navbar
export default props =>
    <Route
        path={props.href}
        exact
        children={({ match, history }) =>
            <NavItem
                onClick={e => history.push(e.currentTarget.getAttribute("href"))}
                {...props}
                active={match ? true : false }
            >
                {props.children}
            </NavItem>}
    />;
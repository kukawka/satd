import React from "react";
import { Route } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) =>
    <Route key={1} {...rest} story={1} render={props => <C {...props} {...cProps} />} />;
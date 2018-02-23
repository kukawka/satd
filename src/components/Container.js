import React from "react";

export default class Container extends React.Component {
    render() {
        var marginAtTop={
            marginTop: 10
        };
        return (
            <div className="container-fluid" style={marginAtTop}>
                {this.props.children}
            </div>
        )
    }
}
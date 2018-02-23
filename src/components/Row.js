import React from "react";

export default class Row extends React.Component {
    render() {
        var customStyle= {
            flex: 1
        };
        return (
            <div className="row" style={customStyle}>
                {this.props.children}
            </div>
        )
    }
}
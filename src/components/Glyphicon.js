import React from "react";

export default class Glyphicon extends React.Component {
    render() {
        return (
            <span className={"glyphicons glyphicons-" + this.props.glyph}></span>
        )
    }
}

import React from "react";
//import "./Glyphicon.css";

export default class Glyphicon extends React.Component {
    render() {
        //const fileName="../glyphicons/png/glyphicon-" + this.props.glyph;
        return (
            <span><img src={require('../glyphicons/png/glyphicon-'+this.props.glyph+'.png')}/>{this.props.children}</span>
        );
    }
}

import React from "react";
import Button from "./Button";
import Glyphicon from "./Glyphicon";

export default class StoryThumbnail extends React.Component {
    render() {
        return (
            <div className="card">
            <img src={require('../images/checkup.jpg')} alt="..." className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title">{this.props.story.title}</h5>
                <p>{this.props.story.date}</p>
                <p>{this.props.story.patient}</p>
        <p className="card-text">
            <a className="btn btn-outline-primary"><Glyphicon glyph="view"> View</Glyphicon></a>
            <a className="btn btn-outline-success"  href="/writeastory"><Glyphicon glyph="edit"> Edit</Glyphicon></a>
        </p>
    </div>
    </div>
        );
    }
}
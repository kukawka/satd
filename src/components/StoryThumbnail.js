import React from "react";
import Button from "./Button";

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
            <Button bsStyle="outline-primary"> View</Button>
            <Button bsStyle="outline-success"> Add </Button>
        </p>
    </div>
    </div>
        );
    }
}
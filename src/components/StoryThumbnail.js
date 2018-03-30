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
                    <div className="card-text d-flex justify-content-center">
                        <button onClick={this.props.onEdit} data-id={this.props.story.idStory}
                                className="btn btn-outline-success"><Glyphicon glyph="edit"> Edit</Glyphicon></button>
                        <button onClick={this.props.onDuplicate} data-id={this.props.story.idStory}
                                className="btn btn-outline-warning"><Glyphicon glyph="duplicate"> Duplicate</Glyphicon>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
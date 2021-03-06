import React from "react";
import Button from "./Button";
import Glyphicon from "./Glyphicon";

export default class StoryThumbnail extends React.Component {
    render() {
        const imgStyle = {
            maxHeight: 250,
            maxWidth: 330,
            height: "auto",
            width: "auto"
        };
        return (
            <div className="card">
                <div className="card-text d-flex justify-content-center">
                    <img src={require('../images/' + this.props.story.image + '.png')} alt="..."
                         className="card-img-top" style={imgStyle}/>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{this.props.story.title}</h5>
                    <p>{this.props.story.date.substring(0, 10)}</p>
                    <p>{this.props.story.patient}</p>
                    <div className="card-text d-flex justify-content-between">
                        <button onClick={this.props.onDuplicate} data-id={this.props.story.idStory}
                                data-title={this.props.story.title} data-patient={this.props.story.patientID}
                                className="btn btn-outline-info" disabled={false}><Glyphicon glyph="info"> Info</Glyphicon>
                        </button>
                        <button onClick={this.props.onEdit} data-id={this.props.story.idStory}
                                className="btn btn-outline-success"><Glyphicon glyph="edit"> Edit</Glyphicon></button>
                        <button onClick={this.props.onDuplicate} data-id={this.props.story.idStory}
                                data-title={this.props.story.title} data-patient={this.props.story.patientID}
                                className="btn btn-outline-warning"><Glyphicon glyph="duplicate"> Duplicate</Glyphicon>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
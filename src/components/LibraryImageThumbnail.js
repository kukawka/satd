import React from "react";
import Glyphicon from "./Glyphicon";

export default class LibraryImageThumbnail extends React.Component {
    render() {
        var marginRight = {
            marginRight: "3px"
        };

        return (
            <div className="card">
                <img src={require('../images/' + this.props.image.path + '.png')} alt="No image assigned yet."
                     className="card-img-top"/>
                <div className="card-body">
                    <p className="card-title">{this.props.image.title}</p>
                    <div class="d-flex justify-content-center">
                    <button onClick={this.props.onViewClick}
                            className="btn btn-outline-info"
                            role="button" data-id={this.props.id} style={marginRight}>
                        <Glyphicon glyph="view"/></button>
                    <button onClick={this.props.onAddClick}
                            className="btn btn-outline-success"
                            role="button" data-id={this.props.id}>
                        <Glyphicon glyph="add"/></button>
                    </div>
                    </div>
            </div>
        );
    }
}
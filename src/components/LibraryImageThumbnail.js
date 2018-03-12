import React from "react";
import Glyphicon from "./Glyphicon";

export default class LibraryImageThumbnail extends React.Component {
    render() {
        var marginRight = {
            marginRight: "3px"
        };

        var imageStyle = {
            maxHeight: "90px",
            width: "auto"
        };
        return (
            <div className="card">
                <img src={require('../images/' + this.props.image.path + '.jpg')} alt="No image assigned yet."
                     className="card-img-top" style={imageStyle}/>
                <div className="card-body">
                    <button onClick={this.props.onViewClick}
                            className="btn btn-info"
                            role="button" data-id={this.props.image.id} style={marginRight}>
                        <Glyphicon glyph="view"/></button>
                    <button onClick={this.props.onAddClick}
                            className="btn btn-success"
                            role="button" data-id={this.props.image.id}>
                        <Glyphicon glyph="add"/></button>
                </div>
            </div>
        );
    }
}
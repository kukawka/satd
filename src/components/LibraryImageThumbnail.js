import React from "react";
import Glyphicon from "./Glyphicon";

export default class LibraryImageThumbnail extends React.Component {
    render() {
        var paddingRight = {
            marginRight: "2px"
        };

        var marginTop = {
            marginTop: "10px"
        };
        var buttonSize={
            maxWidth: "40px",
            height: "auto"
        };
        return (
            <div className="card" style={marginTop}>
                <div className="card-header">
                    {this.props.image.title}
                </div>
                <div className="card-body">
                    <img src={require('../images/'+this.props.image.path+'.jpg')} alt="No image assigned yet."
                         className="card-img-top"/>
                </div>
                <div className="card-footer">
                    <div class="d-flex justify-content-center">
                        <p>
                            <button className="btn btn-success" role="button" data-id={this.props.image.id}
                                    onClick={this.props.onViewClick} style={paddingRight}>
                                <Glyphicon glyph="view"/></button>
                            <button onClick={this.props.onAddClick}
                                    className="btn btn-danger"
                                    role="button" data-id={this.props.image.id}>
                                <Glyphicon glyph="add"/></button>
                        </p>
                        <div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
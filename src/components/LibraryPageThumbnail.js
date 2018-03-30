import React from "react";
import Glyphicon from "./Glyphicon";

export default class LibraryPageThumbnail extends React.Component {
    render() {
        var image = '../images/' + this.props.page.imageTitle + '.jpg';
        var paddingRight = {
            marginRight: "2px"
        };

        var marginTop = {
            marginTop: "10px"
        };

        var imageStyle = {
            maxHeight: "90px",
            width: "auto"
        };
        return (
            <div className="card">
                    <img src={require('../images/' + this.props.page.imageTitle + '.png')} alt="No image assigned yet."
                         className="card-img-top"/>
                <div className="card-body">
                    {this.props.id}{this.props.page.title}
                    <div class="d-flex justify-content-center">
                            <button className="btn btn-info" role="button" data-id={this.props.id}
                                    onClick={this.props.onViewClick} style={paddingRight}>
                                <Glyphicon glyph="view"/></button>
                            <button onClick={this.props.onAddClick}
                                    className="btn btn-success"
                                    role="button" data-id={this.props.id}>
                                <Glyphicon glyph="add"/></button>
                </div>
            </div>
            </div>
        );
    }
}
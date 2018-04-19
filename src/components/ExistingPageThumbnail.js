import React from "react";
import Glyphicon from "./Glyphicon";

export default class ExistingPageThumbnail extends React.Component {
    render() {
        var image=('../images/' + this.props.page.imageTitle + '.png');
        var paddingRight = {
            marginRight: "3px",
            /*maxWidth:"30px",
            maxHeight:"30px"*/
        };

        var marginTop = {
            marginTop: "10px"
        };

        return (
            <div className="card" style={marginTop}>

                    <img src={require('../images/' + this.props.page.imageTitle + '.png')} alt="No image assigned yet."
                         className="card-img-top"/>
                <div className="card-body">
                <p className="card-title">{this.props.page.title}</p>
                    <div className="card-text d-flex justify-content-center">
                        <button className="btn btn-outline-success" role="button" data-id={this.props.page.id}
                                onClick={this.props.onEditClick} style={paddingRight}>
                            <Glyphicon glyph="pencil"/></button>
                        <button className="btn btn-outline-danger" role="button" data-id={this.props.page.id}
                                onClick={this.props.onDeleteClick} style={paddingRight}>
                            <Glyphicon glyph="bin"/></button>
                    </div>
                </div>
            </div>
        );
    }
}
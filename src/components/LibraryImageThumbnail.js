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
            textAlign: "center",
            alignItems: "center"
        };

        var imageStyle={
            maxHeight:"100px",
            width:"auto"
        };
        return (
            <div className="card" style={marginTop}>
                <div className="card-header">
                    <div class="d-flex justify-content-between">
                    {this.props.image.title}
                    <button onClick={this.props.onAddClick} style={buttonSize}
                            className="btn btn-outline-success"
                            role="button" data-id={this.props.image.id}>
                        <Glyphicon glyph="add"/></button>
                    </div>
                </div>
                <div className="card-body">
                    <img src={require('../images/'+this.props.image.path+'.jpg')} alt="No image assigned yet."
                         className="card-img-top" style={imageStyle}/>
                </div>
            </div>
        );
    }
}
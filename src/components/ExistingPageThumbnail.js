import React from "react";
import Glyphicon from "./Glyphicon";

export default class ExistingPageThumbnail extends React.Component {
    render() {
        var image = '../images/' + this.props.page.imageTitle + '.jpg';
        var paddingRight = {
            marginRight: "3px",
            /*maxWidth:"30px",
            maxHeight:"30px"*/
        };

        var marginTop = {
            marginTop: "10px"
        };

        var smallMarginTop = {
            marginTop: "5px"
        };

        return (
            <div className="card" style={marginTop}>

                    <img src={require('../images/' + this.props.page.imageTitle + '.jpg')} alt="No image assigned yet."
                         className="card-img-top"/>
                <div className="card-body">
                <p className="card-title">{this.props.page.title}</p>
                    <div className="card-text d-flex justify-content-between">
                        <div>
                            <button className="btn btn-secondary" data-id={this.props.page.id}
                                    style={paddingRight} onClick={this.props.onMoveUp}><Glyphicon glyph="arrow-up"/>
                            </button>
                            <button className="btn btn-secondary" data-id={this.props.page.id}
                                    onClick={this.props.onMoveDown}><Glyphicon glyph="arrow-down"/></button>
                        </div>
                        <button className="btn btn-success" role="button" data-id={this.props.page.id}
                                onClick={this.props.onEditClick} style={paddingRight}>
                            <Glyphicon glyph="pencil"/></button>
                    </div>
                </div>
            </div>
        );
    }
}
import React from "react";
import Glyphicon from "./Glyphicon";

export default class ExistingPageThumbnail extends React.Component {
    render() {
        var image = '../images/' + this.props.page.imageTitle + '.jpg';
        var paddingRight = {
            marginRight: "5px",
            /*maxWidth:"30px",
            maxHeight:"30px"*/
        };

        var marginTop = {
            marginTop: "10px"
        };
        return (
            <div className="card" style={marginTop}>
                <div className="card-header">
                    {this.props.page.id}. {this.props.page.title}
                </div>
                <div className="card-body">
                    <img src={require('../images/' + this.props.page.imageTitle + '.jpg')} alt="No image assigned yet."
                         className="card-img-top"/>
                </div>
                <div className="card-footer">
                    <div class="d-flex justify-content-between">
                        <p>
                            <button className="btn btn-success" role="button" data-id={this.props.page.id}
                                    onClick={this.props.onEditClick} style={paddingRight}>
                                <Glyphicon glyph="pencil"/></button>
                            <button onClick={this.props.onDeleteClick}
                                    className="btn btn-danger"
                                    role="button" data-id={this.props.page.id}>
                                <Glyphicon glyph="bin"/></button>
                        </p>
                        <div>
                            <button className="btn btn-outline-primary" data-id={this.props.page.id}
                                    style={paddingRight} onClick={this.props.onMoveUp}><Glyphicon glyph="arrow-up"/>
                            </button>
                            <button className="btn btn-outline-primary" data-id={this.props.page.id}
                                    onClick={this.props.onMoveDown}><Glyphicon glyph="arrow-down"/></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
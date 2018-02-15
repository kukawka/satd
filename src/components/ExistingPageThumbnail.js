import React from "react";
import Glyphicon from "./Glyphicon";

export default class ExistingPageThumbnail extends React.Component {
    render() {
        return (
            <div className="card">
                <img src={require('../images/checkup.jpg')} alt="..." className="card-img-top"/>
                <div className="card-header">
                    <p className="card-title">{this.props.page.title}</p>

                    <p><a href="#" className="btn btn-success" role="button">
                        <Glyphicon glyph="pencil"> Edit</Glyphicon></a>
                        <a href="#"
                           className="btn btn-danger"
                           role="button">
                            <Glyphicon glyph="bin"> Delete</Glyphicon></a></p>
                    </div>
            </div>
        );
    }
}
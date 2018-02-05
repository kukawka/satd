import React from "react";

export default class ExistingPageThumbnail extends React.Component {
    render() {
        return (
            <div className="thumbnail">
                <img src="containers/checkup.jpg" alt="..." className="thumbnail-pic"/>
                <div className="caption">
                    <h5>{this.props.page.title}</h5>
                    <p><a href="#" className="btn btn-success" role="button"> <span
                        className="glyphicon glyphicon-edit pull-left" aria-hidden="true"></span>Edit</a>
                        <a href="#"
                           className="btn btn-danger"
                           role="button"><span
                            className="glyphicon glyphicon-trash pull-left" aria-hidden="true"></span>Delete</a></p>
                </div>
            </div>
        );
    }
}
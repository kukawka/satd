import React from "react";
import Button from "./Button";

export default class PageThumbnail extends React.Component {
    render() {
        return (
            <div className="card">
                <img src="../containers/checkup.jpg" alt="..." className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.page.title}</h5>
                    <p className="card-text">
                        <Button bsStyle="outline-primary"> View</Button>
                        <Button bsStyle="outline-success"> Add </Button>
                    </p>
                </div>
            </div>
        );
    }
}
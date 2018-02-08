import React from "react";

export default class PageThumbnail extends React.Component {
    render() {
        return (
            <li className={this.props.active ? "nav-item active" : "nav-item" }>
                <a href={this.props.href} className="nav-link">{this.props.name}</a>
            </li>
        );
    }
}
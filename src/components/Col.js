import React from "react";

export default class Col extends React.Component {
    render() {
        return (
            <div className={"col-12 col-md-" + this.props.md}>
                {this.props.children}
            </div>
        )
    }
}
import React from "react";

export default class Well extends React.Component {
    render() {
        return (
            <div class="card">
                <div class="card-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
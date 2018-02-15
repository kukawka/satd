import React from "react";

export default class Nav extends React.Component {
    render(){
        return(
            <ul className={this.props.type}>
                {this.props.children}
            </ul>
        )
    }
}
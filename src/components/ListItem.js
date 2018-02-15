import React from "react";

export default class ListItem extends React.Component {
    constructor() {
        super(props);
        this.state = {
            isSelected: this.props.isSelected
        };
    }
}

import React from "react";

export default class DropdownButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false
        };
    }
    showDropdown(e) {
        e.preventDefault();
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    render() {
        const classDropdownMenu = 'dropdown-menu' + (this.state.isToggleOn ? ' show' : '')
        return (
            <div className="btn-group">
                <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => {this.showDropdown(e)}}>
                    {this.props.title}
                </button>
                <div className={classDropdownMenu}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
import React, {Component} from "react";
import "./BigModal.css";
import ReactDOM from 'react-dom'

export default class FullScreenModal extends Component {
    render() {

        const margin = {
            marginRight: 50,
            marginTop: 50
        };

        const position = {
            position: "fixed",
            left:"5%",
            top: "20%",
            bottom: "20%",
            right:"5%",
            zIndex: 1001
        };


        //alert(this.props.open);
        return this.props.open ? (
            <div className="modal-background">
                <div class="d-flex justify-content-end" style={margin}>
                    <button className="btn btn-primary" onClick={this.props.onClose}>CLOSE</button>
                </div>
                <div className="modal-custom" style={position}>

                    {this.props.children}
                </div>
            </div>

        ) : null
    }
}

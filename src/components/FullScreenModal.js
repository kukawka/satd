import React, {Component} from "react";
import "./BigModal.css";
import ReactDOM from 'react-dom'

export default class Modal extends Component {
    render() {

        const margin={
            marginRight:50,
            marginTop:50
        };
        //alert(this.props.open);
        return this.props.open ? (
            <div className="modal-background">
                <div class="d-flex justify-content-end" style={margin}>
                <button className="btn btn-primary" onClick={this.props.onClose}>CLOSE</button>
            </div>
                <div className="modal-custom">

                    <div role="dialog" className="modal-dialog modal-dialog-custom">
                        <div className="modal-content">
                    {this.props.children}
                    </div>
                        </div>
                    </div>
                </div>

        ) : null
    }
}

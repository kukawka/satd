import React, {Component} from "react";
import "./Modal.css";
import ReactDOM from 'react-dom'

export default class Modal extends Component {
    render() {
        const position = {
            position: "fixed",
            top: "5%",
            bottom: "10%",
            left:"20%",
            right:"20%",
            zIndex: 1001
        };

        //alert(this.props.open);
        return this.props.open ? (
            <div className="modal-background">
                <div className="modal-custom" style={position}>
                    <div role="dialog" className="modal-dialog modal-dialog-custom">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span>{this.props.header}</span>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            <div className="modal-footer">
                                {this.props.cancelButton ?
                                    <button className="btn btn-danger"
                                            onClick={() => this.props.onCancel()}
                                            type="button"
                                            aria-label="close"
                                    >
                                        {this.props.cancelButtonText}
                                    </button> : []}
                                <button className="btn btn-primary"
                                        onClick={() => this.props.onConfirm()}
                                        type="button"
                                        aria-label="close"
                                >
                                    {this.props.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        ) : null
    }
}

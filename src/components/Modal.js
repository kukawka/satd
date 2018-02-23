import React, {Component} from "react";
import "./Modal.css";
import ReactDOM from 'react-dom'

export default class Modal extends Component {
    render() {
        //alert(this.props.open);
        return this.props.open ? (
            <div className="modal-background">
               <div className="modal-custom">
                 <div role="dialog" className="modal-dialog modal-dialog-custom">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span>{this.props.header}</span>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                        <button className="btn btn-primary"
                            onClick={() => this.props.onClose()}
                            type="button"
                            aria-label="close"
                        >
                            ADD NOTE
                        </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>

        ) : null
    }
}

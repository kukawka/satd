import React, {Component} from "react";
import Col from "../components/Col";
import Row from "../components/Row";
import Container from "../components/Container";
import "./Toda.css";
import Glyphicon from "../components/Glyphicon";
import Button from "../components/Button";
import Well from "../components/Well";
import Modal from "../components/Modal";
import Portal from "../Portal";

export default class Toda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestTODA: [
                {id: 1, date: '20.12.2017', patientID: 13, versionNo: 5, current: true},
            ],
            actions: [
                {id: 1, name: "Sitting in Dental Chair Upright", value: 2},
                {id: 2, name: "Sitting in Dental Chair Supine", value: 0},
                {id: 3, name: "Toothbrushing in Dental Surgery", value: 1}
            ],
            editingDisabled: true,
            showModal: false,
            showPortal: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    handleShow() {
        this.setState({showModal: true});
    }

    handleHide() {
        this.setState({showModal: false});
    }

    handleChange(e) {
        //alert(e.currentTarget.parentElement.dataset.id);
        //alert(e.currentTarget.dataset.id);

        if (e.currentTarget.dataset.id === 0) {

        }
    }

    toggleEditing() {
        this.setState(
            {editingDisabled: !this.state.editingDisabled});
    }


    isClickedAction(action) {
        return action.id === 1;
    }

    render() {
        var btnCircle = {
            borderRadius: 16,
            width: 30,
            height: 30,
            marginRight: 2,
            marginLeft: 2
        };

        var marginAtTop = {
            marginTop: 10
        };

        var marginRight = {
            marginRight: 10
        };

        var hidden = {
            overflow: "hidden"
        };

        const listOfAll = this.state.actions.map((action) =>
            <li class="list-group-item">
                <div class="d-flex justify-content-between">
                    {action.name}
                    <div data-id={action.id}>
                        <button className={action.value === 2 ? "btn btn-success" : "btn btn-outline-success"}
                                style={btnCircle} type="button" data-id={2} onClick={e => this.handleChange(e)}
                                disabled={this.state.editingDisabled}/>
                        <button className={action.value === 1 ? "btn btn-warning" : "btn btn-outline-warning"}
                                style={btnCircle} type="button" data-id={1} onClick={e => this.handleChange(e)}
                                disabled={this.state.editingDisabled}/>
                        <button className={action.value === 0 ? "btn btn-danger" : "btn btn-outline-danger"}
                                style={btnCircle} type="button" data-id={0} onClick={e => this.handleChange(e)}
                                disabled={this.state.editingDisabled}
                                data-toggle="modal" data-target="#myModal"
                        />
                    </div>
                </div>
            </li>
        );

        const updateButton = (
            <button type="button" class="btn btn-info" onClick={this.toggleEditing}>
                <div class="d-flex justify-content-end">
                    <Glyphicon glyph="edit"> Update values</Glyphicon>
                </div>
            </button>

        );

        const saveButton = (
            <button type="button" class="btn btn-success" onClick={this.toggleEditing}>
                <div class="d-flex justify-content-end">
                    <Glyphicon glyph="save"> Save changes</Glyphicon>
                </div>
            </button>
        );

        return (

            <Container>

                <div className="sidebar">

                    <button
                        className="btn show-portal"
                        onClick={() =>
                            this.setState({
                                showPortal: !this.state.showPortal
                            })}
                    >
                        Show Portal
                    </button>

                    <Portal
                        open={this.state.showPortal}
                        header="My Portal Modal"
                        onClose={() =>
                            this.setState({
                                showPortal: false
                            })}
                    >
                        <h1>Some Portal Content</h1>
                    </Portal>
                </div>
                <Row>
                    <Col xs={12} md={4}>
                        <div className="card">
                            <div className="card-header">
                                Notes
                            </div>
                            <div className="card-body">
                                Notes go here
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={8}>
                        <Well>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary" style={marginRight}>
                                    <div class="d-flex justify-content-end">
                                        <Glyphicon glyph="history"> View History</Glyphicon>
                                    </div>
                                </button>
                                {this.state.editingDisabled && updateButton}
                                {!this.state.editingDisabled && saveButton}
                            </div>
                        </Well>
                        <div className="card" style={marginAtTop}>
                            <div className="card-header">
                                <div class="d-flex justify-content-between">
                                    <h3>Tolerance of Dental Actions</h3>
                                    <h5>{this.state.latestTODA[0].date}</h5>
                                </div>
                            </div>
                            <div className="card-body">
                                <ul class="list-group list-group-flush">
                                    {listOfAll}
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        );
    }
}
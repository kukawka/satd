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
import io from "socket.io-client";

export default class Toda extends Component {
    constructor(props) {
        super(props);
        this.socket = io('localhost:8080');
        this.state = {
            latestTODA:
                {id: 1, date: '20.12.2017', patientID: 13, versionNo: 5, current: true},
            /*notes:[
                {title: "Suspine sitting", text: "They struggle with it because.."},
                {title: "Mirror", text: "Avoiding using the mirror"}
                ],*/
            actions: [
                {id: 1, name: "Sitting in Dental Chair Upright", value: 2},
                {id: 2, name: "Sitting in Dental Chair Supine", value: 0},
                {id: 3, name: "Toothbrushing in Dental Surgery", value: 1}
            ],
            notes:[],
            editingDisabled: true,
            showModal: false,
            showPortal: false,
            noteTitle:'',
            noteText:'',
            noteRequired: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateInput=this.updateInput.bind(this);

        this.sendNote = ev => {
            ev.preventDefault();
            this.socket.emit('ADD_NOTE', {
                title: this.state.noteTitle,
                text: this.state.noteText
            });
            this.setState({message: ''});
        };

        this.socket.on('UPDATE_NOTES', function(data){
            setNotes(data);
        });

        this.socket.on('INITIAL_NOTES', function(data){
            setNotes(data);
        });

        const setNotes = data => {
            //console.log(data);
            this.setState({notes:data});
            //console.log(this.state.notes);
        };

        const addNote = data => {
            //console.log(data);
            this.setState({notes: [...this.state.notes, data]});
            //console.log(this.state.notes);
        };
    }

    handleChange(e) {
        //alert(e.currentTarget.parentElement.dataset.id);
        //alert(e.currentTarget.dataset.id);

        if (e.currentTarget.dataset.id === '0') {
            this.setState({
                showPortal: !this.state.showPortal,
                noteRequired: !this.state.noteRequired
            });
        }

    }

    updateInput(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClose(){
        this.setState({
            showPortal: false
        });
        this.textInput.focus() ;
    }

    toggleEditing() {
        this.setState(
            {editingDisabled: !this.state.editingDisabled});
    }

    render() {
        var btnCircle = {
            borderRadius: 16,
            width: 30,
            height: 30,
            marginRight: 2,
            marginLeft: 2
        };

        var notesContainer = {
            height: 700,
            overflow: "scroll"
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

        const notesForm = (
            <form>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1"
                           onChange={this.updateInput} value={this.state.noteTitle} name="noteTitle" placeholder="Title of the note"/>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Content</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1"
                              rows="3" placeholder="Your note.." name="noteText" onChange={this.updateInput} value={this.state.noteText}
                              ref={(input) => { this.textInput = input; }}/>
                </div>
                <button type="submit" onClick={this.sendNote} className="btn btn-success">Add</button>
            </form>
        );

        const existingNotes = this.state.notes.map((note) =>
            <div className="card" style={marginAtTop}>
                <div className="card-header">
                    {note.title}
                </div>
                <div className="card-body">
                    <p className="card-text">{note.text}</p>
                </div>
            </div>
        );

        return (

            <Container>
                <Portal
                    open={this.state.showPortal}
                    header="A note required"
                    onConfirm={this.handleClose}
                    buttonText="ADD NOTE"
                    cancelButtonText=""
                    cancelButton={false}
                >
                    <p>Please add a note to explain the low tolerance. </p>
                </Portal>
                <Row>
                    <Col xs={12} md={4}>
                        <div className="card">
                            <div className="card-header">
                                Notes
                            </div>
                            <div className="card-body" style={notesContainer}>
                                {notesForm}
                                <hr/>
                                {existingNotes}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={8}>
                        <Well>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary" style={marginRight} disabled={true}>
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
                                    <h5>{this.state.latestTODA.date}</h5>
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
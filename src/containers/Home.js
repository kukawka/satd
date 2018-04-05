import React, {Component} from "react";
import Col from "../components/Col";
import Row from "../components/Row";
import Container from "../components/Container";
import "./Home.css";
import Glyphicon from "../components/Glyphicon";
import Button from "../components/Button";
import {Redirect} from 'react-router';
import Portal from '../Portal';
import io from "socket.io-client";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectedToEditor: false,
            newTitle: '',
            newPatient: '',
            showNewPortal: false,
            todos:[],
            todochosen: 0
        };
        //title: this.props.title
        this.redirectToAStory = this.redirectToAStory.bind(this);
        this.createAStory = this.createAStory.bind(this);
        this.openCreateStoryPortal = this.openCreateStoryPortal.bind(this);
        this.handleClosePortal = this.handleClosePortal.bind(this);
        this.updateInput = this.updateInput.bind(this);
        //this.proceed = this.proceed.bind(this);
        this.socket = io('localhost:8080');
    };

    componentDidMount() {
        this.socket.emit('GET_TODOS');

        this.socket.on('INITIAL_TODOS', function (data) {
            this.setState({
                todos: data
            });
        }.bind(this));
    }

    handleClosePortal(){
        this.setState({
            showNewPortal: false,
            newTitle:'',
            newPatient:''
        });
    }

    openCreateStoryPortal(e){
        this.setState({
            showNewPortal: true,
            todochosen: e.currentTarget.dataset.id,
            newPatient: e.currentTarget.dataset.patient,
            newTitle: e.currentTarget.dataset.proc
        });
    }

    createAStory(){
        this.socket.emit('NEW_STORY', {
            patient: this.state.newPatient,
            title: this.state.newTitle
        });

        this.socket.on('STORY_CREATED', function (data)
        {
            alert(data);
            this.setState({
                redirectedToEditor: true,
                newTitle:'',
                newPatient:''
            });

            this.socket.emit('COMPLETE_TODO', {
                id: this.state.todochosen
            });
        }.bind(this));
    }

    redirectToAStory(){

    }

    updateInput(e) {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    render() {
        if (this.state.redirectedToEditor) {
            return <Redirect to='/writeastory'/>;
        }

        var alignLeft = {
            alignSelf: "flex-end"
        };

        const todos = this.state.todos
            .sort((a, b) => a.deadline - b.deadline)
            .map((todo) =>
                <a href="#"
                   class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{todo.action}</h5>
                        <small>{(todo.deadline).substring(0, 10)}</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">{todo.procedure} for {todo.patient}</p>
                        <div>
                            <button className="btn btn-outline-success" data-patient={todo.patient} data-proc={todo.procedure} data-id={todo.idtodo} onClick={this.openCreateStoryPortal}>
                                Write from Scratch
                            </button>
                            <button disabled={true} className="btn btn-outline-primary" href="/stories">
                                Browse the Library
                            </button>
                        </div>
                    </div>
                </a>
            );

        return (
            <div className="container">
                <Portal
                    open={this.state.showNewPortal}
                    header="Duplicate A Story"
                    onConfirm={this.createAStory}
                    onCancel={this.handleClosePortal}
                    buttonText="CREATE"
                    cancelButtonText="CANCEL"
                    cancelButton={true}
                >
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Story Title</label>
                            <input type="text" class="form-control" onChange={this.updateInput} value={this.state.newTitle} name="newTitle"
                                   aria-describedby="emailHelp" placeholder="Enter title"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Patient</label>
                            <input type="text" class="form-control" onChange={this.updateInput} value={this.state.newPatient} name="newPatient"
                                   placeholder="Enter patient"/>
                        </div>
                    </form>
                </Portal>
                <Row className="show-grid">
                    <Col xs={6} md={1}></Col>
                    <Col xs={6} md={10}>
                        <div class="card">
                            <div class="card-header">
                                To do
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    {todos}
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} md={1}></Col>
                </Row>
            </div>
        );
    }
}
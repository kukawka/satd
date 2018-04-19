import React, {Component} from "react";
import StoryThumbnail from "../components/StoryThumbnail.js";
import Col from "../components/Col";
import Row from "../components/Row";
import Well from "../components/Well";
import Glyphicon from "../components/Glyphicon";
import Button from "../components/Button";
import DropdownButton from "../components/DropdownButton";
import Container from "../components/Container";
import "./Stories.css";
import {Redirect} from 'react-router';
import Portal from '../Portal';
import io from "socket.io-client";

export default class StoryLibrary extends Component {
    constructor(props) {
        super(props);
        //remember to connect this to back-end:
        this.state = {
            stories: [],
            patients: [],
            initialStoriesSet: [],
            /* initialStoriesSet: [
                 {id: 1, title: 'Annual check-up', date: '14.03.2018', patient: 'Tommy White'}
             ],*/
            searchedPhrase: '',
            redirected: false,
            toDuplicate: 0,
            duplicateTitle: '',
            duplicatePatient: 0,
            newTitle: '',
            newPatient: 1,
            showDuplicatePortal: false,
            showNewStoryPortal: false
            //title: this.props.title
        };

        //bind methods for the searchbox
        this.handleChange = this.handleChange.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.redirectToAStory = this.redirectToAStory.bind(this);
        this.duplicateAStory = this.duplicateAStory.bind(this);
        this.confirmDuplicate = this.confirmDuplicate.bind(this);
        this.handleClosePortal = this.handleClosePortal.bind(this);
        this.refreshLib = this.refreshLib.bind(this);
        this.addNewStory = this.addNewStory.bind(this);
        this.createAStory = this.createAStory.bind(this);
        this.socket = io('localhost:8080');
    }

    componentDidMount() {
        this.socket.emit('GET_ALL_STORIES');

        this.socket.on('INITIAL_STORIES', function (data) {
            this.setState({
                stories: data,
                initialStoriesSet: data
            });
        }.bind(this));

        this.socket.emit('GET_PATIENTS');

        this.socket.on('ALL_PATIENTS', function (data) {
            this.setState({
                patients: data
            });
        }.bind(this));
    }

    getInitialState() {
        return this.state.initialStoriesSet;
    }

    redirectToAStory(e) {
        this.socket.emit('SET_STORY', {
            id: e.currentTarget.dataset.id
        });
        this.setState({
            redirected: true
        });
    }

    addNewStory() {
        this.setState({
            showNewStoryPortal: true
        });
    }

    duplicateAStory() {
        var list=this.state.patients;
        var temp=list[this.state.duplicatePatient-1].firstname+" "+list[this.state.duplicatePatient-1].lastname;
        this.socket.emit('DUPLICATE_STORY', {
            id: this.state.toDuplicate,
            patient: temp,
            title: this.state.duplicateTitle
        });

        //wait until the server responds!!!
        this.socket.on('STORY_DUPLICATED', function () {
            this.refreshLib();
        }.bind(this));

        this.setState({
            showDuplicatePortal: false,
            toDuplicate: 0,
            duplicatePatient: 0,
            duplicateTitle: ''
        });
    }

    refreshLib() {
        this.socket.emit('GET_ALL_STORIES');

        this.socket.on('INITIAL_STORIES', function (data) {
            //alert(data.length); --debugging
            this.setState({
                stories: data,
                initialStoriesSet: data
            });
        }.bind(this));
    }

    handleClosePortal() {
        this.setState({
            showDuplicatePortal: false,
            toDuplicate: 0,
            showNewStoryPortal: false,
            newTitle: '',
            newPatient: 0
        });
    }

    confirmDuplicate(e) {
        //alert(e.currentTarget.dataset.patient);
        this.setState({
            showDuplicatePortal: true,
            toDuplicate: e.currentTarget.dataset.id,
            duplicatePatient: e.currentTarget.dataset.patient,
            duplicateTitle: e.currentTarget.dataset.title
        });
    }

    updateInput(e) {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }


    handleChange(event) {
        var updatedList = this.getInitialState();
        this.setState({
            searchedPhrase: event.target.value
        });
        //alert(Object.keys(this.state.stories)) ;
        updatedList = updatedList.filter(function (item) {
            return item.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1 ||
                item.patient.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
        });

        this.setState({stories: updatedList});
    }

    handleClick() {
        this.setState({
            searchedPhrase: ''
        });
        this.setState(
            {stories: this.state.initialStoriesSet});
    }

    createAStory(){
        var list=this.state.patients;
        var temp=list[this.state.newPatient-1].firstname+" "+list[this.state.newPatient-1].lastname;
        this.socket.emit('NEW_STORY', {
            patient: temp,
            title: this.state.newTitle
        });

        this.socket.on('STORY_CREATED', function (data)
        {
            //alert(data);
            this.setState({
                showNewStoryPortal:false,
                redirected:true,
                newTitle:'',
                newPatient:1,
            });

            this.refreshLib();

        }.bind(this));
    }


    render() {

        //render all stories
        const listOfAll = this.state.stories.map((story) =>
            <Col key={story.id} xs={12} md={4}>
                <StoryThumbnail story={story} onEdit={this.redirectToAStory} onDuplicate={this.confirmDuplicate}/>
            </Col>
        );

        const patientsList = this.state.patients.map((patient) =>
            <option value={patient.idpatient}>{patient.firstname} {patient.lastname}</option>
        );

        if (this.state.redirected) {
            return <Redirect to='/writeastory'/>;
        }

        return (
            <Container>
                <Portal
                    open={this.state.showNewStoryPortal}
                    header="Add A Story"
                    onConfirm={this.createAStory}
                    onCancel={this.handleClosePortal}
                    buttonText="CREATE"
                    cancelButtonText="CANCEL"
                    cancelButton={true}
                >
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Story Title</label>
                            <input type="text" class="form-control" onChange={this.updateInput}
                                   value={this.state.newTitle} name="newTitle"
                                   aria-describedby="emailHelp" placeholder="Enter title" minLength={10}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Patient</label>
                            <select class="form-control" id="exampleFormControlSelect1" value={this.state.newPatient}>
                                {patientsList}
                            </select>
                        </div>
                    </form>
                </Portal>
                <Portal
                    open={this.state.showDuplicatePortal}
                    header="Duplicate A Story"
                    onConfirm={this.duplicateAStory}
                    onCancel={this.handleClosePortal}
                    buttonText="DUPLICATE"
                    cancelButtonText="CANCEL"
                    cancelButton={true}
                >
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Story Title</label>
                            <input type="text" class="form-control" onChange={this.updateInput}
                                   value={this.state.duplicateTitle} name="duplicateTitle"
                                   aria-describedby="emailHelp" placeholder="Enter title"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Patient</label>
                            <select class="form-control" onChange={this.updateInput} name="duplicatePatient" value={parseInt(this.state.duplicatePatient)}>
                                {patientsList}
                            </select>
                        </div>
                    </form>
                </Portal>
                <Well id="toolbar">
                    <Row>
                        <Col xs={12} md={1}>
                            Sort by
                        </Col>
                        <Col xs={12} md={3}>
                            <DropdownButton
                                bsSize="large"
                                title="Date created"
                                id="dropdown-size-large"
                            >
                                <a className="dropdown-item" href="#">Action</a>
                            </DropdownButton>
                        </Col>
                        <Col xs={12} md={1}>
                            Search
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="input-group">
                                <input autoCorrect="off" autoComplete="off" id="searchbox"
                                       value={this.state.searchedPhrase} onChange={this.handleChange} type="text"
                                       className="form-control"
                                       placeholder="Search for..."/>
                                <span className="input-group-btn">
                                    <Button bsStyle="light" onClick={this.handleClick}>Cancel</Button>
                                  </span>
                            </div>
                        </Col>
                        <Col xs={12} md={1}>
                            <button type="button" class="btn btn-outline-success" onClick={this.addNewStory}>Add
                                a Story
                            </button>
                        </Col>
                    </Row>
                </Well>
                <Row>
                    <Col xs={12} md={1}>
                    </Col>
                    <Col xs={12} md={10}>
                        <Row>
                            {listOfAll}
                        </Row>
                    </Col>
                    <Col xs={12} md={1}>
                    </Col>
                </Row>
            </Container>
        );
    }
}
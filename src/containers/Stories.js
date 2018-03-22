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
import io from "socket.io-client";

export default class StoryLibrary extends Component {
    constructor(props) {
        super(props);
        //remember to connect this to back-end:
        this.state = {
            stories: [
            {id: 1, title: 'Annual check-up', date: '14.03.2018', patient: 'Tommy White'}
        ],
            initialStoriesSet: [
                {id: 1, title: 'Annual check-up', date: '14.03.2018', patient: 'Tommy White'}
            ],
            searchedPhrase: '',
            //title: this.props.title
        };

        //bind methods for the searchbox
        this.handleChange = this.handleChange.bind(this);
        this.handleClick= this.handleClick.bind(this);
        //this.socket = io('localhost:8080');
    }

    getInitialState() {
        return this.state.initialStoriesSet;
    }



    handleChange(event) {
        var updatedList = this.getInitialState();
        this.setState({
            searchedPhrase: event.target.value
        });
        //alert(Object.keys(this.state.stories)) ;
        updatedList = updatedList.filter(function(item){
            return item.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1 ||
                item.patient.toLowerCase().search(
                    event.target.value.toLowerCase())!==-1;
        });

        this.setState({stories: updatedList});
    }

    handleClick(){
        //alert('clickeed');
        this.setState({
            searchedPhrase: ''
        });
        this.setState(
            {stories: this.state.initialStoriesSet});
    }


    render() {
        //alert(this.props.title);

        //render all stories
            const listOfAll = this.state.stories.map((story) =>
                        <Col key={story.id} xs={12} md={4}>
                            <StoryThumbnail story={story} />
                        </Col>
                    );

        return (
                <Container>
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
                            <Col xs={12} md={7}>
                                <div className="input-group">
                                    <input autoCorrect="off" autoComplete="off" id="searchbox" value={this.state.searchedPhrase}  onChange={this.handleChange} type="text" className="form-control"
                                           placeholder="Search for..."/>
                                    <span className="input-group-btn">
                                    <Button bsStyle="light" onClick={this.handleClick}>Cancel</Button>
                                  </span>
                                </div>
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
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

export default class StoryLibrary extends Component {
    constructor(props) {
        super(props);
        //remember to connect this to back-end:
        this.state = {
            stories: [
            {id: 1, title: 'Check-up', date: '20.12.2017', patient: 'Susan Smith'},
            {id: 2, title: 'Teeth Whitening', date: '08.10.2017', patient: 'Tom Mitchell'}
        ],
            initialStoriesSet: [
                {id: 1, title: 'Check-up', date: '20.12.2017', patient: 'Susan Smith'},
                {id: 2, title: 'Teeth Whitening', date: '08.10.2017', patient: 'Tom Mitchell'}
            ],
            searchedPhrase: ''
        };

        //bind methods for the searchbox
        this.handleChange = this.handleChange.bind(this);
        this.handleClick= this.handleClick.bind(this);
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

        //render all stories
            const listOfAll = this.state.stories.map((story) =>
                        <Col key={story.id} xs={12} md={4}>
                            <StoryThumbnail story={story} />
                        </Col>
                    );

        return (
                <Container>
                    <Well>
                        <Row className="show-grid">
                            <Col xs={12} md={10}>
                            </Col>
                            <Col xs={12} md={2}>
                                    <Button bsStyle="success" bsSize="large">
                                        <Glyphicon glyph="pencil"> New Story</Glyphicon>
                                    </Button>
                            </Col>
                        </Row>
                    </Well>
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
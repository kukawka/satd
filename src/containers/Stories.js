import React, {Component} from "react";
import {
    Grid,
    Col,
    Row,
    Button,
    ButtonToolbar,
    DropdownButton,
    MenuItem
} from "react-bootstrap";
import StoryThumbnail from "../components/StoryThumbnail.js";
import "./Stories.css";

export default class Stories extends Component {
    constructor(props) {
        super(props);
        //remember to connect this to back-end:
        this.state = {
            stories: [
            {id: 1, title: 'Check-up', date: '20.12.2017', patient: 'Susan Smith'},
            {id: 2, title: 'Teeth Whitening', date: '08.10.2017', patient: 'Tom Mitchell'}
        ]
        };

        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
       /* var updatedList = getTitles();
        updatedList = updatedList.filter(function(item){
            return item.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
        alert(updatedList.toString());*/
    }


    render() {

        //render all stories
            const listOfAll = this.state.stories.map((story) =>
                        <Col xs={12} md={4}>
                            <StoryThumbnail story={story} />
                        </Col>
                    );


        function filterList(event){
            alert("hello");
            var updatedList = listOfAll.title;
            updatedList = updatedList.filter(function(item){
                return item.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });
            this.setState({items: updatedList});
            alert(updatedList.toString());
        }

        function componentWillMount(){
            this.setState({items: this.state.initialItems})
        }


        return (

            <div className="Stories">
                <Grid>
                    <div class="well">
                        <Row className="show-grid">
                            <Col xs={12} md={10}>
                            </Col>
                            <Col xs={12} md={2}>
                                <ButtonToolbar class="pull-right">
                                    <Button bsStyle="success" bsSize="large" block>
                                        <span class="glyphicon glyphicon-pencil pull-left" aria-hidden="true"></span>
                                        New Story
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </div>
                    <div class="well" id="toolbar">
                        <Row>
                            <Col xs={12} md={1}>
                                Sort by
                            </Col>
                            <Col xs={12} md={3}>
                                <ButtonToolbar>
                                    <DropdownButton
                                        bsSize="large"
                                        title="Date created"
                                        id="dropdown-size-large"
                                    >
                                        <MenuItem eventKey="1">Action</MenuItem>
                                    </DropdownButton>
                                </ButtonToolbar>
                            </Col>
                            <Col xs={12} md={1}>
                                Search
                            </Col>
                            <Col xs={12} md={7}>

                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search for..." value={this.state.value} onChange={this.handleChange}/>
                                    <span class="input-group-btn">
                                    <button class="btn btn-default" type="button">Go!</button>
                                  </span>
                                </div>

                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col xs={12} md={1}>
                        </Col>
                        <Col xs={12} md={10}>
                        {listOfAll}
                        </Col>
                        <Col xs={12} md={1}>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
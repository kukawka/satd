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
import "./Stories.css";

export default class Stories extends Component {
    render() {
        //remember to connect this to back-end
        const numbers = ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"];
        const stories = numbers.map((number) =>
            <Col xs={12} md={4}>
                <div class="thumbnail">
                    <div class="caption">
                        <h3>{number}</h3>
                        <p>Created on</p>
                        <p>Patient's name</p>
                        <p><a href="#" class="btn btn-primary" role="button"><span
                            class="glyphicon glyphicon-edit pull-left"
                            aria-hidden="true"></span>Edit</a> <a href="#" class="btn btn-default"
                                                                  role="button"><span
                            class="glyphicon glyphicon-play pull-left" aria-hidden="true"></span>Preview</a>
                        </p>
                    </div>
                </div>
            </Col>
    );

        function filterList(event){
            var updatedList = this.state.initialItems;
            updatedList = updatedList.filter(function(item){
                return item.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });
            this.setState({items: updatedList});
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
                                    <input type="text" class="form-control" placeholder="Search for..." onChange={this.filterList}/>
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
                            {stories}
                        </Col>
                        <Col xs={12} md={2}>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
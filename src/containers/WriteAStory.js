import React, {Component} from "react";
import {Navbar, NavItem, Nav, Grid, Row, Col, Button, ButtonToolbar, Tooltip, OverlayTrigger, Panel, Image, Pagination, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import PageThumbnail from "../components/PageThumbnail.js";
import ExistingPageThumbnail from "../components/ExistingPageThumbnail.js";
import "./WriteAStory.css";

export default class StoryEditor extends Component {
    constructor(props) {
        super(props);
        //remember to connect this to back-end:
        this.state = {
            pages: [
                {id: 1, title: 'Come to reception', text: '', imageID: 0, isWorrying: false},
                {id: 2, title: 'Wait in reception', text: '', imageID: 0, isWorrying: false},
                {id: 3, title: 'Sit in the chair', text: '', imageID: 0, isWorrying: false},
                {id: 4, title: 'Put your hand up to rest', text: '', imageID: 0, isWorrying: false},
                {id: 5, title: 'Go back to reception', text: '', imageID: 0, isWorrying: false}
            ],
            leftPanel:1,
            rightPanel:3
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedKey) {
        if(selectedKey==1 || (selectedKey==2)){
            this.setState({
                leftPanel: selectedKey
            });
        }
        else{
            this.setState({
                rightPanel: selectedKey
            });
        }
    }

    render() {

        var imgStyle = {
            minWidth: "128px",
        };

        const tooltip = (
            <Tooltip id="tooltip">
                <strong>Tolerance Of Dental Actions</strong>
            </Tooltip>
        );


        const leftNav = (
            <Nav bsStyle="tabs" activeKey={this.state.leftPanel} onSelect={k => this.handleSelect(k)}>
                <NavItem eventKey={1}>
                    This Story
                </NavItem>
                <NavItem eventKey={2} title="Item">
                   Libraries
                </NavItem>
            </Nav>
        );

        const rightNav = (
            <Nav bsStyle="tabs" activeKey={this.state.rightPanel} onSelect={k => this.handleSelect(k)}>
                <NavItem eventKey={3}>
                    Import
                </NavItem>
                <NavItem eventKey={4} title="Item">
                    Libraries
                </NavItem>
            </Nav>
        );

            const existingPages = this.state.pages.map((page) =>
                    <ExistingPageThumbnail key={page.id} page={page}/>
            );

        let active = 7;
        let items = [];
        for (let number = 1; number <= 10; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>{number}</Pagination.Item>
            );
        }

        const storyPagination = (
            <div>
                <Pagination bsSize="small">
                    <Pagination.Prev />
                    {items}
                    <Pagination.Next />
                </Pagination>
            </div>
        );

        function FieldGroup({ id, label, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} />
                </FormGroup>
            );
        }

        return (
            /*<Navbar inverse>
            <Nav pullLeft>
            </Nav>
            <Nav>
                <NavItem id="centeredItem"><span className="glyphicon glyphicon-play pull-left" aria-hidden="true"></span>Preview</NavItem>
            </Nav>
            </Navbar>*/

            <div className="WriteAStory">
                <Grid>
                    <div className="well">
                        <Row className="show-grid">
                            <Col xs={12} md={10}>
                            </Col>
                            <Col xs={12} md={2}>
                                <ButtonToolbar>
                                    <OverlayTrigger placement="bottom" overlay={tooltip}>
                                    <Button block href="#" bsStyle="info" bsSize="large"><span className="glyphicon glyphicon-tasks pull-left" aria-hidden="true"></span>View TODA</Button>
                                    </OverlayTrigger>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col xs={12} md={3}>
                            <Panel>
                                <Panel.Heading>Pages</Panel.Heading>
                                <Panel.Body key={0} className="fixed-panel">{leftNav}
                                    {this.state.leftPanel==1 && existingPages}
                                </Panel.Body>
                                <Panel.Footer></Panel.Footer>
                            </Panel>
                        </Col>
                        <Col xs={12} md={6}>
                            <Panel bsStyle="primary">
                                <Panel.Heading>Page Editor</Panel.Heading>
                                <Panel.Body key={1}>
                                        <img src="checkup.jpg" alt="No pic.." className="thumbnail-pic"/>
                                    <form>
                                        <FieldGroup
                                            id="formControlsText"
                                            type="text"
                                            label="Title"
                                            placeholder="Page title.."
                                        />
                                    <FormGroup controlId="formControlsTextarea">
                                        <ControlLabel>Text</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="Text for the page.." maxLength="100"/>
                                    </FormGroup>
                                    </form>
                                </Panel.Body>
                                <Panel.Footer>{storyPagination}</Panel.Footer>
                            </Panel>
                        </Col>
                        <Col xs={12} md={3}>
                            <Panel>
                                <Panel.Heading>Images</Panel.Heading>
                                <Panel.Body>{rightNav}</Panel.Body>
                                <Panel.Footer>Panel footer</Panel.Footer>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
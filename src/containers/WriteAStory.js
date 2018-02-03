import React, {Component} from "react";
import {Navbar, NavItem, Nav, Grid, Row, Col, Button, ButtonToolbar, Tooltip, OverlayTrigger, Panel, Image, Pagination, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./WriteAStory.css";

export default class WriteAStory extends Component {
    render() {
        const pages = [
            {id: 1, title: 'Come to reception', text: '', imageID: 0, isWorrying: false},
            {id: 2, title: 'Wait in reception', text: '', imageID: 0, isWorrying: false},
            {id: 3, title: 'Sit in the chair', text: '', imageID: 0, isWorrying: false},
            {id: 4, title: 'Put your hand up to rest', text: '', imageID: 0, isWorrying: false},
            {id: 5, title: 'Go back to reception', text: '', imageID: 0, isWorrying: false}
        ];

        var imgStyle = {
            minWidth: "128px",
        };

        const tooltip = (
            <Tooltip id="tooltip">
                <strong>Tolerance Of Dental Actions</strong>
            </Tooltip>
        );

        function handleSelect(selectedKey) {
            //alert(`selected ${selectedKey}`);
        }

        const leftNav = (
            <Nav bsStyle="tabs" activeKey={1} onSelect={handleSelect}>
                <NavItem eventKey={1} href="/home">
                    This Story
                </NavItem>
                <NavItem eventKey={2} title="Item">
                   Libraries
                </NavItem>
            </Nav>
        );

        const rightNav = (
            <Nav bsStyle="tabs" activeKey={1} onSelect={handleSelect}>
                <NavItem eventKey={1} href="/home">
                    Import
                </NavItem>
                <NavItem eventKey={2} title="Item">
                    Libraries
                </NavItem>
            </Nav>
        );

        const existingPages = pages.map((page) =>
            <div class="thumbnail">
                <img src="checkup.jpg" alt="..." class="thumbnail-pic"/>
                <div class="caption">
                    <h5>{page.title}</h5>
                    <p><a href="#" class="btn btn-info" role="button"> <span class="glyphicon glyphicon-zoom-in pull-left" aria-hidden="true"></span>View</a> <a href="#" class="btn btn-success" role="button"><span class="glyphicon glyphicon-plus pull-left" aria-hidden="true"></span>Add</a></p>
                </div>
            </div>
        );

        let active = 7;
        let items = [];
        for (let number = 1; number <= 10; number++) {
            items.push(
                <Pagination.Item active={number === active}>{number}</Pagination.Item>
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
                <NavItem id="centeredItem"><span class="glyphicon glyphicon-play pull-left" aria-hidden="true"></span>Preview</NavItem>
            </Nav>
            </Navbar>*/

            <div className="WriteAStory">
                <Grid>
                    <div class="well">
                        <Row className="show-grid">
                            <Col xs={12} md={10}>
                            </Col>
                            <Col xs={12} md={2}>
                                <ButtonToolbar>
                                    <OverlayTrigger placement="bottom" overlay={tooltip}>
                                    <Button block href="#" bsStyle="info" bsSize="large"><span class="glyphicon glyphicon-tasks pull-left" aria-hidden="true"></span>View TODA</Button>
                                    </OverlayTrigger>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col xs={12} md={3}>
                            <Panel>
                                <Panel.Heading>Pages</Panel.Heading>
                                <Panel.Body class="fixed-panel">{leftNav}
                                    {existingPages}
                                </Panel.Body>
                                <Panel.Footer></Panel.Footer>
                            </Panel>
                        </Col>
                        <Col xs={12} md={6}>
                            <Panel bsStyle="primary">
                                <Panel.Heading>Page Editor</Panel.Heading>
                                <Panel.Body>
                                        <img src="checkup.jpg" alt="No pic.." class="thumbnail-pic"/>
                                    <form>
                                        <FieldGroup
                                            id="formControlsText"
                                            type="text"
                                            label="Title"
                                            placeholder="Page title.."
                                        />
                                    <FormGroup controlId="formControlsTextarea">
                                        <ControlLabel>Text</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="Text for the page.." maxlength="100"/>
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
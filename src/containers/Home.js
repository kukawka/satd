import React, { Component } from "react";
import {ListGroup, ListGroupItem, Grid, Col, Row, Panel} from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={3}>
                        <h2>Menu</h2>
                        <ListGroup>
                            <ListGroupItem href="#" active>
                                Home
                                <span className="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span>
                            </ListGroupItem>
                            <ListGroupItem href="/appointments">Appointments
                                <span className="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span>
                            </ListGroupItem>
                            <ListGroupItem href="/patients">Patients
                                <span className="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span>
                            </ListGroupItem>
                            <ListGroupItem href="/stories">Stories
                                <span className="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col xs={6} md={9}>
                        <Panel bsStyle="primary" className="todo">
                            <Panel.Heading>
                                <Panel.Title>To do</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                Monday, 22nd January
                                <ListGroup>
                                    <ListGroupItem>
                                        <strong>Teeth Cleaning</strong> for Susan Smith
                                        <span className="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span>
                                    </ListGroupItem>
                                    <ListGroupItem>Some body text</ListGroupItem>
                                </ListGroup>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
            </div>
        );
    }
}
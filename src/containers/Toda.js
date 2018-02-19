import React, { Component } from "react";
import Col from "../components/Col";
import Row from "../components/Row";
import Container from "../components/Container";
import "./Toda.css";
import Glyphicon from "../components/Glyphicon";
import Button from "../components/Button";
import Well from "../components/Well";

export default class Toda extends Component {
    render() {
        var btnCircle={
            borderRadius: 16,
            width:30,
            height: 30
        };



        return (
            <Container>
                <Row>
                    <Col xs={12} md={3}>
                        <div className="card">
                            <div className="card-header">
                                Notes
                            </div>
                            <div className="card-body">
                                Notes go here
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={9}>
                        <Well>
                            Buttons
                        </Well>
                        <Row>
                        <Col xs={12} md={6}>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Cras justo odio
                                    <button className="btn btn-success" style={btnCircle} type="button"/>
                                    <button className="btn btn-outline-warning" style={btnCircle} type="button"/>
                                    <button className="btn btn-outline-danger" style={btnCircle} type="button"/>
                                </li>
                                <li class="list-group-item">Dapibus ac facilisis in</li>
                                <li class="list-group-item">Morbi leo risus</li>
                                <li class="list-group-item">Porta ac consectetur ac</li>
                                <li class="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </Col>
                        <Col xs={12} md={6}>
                            b
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

        );
    }
}
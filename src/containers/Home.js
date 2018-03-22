import React, { Component } from "react";
import Col from "../components/Col";
import Row from "../components/Row";
import Container from "../components/Container";
import "./Home.css";
import Glyphicon from "../components/Glyphicon";
import Button from "../components/Button";

export default class Home extends Component {
    render() {
        var alignLeft={
            alignSelf:"flex-end"
        };
        return (
            <div className="container">
                <Row className="show-grid">
                    <Col xs={6} md={1}></Col>
                    <Col xs={6} md={10}>
                        <div class="card">
                            <div class="card-header">
                                To do
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Write a Story</h5>
                                            <small>Monday, 26th March</small>
                                        </div>
                                        <div class="d-flex w-100 justify-content-between">
                                        <p class="mb-1">Tooth Drilling for Susan Smith</p>
                                            <a className="btn btn-outline-success" href="/newstory">
                                                Write now
                                            </a>
                                        </div>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Write a Story</h5>
                                            <small>Thursday, 29th March</small>
                                        </div>
                                        <div class="d-flex w-100 justify-content-between">
                                            <p class="mb-1">Check-up for Tom Brown</p>
                                            <Button bsStyle="outline-success">
                                                Write now
                                            </Button>
                                        </div>
                                    </a>
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
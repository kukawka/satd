import React, {Component} from "react";
import Col from "../components/Col";
import Row from "../components/Row";
import NavItem from "../components/NavItem";
import Well from "../components/Well";
import Button from "../components/Button";
import DropdownButton from "../components/DropdownButton";
import Container from "../components/Container";
import PageThumbnail from "../components/PageThumbnail.js";
import ExistingPageThumbnail from "../components/ExistingPageThumbnail.js";
import "./WriteAStory.css";
import Glyphicon from "../components/Glyphicon";
import Nav from "../components/Nav";

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
            selectedPagesItem: 3,
            selectedParentItem: 1,
            selectedImagesItem: 5
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        if(e.currentTarget.dataset.id == 3 || e.currentTarget.dataset.id == 4) {
            this.setState(
                {selectedPagesItem: e.currentTarget.dataset.id}
            );
        }
        else if(e.currentTarget.dataset.id == 1 || e.currentTarget.dataset.id == 2) {
            this.setState(
                {selectedParentItem: e.currentTarget.dataset.id}
            );
        }
        else if(e.currentTarget.dataset.id == 5 || e.currentTarget.dataset.id == 6) {
            this.setState(
                {selectedImagesItem: e.currentTarget.dataset.id}
            );
        }

    }

    render() {

        //styles
        var imgStyle = {
            minWidth: "128px",
        };

        var scrolling= {
            overflowY: "scroll",
            //height: 500
        };

        var marginAtTop={
            marginTop: 10
        };

        /*const tooltip = (
            <Tooltip id="tooltip">
                <strong>Tolerance Of Dental Actions</strong>
            </Tooltip>
        );*/


        const pagesNav = (
            <Nav type="nav nav-pills">
                <li className="nav-item" onClick={e => this.handleSelect(e)} data-id="3">
                    <a className={this.state.selectedPagesItem == 3 ? "nav-link active" : "nav-link"} id="link1"
                       href="#">
                        This Story
                    </a>
                </li>
                <li class="nav-item" onClick={e => this.handleSelect(e)} data-id="4">
                    <a className={this.state.selectedPagesItem == 4 ? "nav-link active" : "nav-link"} href="#">
                        Libraries
                    </a>
                </li>
            </Nav>
        );

        const parentNav=(
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={e => this.handleSelect(e)} data-id="1">
                    <a className={this.state.selectedParentItem == 1 ? "nav-link active" : "nav-link"} href="#">
                        Pages
                    </a>
                </li>
                <li className="nav-item" onClick={e => this.handleSelect(e)} data-id="2">
                    <a className={this.state.selectedParentItem == 2 ? "nav-link active" : "nav-link"}  href="#">
                        Images
                    </a>
                </li>
            </ul>
        );

        const imagesNav = (
            <ul className="nav nav-pills">
                <li className="nav-item" onClick={e => this.handleSelect(e)} data-id="5">
                    <a className={this.state.selectedImagesItem == 5 ? "nav-link active" : "nav-link"} id="link1"
                       href="#">
                        Import
                    </a>
                </li>
                <li class="nav-item" onClick={e => this.handleSelect(e)} data-id="6">
                    <a className={this.state.selectedImagesItem == 6 ? "nav-link active" : "nav-link"} href="#">
                        Libraries
                    </a>
                </li>
            </ul>
        );

        const existingPages = this.state.pages.map((page) =>
            <ExistingPageThumbnail key={page.id} page={page}/>
        );

        let active = 7;
        let items = [];
        for (let number = 1; number <= 10; number++) {
            items.push(
                <li className="page-item" key={number} active={number === active}><a class="page-link"
                                                                                     href="#">{number}</a></li>
            );
        }

        const storyPagination = (
            <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    {items}
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        );

        var imagesTab = (
            <div className="card-body" style={scrolling}>
                {imagesNav}
            </div>
        );

        var pagesTab = (
            <div id="pagesTab" className="card-body" style={scrolling}>
                {pagesNav}
                {this.state.selectedPagesItem === 3 && existingPages}
            </div>
        );

        return (

            <Container>
                <Well>
                    <Row className="show-grid">
                        <Col xs={12} md={10}>
                        </Col>
                        <Col xs={12} md={2}>
                            <Button block href="#" bsStyle="info" bsSize="large"><Glyphicon glyph="charts"> View
                                TODA</Glyphicon></Button>
                        </Col>
                    </Row>
                </Well>
                <Row>
                    <Col xs={12} md={4}>
                        <div className="card" style={marginAtTop}>
                            <div className="card-header">
                                {parentNav}
                            </div>
                            {this.state.selectedParentItem == 1 && pagesTab}
                            {this.state.selectedParentItem == 2 && imagesTab}
                            <div className="card-footer text-muted">
                                2 days ago
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={8}>
                        <div className="card" style={marginAtTop}>
                            <div className="card-header">Page Editor</div>
                            <div className="card-body" style={scrolling}>
                                <img src={require('../images/checkup.jpg')} alt="No pic.." className="card-img-top"/>
                                <form>
                                    <div className="form-group">
                                        <label>Text</label>
                                        <textarea className="form-control" placeholder="Text for the page.."
                                                  maxLength="100"/>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-muted">
                                {storyPagination}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
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
import LibraryPageThumbnail from "../components/LibraryPageThumbnail";

export default class StoryEditor extends Component {
    constructor(props) {
        super(props);
        //remember to connect this to back-end:
        this.state = {
            pages: [
                {
                    id: 1,
                    title: 'Come to reception',
                    text: 'You will come to the reception.',
                    imageTitle: 'entrance',
                    isWorrying: false
                },
                {id: 2, title: 'Wait in reception', text: '', imageTitle: 'reception', isWorrying: false},
                {id: 3, title: 'Sit in the chair', text: '', imageTitle: 'chair', isWorrying: false},
                {id: 4, title: 'Put your hand up to rest', text: '', imageTitle: 'hand', isWorrying: false},
                {id: 5, title: 'Go back to reception', text: '', imageTitle: 'reception', isWorrying: false}
            ],
            libraryOfPages: [
                {
                    id: 1,
                    title: 'Tooth drilling',
                    text: 'You will come to the reception.',
                    imageTitle: 'drilling',
                    isWorrying: false
                },
                {id: 2, title: 'Teeth cleaning', text: '', imageTitle: 'cleaning', isWorrying: false},
                {id: 3, title: 'Examination', text: '', imageTitle: 'checkup', isWorrying: false},
                {id: 4, title: 'Dental extraction', text: '', imageTitle: 'pulling', isWorrying: false},
                {id: 5, title: 'Teeth Whitening', text: '', imageTitle: 'whitening', isWorrying: false}
            ],
            initialLibraryOfPages: [
                {
                    id: 1,
                    title: 'Tooth drilling',
                    text: 'You will come to the reception.',
                    imageTitle: 'drilling',
                    isWorrying: false
                },
                {id: 2, title: 'Teeth cleaning', text: '', imageTitle: 'cleaning', isWorrying: false},
                {id: 3, title: 'Examination', text: '', imageTitle: 'checkup', isWorrying: false},
                {id: 4, title: 'Dental extraction', text: '', imageTitle: 'pulling', isWorrying: false},
                {id: 5, title: 'Teeth Whitening', text: '', imageTitle: 'whitening', isWorrying: false}
            ],
            currentPage:
                {
                    id: 1,
                    title: 'Come to reception',
                    text: 'You will come to the reception.',
                    imageTitle: 'entrance',
                    isWorrying: false
                },
            inspectedPage: null,
            searchedPage: '',
            selectedPagesItem: 3,
            selectedParentItem: 1,
            selectedImagesItem: 5
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.updateTextValue = this.updateTextValue.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.addNewPage = this.addNewPage.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addTemplatePage = this.addTemplatePage.bind(this);
        this.inspectPage = this.inspectPage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    getInitialState() {
        return this.state.initialLibraryOfPages;
    }


    handleSearch(event) {
        var updatedList = this.getInitialState();
        this.setState({
            searchedPage: event.target.value
        });
        //alert(Object.keys(this.state.stories)) ;
        updatedList = updatedList.filter(function (item) {
            return item.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1 ||
                item.imageTitle.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
        });

        this.setState({libraryOfPages: updatedList});
    }

    handleClear() {
        this.setState({
            searchedPage: ''
        });
        this.setState(
            {libraryOfPages: this.state.initialLibraryOfPages});
    }

    handleEdit(e) {
        //alert(e.currentTarget.dataset.id);
        var currentPage = e.currentTarget.dataset.id - 1;
        //alert(currentPage);
        this.setState({
            currentPage: this.state.pages[currentPage]
        });
    }

    handleDelete(e) {
        var reducedSet = this.state.pages;
        reducedSet.splice(e.currentTarget.dataset.id - 1, 1);
        //alert(e.currentTarget.dataset.id);

        // if the page is not the last on the list
        if (e.currentTarget.dataset.id <= reducedSet.length) {
            for (var i = (e.currentTarget.dataset.id - 1); i < reducedSet.length; i++) {
                reducedSet[i].id -= 1;
            }
        }
        this.setState({
            pages: reducedSet
        });
    }

    moveUp(e) {
        if (e.currentTarget.dataset.id > 1) {
            var pageToMoveUp = this.state.pages[e.currentTarget.dataset.id - 1];
            pageToMoveUp.id = pageToMoveUp.id - 1;
            var pageToMoveDown = this.state.pages[e.currentTarget.dataset.id - 2];
            pageToMoveDown.id = pageToMoveDown.id + 1;
            var newOrder = this.state.pages;
            newOrder[e.currentTarget.dataset.id - 1] = pageToMoveDown;
            newOrder[e.currentTarget.dataset.id - 2] = pageToMoveUp;
            this.setState({
                pages: newOrder
            });
        }
        else {
            alert('You are first already!')
        }
    }

    moveDown(e) {
        if (e.currentTarget.dataset.id < this.state.pages.length) {
            var pageToMoveDown = this.state.pages[e.currentTarget.dataset.id - 1];
            pageToMoveDown.id = pageToMoveDown.id + 1;
            var pageToMoveUp = this.state.pages[e.currentTarget.dataset.id];
            pageToMoveUp.id = pageToMoveUp.id - 1;

            var newOrder = this.state.pages;
            newOrder[e.currentTarget.dataset.id - 1] = pageToMoveUp;
            newOrder[e.currentTarget.dataset.id] = pageToMoveDown;
            this.setState({
                pages: newOrder
            });
        }
        else {
            alert('You are last already!')
        }
    }

    addNewPage() {
        var blankPage = {
            id: (this.state.pages.length + 1),
            title: 'New Page',
            text: '',
            imageTitle: 'placeholder',
            isWorrying: false
        };
        this.setState({
            currentPage: blankPage
        });
        this.state.pages.push(blankPage);
    }

    addTemplatePage(e) {
        alert('add a page');
        var pageToAdd = this.state.libraryOfPages[e.currentTarget.dataset.id - 1];
        pageToAdd.id = this.state.pages.length + 1;
        this.setState({
            currentPage: pageToAdd
        });
        this.state.pages.push(pageToAdd);
        this.setState(
            {selectedPagesItem: 3}
        );
    }

    inspectPage(e) {
        //alert(e.currentTarget.dataset.id);
        var pageToInspect = e.currentTarget.dataset.id - 1;
        //alert(currentPage);
        this.setState({
            inspectedPage: this.state.libraryOfPages[pageToInspect]
        });
    }

    handleSelect(e) {
        if (e.currentTarget.dataset.id == 3 || e.currentTarget.dataset.id == 4) {
            this.setState(
                {
                    selectedPagesItem: e.currentTarget.dataset.id,
                    inspectedPage: null
                }
            );
        }
        else if (e.currentTarget.dataset.id == 1 || e.currentTarget.dataset.id == 2) {
            this.setState(
                {selectedParentItem: e.currentTarget.dataset.id}
            );
        }
        else if (e.currentTarget.dataset.id == 5 || e.currentTarget.dataset.id == 6) {
            this.setState(
                {selectedImagesItem: e.currentTarget.dataset.id}
            );
        }

    }

    updateTextValue(evt) {
        this.setState({
            currentPage: {
                text: evt.target.value
            }
        });
    }

    render() {
        var charactersLeft = 100 - this.state.currentPage.text.length;

        //styles
        var imgStyle = {
            minHeight: "300px",
            maxHeight: "330px",
            width: "auto"
        };

        var alignCenter = {
            textAlign: "center",
            alignItems: "center"
        };

        var scrolling = {
            overflowY: "scroll",
            height: 650
        };

        var marginAtTop = {
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

        const parentNav = (
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={e => this.handleSelect(e)} data-id="1">
                    <a className={this.state.selectedParentItem == 1 ? "nav-link active" : "nav-link"} href="#">
                        Pages
                    </a>
                </li>
                <li className="nav-item" onClick={e => this.handleSelect(e)} data-id="2">
                    <a className={this.state.selectedParentItem == 2 ? "nav-link active" : "nav-link"} href="#">
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
            <ExistingPageThumbnail key={page.id} page={page}
                                   onEditClick={this.handleEdit} onDeleteClick={this.handleDelete}
                                   onMoveUp={this.moveUp} onMoveDown={this.moveDown}/>
        );

        const libraryPages = this.state.libraryOfPages.map((page) =>
            <LibraryPageThumbnail key={page.id} page={page}
                                  onAddClick={this.addTemplatePage} onViewClick={this.inspectPage}/>
        );

        let active = 7;
        let items = [];
        for (let number = 1; number <= this.state.pages.length; number++) {
            items.push(
                <li className={this.state.currentPage.id == number ? "page-item active" : "page-item"}
                    data-id={number}
                    onClick={this.handleEdit}>
                    <a class="page-link" href="#">{number}</a></li>
            );
        }

        const storyPagination = (
            <nav aria-label="Page navigation example">
                <div class="d-flex justify-content-center">
                    <ul className="pagination pagination-sm">

                        {items}

                    </ul>
                </div>
            </nav>
        );

        const pageEditor = (
            <div className="card" style={marginAtTop}>
                <div className="card-header">Page Editor</div>
                <div className="card-body" style={scrolling}>
                    <form>
                        <div class="form-group">
                            <label><strong>Page Title</strong></label>
                            <input type="text" className="form-control" id="pageTitle"
                                   placeholder="Add the title" value={this.state.currentPage.title}/>
                        </div>
                        <div class="form-group">
                            <label><strong>Image</strong></label>
                        </div>
                        <div class="d-flex justify-content-center">
                            <img
                                src={require('../images/' + this.state.currentPage.imageTitle + '.jpg')}
                                alt="Choose an image from the 'Images' tab"
                                style={imgStyle} className="card-img-top"/>
                        </div>
                        <div className="form-group">
                            <label><strong>Page Story</strong></label>
                            <textarea className="form-control" value={this.state.currentPage.text}
                                      placeholder="Text for the page.."
                                      maxLength="100" onChange={this.updateTextValue}/>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        {charactersLeft}/100
                    </div>
                </div>
                <div className="card-footer text-muted" style={alignCenter}>
                    {storyPagination}
                </div>
            </div>
        );

        const pageInspector = (
            <div className="card" style={marginAtTop}>
                <div className="card-header">Page Inspector</div>
                <div className="card-body" style={scrolling}>
                    {this.state.inspectedPage != null ? [
                        <div>
                            <form>
                                <div className="form-group">
                                    <label><strong>Page Title</strong></label>
                                    <input type="text" className="form-control" id="pageTitle"
                                           placeholder="Add the title" value={this.state.inspectedPage.title}
                                           disabled={true}/>
                                </div>
                                <div className="form-group">
                                    <label><strong>Image</strong></label>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <img
                                        src={require('../images/' + this.state.inspectedPage.imageTitle + '.jpg')}
                                        alt="Choose an image from the 'Images' tab"
                                        style={imgStyle} className="card-img-top"/>
                                </div>
                                <div className="form-group" >
                                    <label><strong>Page Story</strong></label>
                                    <textarea className="form-control" value={this.state.inspectedPage.text}
                                              placeholder="Text for the page.."
                                              maxLength="100" onChange={this.updateTextValue} disabled={true}/>
                                </div>
                            </form>
                            <div className="d-flex justify-content-end">
                                {charactersLeft}/100
                            </div>
                        </div>
                    ] : []}
                </div>
                <div className="card-footer text-muted" style={alignCenter}>
                    Part of story called..
                </div>
            </div>
        );

        var imagesTab = (
            <div className="card-body" style={scrolling}>
                {imagesNav}
            </div>
        );

        var addPageButton = (
            <div className="d-flex justify-content-center">
                <button type="button" class="btn btn-success" onClick={this.addNewPage}><Glyphicon glyph="add"/> Add
                    Blank Page
                </button>
            </div>
        );

        const searchForAPageBar = (
            <div className="input-group" style={marginAtTop}>
                <input autoCorrect="off" autoComplete="off" onChange={this.handleSearch} value={this.state.searchedPage}
                       id="searchbox" type="text" className="form-control"
                       placeholder="Search for..."/>
                <span className="input-group-btn">
                                    <button className="btn btn-light" onClick={this.handleClear}>Cancel</button>
                                  </span>
            </div>
        );

        var pagesTab = (
            <div id="pagesTab" className="card-body" style={scrolling}>
                {pagesNav}
                <hr/>
                {this.state.selectedPagesItem == 3 && addPageButton}
                {this.state.selectedPagesItem == 3 && existingPages}
                {this.state.selectedPagesItem == 4 && searchForAPageBar}
                {this.state.selectedPagesItem == 4 && libraryPages}
            </div>
        );

        return (

            <Container>
                <Well>
                    <Row className="show-grid">
                        <Col xs={12} md={10}>
                        </Col>
                        <Col xs={12} md={2}>
                            <a class="btn btn-large btn-info" href="/toda" block><Glyphicon glyph="charts">View
                                TODA</Glyphicon></a>
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
                        {this.state.selectedPagesItem == 3 && pageEditor}
                        {this.state.selectedPagesItem == 4 && pageInspector}
                    </Col>
                </Row>
            </Container>
        );
    }
}
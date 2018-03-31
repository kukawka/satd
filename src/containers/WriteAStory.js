import React, {Component} from "react";
import Col from "../components/Col";
import Row from "../components/Row";
import {Redirect} from 'react-router';
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
import LibraryImageThumbnail from "../components/LibraryImageThumbnail";
import Portal from '../Portal';
import Preview from "../containers/Preview";
import FullScreenPortal from '../FullScreenPortal';
import io from "socket.io-client";

export default class StoryEditor extends Component {
    constructor(props) {
        super(props);
        //remember to connect this to back-end:
        this.socket = io('localhost:8080');
        this.state = {
            storyno: props.storyno,
            story: {id: 0, title: '', date: '', patient: ''},
            pages: [],
            libraryOfImages: [],
            libraryOfPages: [],
            initialLibraryOfPages: [],
            finished: false,

            currentPage: null,
            currentPageID: 0,
            inspectedPage: null,

            searchedPage: '',

            selectedPagesItem: 3,
            selectedParentItem: 1,
            selectedImagesItem: 5,
            selectedLibItem: 1,

            showAddImagePortal: false,
            showInspectImagePortal: false,
            showInspectPagePortal: false,
            showConfirmDeletePortal: false,
            showConfirmFinishPortal: false,
            showPreviewPortal: false,

            pageToAddTo: 1,
            imageToAdd: null,
            pageToDelete: 0,

            pageText: '',
            pageTitle: '',
            pageNotes: '',
            pageID: 0,
            pageImageTitle: '',
            pageDBID: 0

        };

        this.handleSelect = this.handleSelect.bind(this);
        //this.updateTextValue = this.updateTextValue.bind(this);
        this.chooseToEdit = this.chooseToEdit.bind(this);
        this.addNewPage = this.addNewPage.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.chooseToDelete = this.chooseToDelete.bind(this);

        this.confirmFinish = this.confirmFinish.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.showPreview = this.showPreview.bind(this);

        this.addTemplatePage = this.addTemplatePage.bind(this);
        this.inspectPage = this.inspectPage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleClosePortal = this.handleClosePortal.bind(this);
        this.addExistingImage = this.addExistingImage.bind(this);
        this.inspectImage = this.inspectImage.bind(this);
        this.handleAddImage = this.handleAddImage.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.addInspectedTemplatePage = this.addInspectedTemplatePage.bind(this);
        this.addInspectedImage = this.addInspectedImage.bind(this);
        //this.componentDidMount=this.componentDidMount.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.updateTitle = this.updateTitle.bind(this);

        const setStory = data => {
            //console.log(data);
            this.setState({story: data});
            //console.log(this.state.notes);
        };
    }

    componentDidMount() {
        this.socket.emit('GET_STORY', {
            storyid: this.state.storyno
        });

        this.socket.on('INITIAL_STORY_STATE', function (data1, data2) {
            this.setState({
                story: data1,
                pages: data2
            });
        }.bind(this));

        this.socket.emit('GET_LIBRARIES');

        this.socket.on('INITIAL_LIBRARIES', function (data1, data2) {
            this.setState({
                libraryOfPages: data1,
                initiallibraryOfPages: data1,
                libraryOfImages: data2
            });
        }.bind(this));
    }

    reloadStory(){
        this.socket.emit('GET_STORY', {
            storyid: this.state.storyno
        });

        this.socket.on('INITIAL_STORY_STATE', function (data1, data2) {
            this.setState({
                story: data1,
                pages: data2
            });
        }.bind(this));
    }

    handleFinish() {
        this.setState({
            finished: true
        });
    }

    confirmFinish() {
        this.setState({
            showConfirmFinishPortal: true
        });
    }

    showPreview() {
        this.setState({
            showPreviewPortal: true
        });
    }

    //adding an image without inspecting first
    addExistingImage(e) {
        //alert(e.currentTarget.dataset.id);
        var allImages = this.state.libraryOfImages;
        var imageToAdd = allImages[e.currentTarget.dataset.id - 1];
        this.setState({
            imageToAdd: imageToAdd,
            showAddImagePortal: !this.state.showAddImagePortal
        });

        this.reloadStory();
    }

    //showing the "Add Image Portal" for an inspected image
    addInspectedImage() {
        this.setState({
            showInspectImagePortal: false,
            showAddImagePortal: true
        });
    }


    //adding an image that was first inspected
    handleAddImage() {
        var allPages = this.state.pages;
        let imageTitle = this.state.imageToAdd.path;
        let pageID = this.state.pageToAddTo;
        let pageDBID = allPages[pageID - 1].dbid;
        this.setState({
            pageToAddTo: 1,
            imageToAdd: null,
            showAddImagePortal: !this.state.showAddImagePortal
        });

        this.socket.emit('UPDATE_IMAGE', {
            pageDBID: pageDBID,
            imageTitle: imageTitle
        });

        //updateTheStoryState

        this.reloadStory();
    }

    inspectImage(e) {
        var allImages = this.state.libraryOfImages;
        var imageToAdd = allImages[e.currentTarget.dataset.id - 1];
        this.setState({
            imageToAdd: imageToAdd,
            showInspectImagePortal: true
        });
    }

    handleClosePortal() {
        this.setState({
            showAddImagePortal: false,
            showInspectImagePortal: false,
            showInspectPagePortal: false,
            showConfirmDeletePortal: false,
            showConfirmFinishPortal: false,
            showPreviewPortal: false
        });
    }

    getInitialState() {
        return this.state.initialLibraryOfPages;
    }

    handleSelectChange(e) {
        this.setState({
            pageToAddTo: e.target.value
        });
        //alert(e.target.value);
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

    chooseToEdit(e) {
        //alert(e.currentTarget.dataset.id);
        var currentPage = this.state.pages[e.currentTarget.dataset.id - 1];
        //alert(currentPage);
        this.setState({
            pageText: currentPage.text,
            pageTitle: currentPage.title,
            pageNotes: currentPage.notes,
            pageID: currentPage.id,
            pageImageTitle: currentPage.imageTitle,
            pageDBID: currentPage.dbid,
            currentPage: currentPage,
            currentPageID: e.currentTarget.dataset.id - 1
        });
    }

    chooseToDelete(e) {
        this.setState({
            pageToDelete: e.currentTarget.dataset.id,
            showConfirmDeletePortal: true
        });
    }

    handleDelete() {
        let reducedSet = this.state.pages;
        let toDelete = reducedSet[this.state.pageToDelete - 1].dbid;
        reducedSet.splice(this.state.pageToDelete - 1, 1);
        //alert(e.currentTarget.dataset.id);

        this.socket.emit('DELETE_PAGE', {
            pageNo: this.state.pageToDelete,
            pageDBID: toDelete
        });

        this.setState({
            pages: reducedSet,
            showConfirmDeletePortal: false
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
            this.socket.emit('REORDER_PAGES', {
                pageDownID: pageToMoveDown.id,
                pageDownDBID: pageToMoveDown.dbid,
                pageUpID: pageToMoveUp.id,
                pageUPDBID: pageToMoveUp.dbid
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
            this.socket.emit('REORDER_PAGES', {
                pageDownID: pageToMoveDown.id,
                pageDownDBID: pageToMoveDown.dbid,
                pageUpID: pageToMoveUp.id,
                pageUPDBID: pageToMoveUp.dbid
            });
        }
        else {
            alert('You are last already!')
        }
    }

    addAPageToDB(page){
        this.socket.emit('ADD_TEMPLATE_PAGE', {
            page: page
        });
        this.reloadStory();
        this.setState({
            currentPage: page
        });
    }

    addNewPage() {
        var blankPage = {
            id: (this.state.pages.length + 1),
            title: 'New Page',
            text: 'Add text',
            notes:'No notes yet',
            imageTitle: 'placeholder',
            isWorrying: false
        };
        this.addAPageToDB(blankPage);
    }

    addTemplatePage(e) {
        //alert('add a page');
        let libPages = this.getInitialState();
        let pageToAdd = libPages[e.currentTarget.dataset.id - 1];
        //let modifiedPageToAdd= pageToAdd;
        pageToAdd.id = this.state.pages.length + 1;
        //alert(pageToAdd.id);
        this.addAPageToDB(pageToAdd);
    }

    addInspectedTemplatePage() {
        var newPages = this.state.pages;
        var pageToAdd = this.state.inspectedPage;
        pageToAdd.id = this.state.pages.length + 1;
        this.setState({
            showInspectPagePortal: false
        });
        this.addAPageToDB(pageToAdd);
    }

    inspectPage(e) {
        //alert(e.currentTarget.dataset.id);
        var pageToAdd = this.state.libraryOfPages[e.currentTarget.dataset.id - 1];
        //alert(currentPage);
        this.setState({
            showInspectPagePortal: true,
            inspectedPage: pageToAdd
        });
    }

    handleSelect(e) {
        if (e.currentTarget.dataset.id == 1 || e.currentTarget.dataset.id == 2) {
            this.setState(
                {
                    selectedLibItem: e.currentTarget.dataset.id
                }
            );
        }
    }

    updateInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        this.socket.emit('UPDATE_PAGE', {
            pageText: this.state.pageText,
            pageTitle: this.state.pageTitle,
            pageNotes: this.state.pageNotes,
            pageImageTitle: this.state.pageImageTitle,
            pageDBID: this.state.pageDBID
        });
        //this.render();
    }

    updateTitle() {
        var ep = this.state.pages;
        // ep[this.state.currentPageID].text= this.state.pageText;
        ep[this.state.currentPageID].title = this.state.pageTitle;
        //ep[this.state.currentPageID].notes= this.state.pageNotes;

        this.setState({
            pages: ep
        });
    }

    render() {
        //alert(this.state.storyno);
        var charactersLeft = 100 - this.state.pageText.length;

        //styles
        var imgStyle = {
            minHeight: "150px",
            maxHeight: "270px",
            width: "auto"
        };

        var alignCenter = {
            textAlign: "center",
            alignItems: "center"
        };

        var scrolling = {
            overflowY: "scroll",
            height: 550
        };

        var pageEditorStyle = {
            height: 550
        };

        var marginAtTop = {
            marginTop: 10
        };

        var librariesWell = {
            overflowX: "scroll",
            height: 280
        };

        var buttonsWell = {
            height: 100
        };

        var inspectedImageStyle = {
            height: "auto",
            width: "auto",
            maxWidth: 300,
            maxHeight: 300
        };

        const librariesNav = (
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={e => this.handleSelect(e)} data-id="1">
                    <a className={this.state.selectedLibItem == 1 ? "nav-link active" : "nav-link"} href="#">Pages</a>
                </li>
                <li className="nav-item" onClick={e => this.handleSelect(e)} data-id="2">
                    <a className={this.state.selectedLibItem == 2 ? "nav-link active" : "nav-link"} href="#">Images</a>
                </li>
            </ul>
        );

        const existingPages = this.state.pages
            .sort((a, b) => a.id - b.id)
            .map((page) =>
                <ExistingPageThumbnail key={page.id} page={page}
                                       onEditClick={this.chooseToEdit} onDeleteClick={this.chooseToDelete}
                                       onMoveUp={this.moveUp} onMoveDown={this.moveDown}/>
            );

        //const libraryPages = this.state.libraryOfPages.map((page) =>
        const libraryPages = [];
        let temp = this.state.libraryOfPages;
        for (var i = 1; i <= temp.length; i++) {
            let page = temp[i - 1];
            libraryPages.push(
                <div class="p-3">
                    <LibraryPageThumbnail key={i} page={page} id={i}
                                          onAddClick={this.addTemplatePage} onViewClick={this.inspectPage}/>
                </div>
            )
        }

        //const libraryImages = this.state.libraryOfImages.map((image) =>
        const libraryImages = [];
        temp = this.state.libraryOfImages;
        for (var i = 1; i <= temp.length; i++) {
            let image=temp[i-1];
            libraryImages.push(
                <div class="p-3">
                    <LibraryImageThumbnail data-id={i} image={image} id={i}
                                           onAddClick={this.addExistingImage} onViewClick={this.inspectImage}/>
                </div>
            )
        }

        let active = 7;
        let items = [];

        if (this.state.currentPage != null) {
            for (let number = 1; number <= this.state.pages.length; number++) {
                items.push(
                    <li className={this.state.currentPage.id == number ? "page-item active" : "page-item"}
                        data-id={number}
                        onClick={this.chooseToEdit}>
                        <a class="page-link" href="#">{number}</a></li>
                );
            }
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

        var addPageButton = (
            <div className="d-flex justify-content-center">
                <button type="button" class="btn btn-success" onClick={this.addNewPage}><Glyphicon glyph="add"/> Add
                    a page
                </button>
            </div>
        );

        const pageEditor = (
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h5 class="card-title">Page Editor</h5>
                    {this.state.currentPage != null ? [
                        <p><Glyphicon glyph="save"> Any changes are saved automatically</Glyphicon></p>
                    ] : []}
                </div>
                <div className="card-body" style={pageEditorStyle}>
                    {this.state.currentPage != null ? [
                        <div class="d-flex justify-content-center">
                            <img
                                src={require('../images/' + this.state.currentPage.imageTitle + '.png')}
                                alt="Choose an image from the 'Images' tab"
                                style={imgStyle} className="card-img-top"/>
                        </div>,
                        <form style={marginAtTop}>
                            <div class="form-group row" style={marginAtTop}>
                                <label class="col-sm-3 col-form-label"><strong>Page Title</strong></label>
                                <div class="col-sm-9">
                                    <input type="text" className="form-control" name="pageTitle"
                                           placeholder="Add the title" value={this.state.pageTitle}
                                           onChange={this.updateInput} onBlur={this.updateTitle}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label class="col-sm-3 col-form-label"><strong>Page Story</strong></label>
                                <div class="col-sm-9">
                            <textarea className="form-control" name="pageText" value={this.state.pageText}
                                      placeholder="Text for the page.."
                                      maxLength="100" onChange={this.updateInput}/>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                {charactersLeft}/100
                            </div>
                            <div className="form-group row">
                                <label class="col-sm-3 col-form-label"><strong>Notes</strong></label>
                                <div class="col-sm-9">
                            <textarea className="form-control" name="pageNotes" value={this.state.pageNotes}
                                      placeholder="Text for the page.."
                                      maxLength="100" onChange={this.updateInput}/>
                                </div>
                            </div>
                        </form>] : [
                        <div>
                            <div class="d-flex justify-content-center">
                                <p> Click on one of the existing pages on the left to edit</p>
                            </div>
                            <hr/>
                            {addPageButton}
                        </div>
                    ]}

                </div>
                {this.state.currentPage != null ? [
                    <div className="card-footer">
                        {storyPagination}
                    </div>
                ] : []}
            </div>
        );

        const pageInspector = (
            <div>
                {this.state.inspectedPage != null ? [
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
                                src={require('../images/' + this.state.inspectedPage.imageTitle + '.png')}
                                alt="Choose an image from the 'Images' tab"
                                style={imgStyle} className="card-img-top"/>
                        </div>
                        <div className="form-group">
                            <label><strong>Page Story</strong></label>
                            <textarea className="form-control" value={this.state.inspectedPage.text}
                                      placeholder="Text for the page.."
                                      maxLength="300" disabled={true}/>
                        </div>
                    </form>
                ] : []}
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

        const addToPageOptions = this.state.pages.map((page) =>
            <option value={page.id}>{page.title}</option>
        );

        if (this.state.finished) {
            return <Redirect to='/stories'/>;
        }

        return (

            <Container>
                <FullScreenPortal
                    open={this.state.showPreviewPortal}
                    onClose={this.handleClosePortal}
                >
                    <Preview pages={this.state.pages}/>
                </FullScreenPortal>
                <Portal
                    open={this.state.showConfirmFinishPortal}
                    header="Confirm Finish"
                    onConfirm={this.handleFinish}
                    onCancel={this.handleClosePortal}
                    buttonText="FINISH"
                    cancelButtonText="CANCEL"
                    cancelButton={true}
                >
                    <p>You are about to finish editing the story '{this.state.story.title}' for {this.state.story.patient}.</p>
                    <p>All the changes have been saved.</p>
                </Portal>
                <Portal
                    open={this.state.showConfirmDeletePortal}
                    header="Confirm Deletion"
                    onConfirm={this.handleDelete}
                    onCancel={this.handleClosePortal}
                    buttonText="DELETE"
                    cancelButtonText="CANCEL"
                    cancelButton={true}
                >
                    <p>Are you sure you want to delete this page?</p>
                </Portal>
                <Portal
                    open={this.state.showAddImagePortal}
                    header="Add the Image to one of the Pages"
                    onConfirm={this.handleAddImage}
                    onCancel={this.handleClosePortal}
                    buttonText="ADD"
                    cancelButtonText="CLOSE"
                    cancelButton={true}
                >
                    <form>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Choose the Page</label>
                            <select className="form-control" value={this.state.pageToAddTo}
                                    onChange={this.handleSelectChange} id="exampleFormControlSelect1">
                                {addToPageOptions}
                            </select>
                        </div>
                    </form>
                </Portal>
                <Portal
                    open={this.state.showInspectImagePortal}
                    header="Image Preview"
                    onConfirm={this.addInspectedImage}
                    onCancel={this.handleClosePortal}
                    buttonText="ADD TO A PAGE"
                    cancelButtonText="CANCEL"
                    cancelButton={true}
                >
                    <div className="d-flex justify-content-center">
                        {this.state.imageToAdd != null ?
                            <img src={require('../images/' + this.state.imageToAdd.path + '.png')} alt="Error"
                                 style={inspectedImageStyle}/>
                            : []}
                    </div>
                </Portal>
                <Portal
                    open={this.state.showInspectPagePortal}
                    header="Page Preview"
                    onConfirm={this.addInspectedTemplatePage}
                    onCancel={this.handleClosePortal}
                    buttonText="ADD"
                    cancelButtonText="CLOSE"
                    cancelButton={true}
                >
                    {pageInspector}
                </Portal>
                <div class="card">
                    <div class="card-body">
                        <div className="row">
                            <Col xs={12} md={8}>
                                <Glyphicon glyph="info"/> This story
                                <hr/>
                                <form>
                                    <div class="form-group row">
                                        <label class="col-sm-1">Title</label>
                                        <div class="col-sm-4">
                                            <input type="email" value={this.state.story.title}
                                                   class="form-control form-control-sm" id="colFormLabelSm"
                                                   placeholder="Title of the story"/>
                                        </div>
                                        <label class="col-sm-2 col-form-label">Patient</label>
                                        <div class="col-sm-4">
                                            <input type="email" value={this.state.story.patient}
                                                   class="form-control form-control-sm" id="colFormLabelSm"
                                                   placeholder="Title of the story"/>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                            <Col xs={12} md={2}>
                                <a class="btn btn-warning" href="/toda"><Glyphicon glyph="charts"> View
                                    TODA</Glyphicon></a>
                            </Col>
                            <Col xs={12} md={2}>
                                <button class="btn btn-danger" onClick={this.confirmFinish} block><Glyphicon
                                    glyph="save"> Finish Story</Glyphicon></button>
                            </Col>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col xs={12} md={3}>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <h5>Your Pages</h5>
                                <button className="btn btn-large btn-info" onClick={this.showPreview}><Glyphicon
                                    glyph="play"/> Overview
                                </button>
                            </div>
                            <div id="pagesTab" className="card-body" style={scrolling}>
                                {existingPages}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        {pageEditor}
                    </Col>
                    <Col xs={12} md={3}>
                        <div className="card">
                            <div className="card-header">
                                <h5>Libraries</h5>
                            </div>
                            <div className="card-body" style={scrolling}>
                                {librariesNav}
                                {this.state.selectedLibItem == 1 && searchForAPageBar}
                                {this.state.selectedLibItem == 1 && libraryPages}
                                {this.state.selectedLibItem == 2 && libraryImages}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
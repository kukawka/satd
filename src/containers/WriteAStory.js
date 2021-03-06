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
            pagesForPatient: [],
            inititalPagesForPatient: [],
            initialLibraryOfPages: [],
            initialLibraryOfImages: [],
            finished: false,
            needToReload: false,

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
            showNewPagePortal: false,
            showPageAddedPortal: false,

            pageToAddTo: 1,
            imageToAdd: null,
            pageToDelete: 0,
            pageToAddToTitle: '',

            pageText: '',
            pageTitle: '',
            pageNotes: '',
            pageID: 0,
            pageImageTitle: '',
            pageDBID: 0,

            newTitle: '',
            invalidTitle: false

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
        this.sendToDB = this.sendToDB.bind(this);

        this.showAddNewPage = this.showAddNewPage.bind(this);

        this.filterByPatient=this.filterByPatient.bind(this);
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

        this.socket.on('INITIAL_LIBRARIES', function (data1, data2, data3) {
            this.setState({
                libraryOfPages: data1,
                initialLibraryOfPages: data1,
                libraryOfImages: data2,
                initialLibraryOfImages: data2,
                pagesForPatient: data3,
                inititalPagesForPatient: data3
            });


            var currentPage = data1[0];
            currentPage.id = 1;
            this.setState({
                pageText: currentPage.text,
                pageTitle: currentPage.title,
                pageNotes: currentPage.notes,
                pageID: currentPage.id,
                pageImageTitle: currentPage.imageTitle,
                pageDBID: currentPage.dbid,
                currentPage: currentPage,
                currentPageID: 0
            });

        }.bind(this));


    }

    reloadStory() {
        //alert('reloaded');
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
            pageToAddToTitle: allPages[pageID - 1].title,
            showImageAddedPortal: true,
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
            showPreviewPortal: false,
            showNewPagePortal: false,
            showPageAddedPortal: false,
            showImageAddedPortal: false
        });
    }

    getInitialState() {
        return this.state.initialLibraryOfPages;
    }

    getInitialImagesState() {
        return this.state.initialLibraryOfImages;
    }

    handleSelectChange(e) {
        this.setState({
            pageToAddTo: e.target.value
        });
        //alert(e.target.value);
    }


    handleSearch(event) {
        var updatedList = this.getInitialState();
        var updatedImagesList = this.getInitialImagesState();

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

        updatedImagesList = updatedImagesList.filter(function (item) {
            return item.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1 ||
                item.path.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
        });

        this.setState({
            libraryOfPages: updatedList,
            libraryOfImages: updatedImagesList
        });
    }

    filterByPatient(e){
        if(e.currentTarget.value==2) {
            var temp=this.state.pagesForPatient;
            temp = temp.filter(function (item) {
                return item.p.search(
                    this.state.story.patient) !== -1
            }.bind(this));

            this.setState({
                libraryOfPages: temp
            });
        }
        else{
            var temp=this.getInitialState();
            this.setState({
                libraryOfPages:temp
            });
        }
    }

    handleClear() {
        this.setState({
            searchedPage: ''
        });
        this.setState(
            {
                libraryOfPages: this.state.initialLibraryOfPages,
                libraryOfImages: this.state.initialLibraryOfImages
            });
    }

    getPages() {
        return this.state.pages;
    }

    chooseToEdit(e) {
        //alert(e.currentTarget.dataset.id);
        if (this.state.needToReload) {
            this.reloadStory();
            this.setState({
                needToReload: false
            });
        }
        let tempPages = this.getPages();
        var currentPage = tempPages[e.currentTarget.dataset.id - 1];
        //alert(currentPage.notes);
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

    addAPageToDB(page) {
        this.socket.emit('ADD_TEMPLATE_PAGE', {
            page: page
        });
        this.socket.on('PAGE_ADDED', function () {
            this.reloadStory();
            this.setState({
                currentPage: page,
                pageNotes: page.notes,
                pageTitle: page.title,
                pageText: page.text,
                pageImageTitle: page.imageTitle,
                pageDBID: page.dbid,
                pageID: page.id,
                showPageAddedPortal: true
            });
        }.bind(this));
    }

    showAddNewPage() {
        //alert('heeere');
        this.setState({
            showNewPagePortal: true
        });
    }

    addNewPage() {
        if (this.state.newTitle.length >= 5) {
            var blankPage = {
                id: (this.state.pages.length + 1),
                title: this.state.newTitle,
                text: 'Add text',
                notes: 'No notes yet',
                imageTitle: 'placeholder',
                isWorrying: false
            };
            this.setState({
                invalidTitle: false,
                newTitle: '',
                showNewPagePortal: false
            });
            this.addAPageToDB(blankPage);
        } else {
            this.setState({
                invalidTitle: true
            });
        }
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
    }

    sendToDB() {
        this.setState({
            needToReload: true
        });

        this.socket.emit('UPDATE_PAGE', {
            pageText: this.state.pageText,
            pageTitle: this.state.pageTitle,
            pageNotes: this.state.pageNotes,
            pageImageTitle: this.state.pageImageTitle,
            pageDBID: this.state.pageDBID
        });
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
        var charactersLeft = 100 - this.state.pageText.length;

        //styles
        var imgStyle = {
            minHeight: "100px",
            maxHeight: "200px",
            width: "auto"
        };

        var editorImgStyle = {
            minHeight: "200px",
            maxHeight: "300px",
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
            height: 550,
            overflowY: "scroll",
        };

        var marginAtTop = {
            marginTop: 10
        };

        var marginLeft = {
            marginLeft: 5
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

        /*                            <div>
                                <form class="form-inline">
                                    <div class="form-group mb-4">
                                        <label for="staticEmail2">Title   </label>
                                        <input type="text" style={marginLeft} class="form-control" id="staticEmail2" name="title" value={this.state.story.title}/>
                                    </div>
                                    <div class="form-group mx-sm-3 mb-4">
                                        <label for="inputPassword2">Patient   </label>
                                        <select class="form-control" style={marginLeft} id="exampleFormControlSelect1" disabled={true}>
                                            <option>{this.state.story.patient}</option>
                                        </select>
                                    </div>
                                </form>*/

        const librariesNav = (
            <ul className="nav nav-tabs" style={marginAtTop}>
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
        libraryPages.push(
            <div class="d-flex justify-content-center" style={marginAtTop}>
                <select className="form-control" disabled={false} onChange={this.filterByPatient}>
                    <option value={1}>All patients</option>
                    <option value={2}>This patient</option>
                </select>
            </div>
        );
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
        libraryImages.push(
            <div class="d-flex justify-content-center" style={marginAtTop}>
                <select className="form-control" disabled={true}>
                    <option>My images</option>
                    <option>Staff images</option>
                    <option>Area images</option>
                    <option>Everything</option>
                </select>
            </div>
        );
        for (var i = 1; i <= temp.length; i++) {
            let image = temp[i - 1];
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
                <button type="button" class="btn btn-outline-success" onClick={this.showAddNewPage}><Glyphicon
                    glyph="add"/> Add
                    a page
                </button>
            </div>
        );

        const pageEditor = (
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h5 class="card-title">Page Editor</h5>
                    <p><Glyphicon glyph="save"> Any changes are saved automatically</Glyphicon></p>
                    {this.state.currentPage != null ?
                        <div className="d-flex justify-content-center">
                            <button type="button" class="btn btn-outline-success" onClick={this.showAddNewPage}>
                                <Glyphicon glyph="add"/> Add
                                a page
                            </button>
                        </div> : []}
                </div>
                <div className="card-body" style={pageEditorStyle}>
                    {this.state.currentPage != null ? [
                        <div class="d-flex justify-content-center">
                            <img
                                src={require('../images/' + this.state.currentPage.imageTitle + '.png')}
                                alt="Choose an image from the 'Images' tab"
                                style={editorImgStyle} className="card-img-top"/>
                        </div>,
                        <form style={marginAtTop}>
                            <div class="form-group row" style={marginAtTop}>
                                <label class="col-sm-3 col-form-label"><strong>Page Title</strong></label>
                                <div class="col-sm-9">
                                    <input type="text" className="form-control" name="pageTitle"
                                           placeholder="Add the title" value={this.state.pageTitle}
                                           onChange={this.updateInput} onBlur={this.sendToDB}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label class="col-sm-3 col-form-label"><strong>Page Story</strong></label>
                                <div class="col-sm-9">
                            <textarea className="form-control" name="pageText" value={this.state.pageText}
                                      placeholder="Text for the page.." onChange={this.updateInput}
                                      onBlur={this.sendToDB}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="form-group row">
                                <label class="col-sm-3 col-form-label"><strong>Notes</strong></label>
                                <div class="col-sm-9">
                            <textarea className="form-control" name="pageNotes" value={this.state.pageNotes}
                                      placeholder="Text for the page.."
                                      maxLength="100" onChange={this.updateInput} onBlur={this.sendToDB}/>
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
                                      rows="4" disabled={true}/>
                        </div>
                    </form>
                ] : []}
            </div>
        );

        const searchForAPageBar = (
            <div className="input-group">
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

        const previewPages = this.state.pages
            .sort((a, b) => a.id - b.id)
            .map((page) =>
                <div className="card">
                    <div className="card-header d-flex justify-content-center">
                        <img src={require('../images/' + page.imageTitle + '.png')} alt="No image assigned yet."
                             className="card-img-top" style={imgStyle}/>
                    </div>
                    <div class="card-body">
                        <p class="card-text">{
                            page.text.length > 80 ? [page.text.substring(0, 70), "..."] : page.text}</p>
                    </div>
                </div>
            );

        if (this.state.finished) {
            return <Redirect to='/stories'/>;
        }
        //
        return ([
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item"><a href="/stories">Library</a></li>
                    <li class="breadcrumb-item disabled" aria-current="page">{this.state.story.patient}</li>
                    <li class="breadcrumb-item active" aria-current="page">{this.state.story.title}</li>
                </ol>
            </nav>,
            <Container>
                <FullScreenPortal
                    open={this.state.showPreviewPortal}
                    onClose={this.handleClosePortal}
                >
                    <Preview pages={this.state.pages}/>
                </FullScreenPortal>
                <Portal
                    open={this.state.showPageAddedPortal}
                    header="Page added"
                    onConfirm={this.handleClosePortal}
                    onCancel={this.handleClosePortal}
                    buttonText="CLOSE"
                    cancelButtonText="CANCEL"
                    cancelButton={false}
                >
                    <p> You added page {this.state.inspectedPage != null ? this.state.inspectedPage.title : ""}!</p>
                </Portal>
                <Portal
                    open={this.state.showImageAddedPortal}
                    header="Image changed"
                    onConfirm={this.handleClosePortal}
                    onCancel={this.handleClosePortal}
                    buttonText="CLOSE"
                    cancelButtonText="CANCEL"
                    cancelButton={false}
                >
                    <p> You added image {this.state.imageToAdd != null ? this.state.imageToAdd.title : ""} to
                        page {this.state.pageToAddToTitle != null ? this.state.pageToAddToTitle : ""}!</p>
                </Portal>
                <Portal
                    open={this.state.showNewPagePortal}
                    header="Add A Page"
                    onConfirm={this.addNewPage}
                    onCancel={this.handleClosePortal}
                    buttonText="ADD"
                    cancelButtonText="CANCEL"
                    cancelButton={true}
                >
                    <p>Please enter a suitable page title.</p>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Page Title</label>
                            <input type="text"
                                   class={this.state.invalidTitle ? "form-control is-invalid" : "form-control"}
                                   name="newTitle" placeholder="Page Title"
                                   value={this.state.newTitle} onChange={this.updateInput} required/>
                            {this.state.invalidTitle &&
                            <div className="invalid-feedback">
                                The title needs to be at least 5 characters long.
                            </div>}
                        </div>
                    </form>
                </Portal>
                <Portal
                    open={this.state.showConfirmFinishPortal}
                    header="Confirm Finish"
                    onConfirm={this.handleFinish}
                    onCancel={this.handleClosePortal}
                    buttonText="FINISH"
                    cancelButtonText="CANCEL"
                    cancelButton={true}
                >
                    <p>You are about to finish editing the story '{this.state.story.title}'
                        for {this.state.story.patient}.</p>
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
                    header={this.state.imageToAdd != null ? ["Add image ", this.state.imageToAdd.title, " to a chosen page."] : " "}
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
                    header={this.state.imageToAdd != null ? ["Preview of ", this.state.imageToAdd.title] : " "}
                    onConfirm={this.addInspectedImage}
                    onCancel={this.handleClosePortal}
                    buttonText="ADD TO A PAGE"
                    cancelButtonText="CANCEL"
                    cancelButton={true}
                >
                    <div className="d-flex justify-content-center">
                        {this.state.imageToAdd != null ? [
                            <img src={require('../images/' + this.state.imageToAdd.path + '.png')} alt="Error"
                                 style={inspectedImageStyle}/>
                        ] : []}
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
                <Row>
                    <Col xs={12} md={3}>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <h5>Your Pages</h5>
                                <button className="btn btn-large btn-outline-danger" onClick={this.showPreview}>
                                    <Glyphicon
                                        glyph="play"/> Preview
                                </button>
                            </div>
                            <div id="pagesTab" className="card-body" style={scrolling}>
                                {existingPages}
                            </div>
                            <div className="card-footer d-flex justify-content-center">
                                <p>No of pages: {this.state.pages.length}</p>
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
                                {searchForAPageBar}
                                {librariesNav}
                                {this.state.selectedLibItem == 1 && libraryPages}
                                {this.state.selectedLibItem == 2 && libraryImages}
                            </div>
                            <div className="card-footer d-flex justify-content-center">
                                <p>Browse libraries to add content.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        ]);
    }
}
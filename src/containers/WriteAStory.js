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
import LibraryImageThumbnail from "../components/LibraryImageThumbnail";
import Portal from '../Portal';
import io from "socket.io-client";

export default class StoryEditor extends Component {
    constructor(props) {
        super(props);
        //remember to connect this to back-end:
        this.socket = io('localhost:8080');
        this.state = {
            story: {id: 0, title: '', date: '', patient: ''},
            pages: [
                {
                    id: 1,
                    dbid:0,
                    title: 'Come to reception',
                    text: 'You will come to the reception.',
                    imageTitle: 'entrance',
                    isWorrying: false
                },
                {id: 2, dbid:0,  title: 'Wait in reception', text: '', imageTitle: 'reception', isWorrying: false},
                {id: 3, dbid:0, title: 'Sit in the chair', text: '', imageTitle: 'chair', isWorrying: false},
                {id: 4, dbid:0, title: 'Put your hand up to rest', text: '', imageTitle: 'hand', isWorrying: false},
                {id: 5, dbid:0, title: 'Go back to reception', text: '', imageTitle: 'reception', isWorrying: false}
            ],
            libraryOfImages: [
                {id: 1, title: 'Reception', description: '', path: 'reception'},
                {id: 2, title: 'Chair', description: '', path: 'chair'},
                {id: 3, title: 'Hand up', description: '', path: 'hand'},
                {id: 4, title: 'UV light', description: '', path: 'whitening'},
                {id: 5, title: 'Extraction', description: '', path: 'pulling'}
            ],
            libraryOfPages: [
                {
                    id: 1,
                    dbid:0,
                    title: 'Tooth drilling',
                    text: 'You will come to the reception.',
                    imageTitle: 'drilling',
                    isWorrying: false
                },
                {id: 2, dbid:0, title: 'Teeth cleaning', text: '', imageTitle: 'cleaning', isWorrying: false},
                {id: 3, dbid:0, title: 'Examination', text: '', imageTitle: 'checkup', isWorrying: false},
                {id: 4, dbid:0, title: 'Dental extr..', text: '', imageTitle: 'pulling', isWorrying: false},
                {id: 5, dbid:0, title: 'Teeth Whit..', text: '', imageTitle: 'whitening', isWorrying: false}
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
            currentPage:null,
            inspectedPage: null,
            searchedPage: '',
            selectedPagesItem: 3,
            selectedParentItem: 1,
            selectedImagesItem: 5,
            selectedLibItem: 1,
            showAddImagePortal: false,
            showInspectImagePortal: false,
            showInspectPagePortal: false,
            pageToAddTo: 1,
            imageToAdd: null,
            pageText:'',
            pageTitle:'',
            pageNotes:'',
            pageID:0,
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
        this.updateInput=this.updateInput.bind(this);

        const setStory = data => {
            //console.log(data);
            this.setState({story: data});
            //console.log(this.state.notes);
        };
    }

    componentDidMount() {
        this.socket.emit('GET_STORY', {
            storyid: 1
        });

        this.socket.on('INITIAL_STORY_STATE', function (data1, data2) {
            this.setState({
                story: data1,
                pages: data2
            });
        }.bind(this));
    }


    addExistingImage(e) {
        //alert(e.currentTarget.dataset.id);
        var allImages = this.state.libraryOfImages;
        var imageToAdd = allImages[e.currentTarget.dataset.id - 1];
        this.setState({
            imageToAdd: imageToAdd,
            showAddImagePortal: !this.state.showAddImagePortal
        });
    }

    addInspectedImage() {
        this.setState({
            showInspectImagePortal: false,
            showAddImagePortal: true
        });
    }

    handleAddImage() {
        var modifiedPages = this.state.pages;
        modifiedPages[this.state.pageToAddTo - 1].imageTitle = this.state.imageToAdd.path;
        this.setState({
            pages: modifiedPages,
            currentPage: modifiedPages[this.state.pageToAddTo - 1],
            pageToAddTo: 1,
            imageToAdd: null,
            showAddImagePortal: !this.state.showAddImagePortal
        });
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
            showInspectPagePortal: false
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
            pageText:currentPage.text,
            pageTitle:currentPage.title,
            pageNotes: currentPage.notes,
            pageID: currentPage.id,
            pageImageTitle: currentPage.imageTitle,
            pageDBID: currentPage.dbid,
            currentPage: currentPage
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
        //alert('add a page');
        var pageToAdd = this.state.libraryOfPages[e.currentTarget.dataset.id - 1];
        pageToAdd.id = this.state.pages.length + 1;
        this.setState({
            currentPage: pageToAdd
        });
        this.state.pages.push(pageToAdd);

        this.socket.emit('ADD_TEMPLATE_PAGE', {
            page: pageToAdd,
            storyno:1
        });
    }

    addInspectedTemplatePage() {
        var newPages = this.state.pages;
        var pageToAdd = this.state.inspectedPage;
        pageToAdd.id = this.state.pages.length + 1;
        this.setState({
            currentPage: pageToAdd,
            showInspectPagePortal: false
        });
        this.state.pages.push(pageToAdd);
    }

    inspectPage(e) {
        //alert(e.currentTarget.dataset.id);
        var pageToInspect = e.currentTarget.dataset.id - 1;
        //alert(currentPage);
        this.setState({
            showInspectPagePortal: true,
            inspectedPage: this.state.libraryOfPages[pageToInspect]
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

    updateInput(e){
        this.setState({
            [e.target.name]: e.target.value
        });

        this.socket.emit('UPDATE_PAGE',{
            pageText: this.state.pageText,
            pageTitle: this.state.pageTitle,
            pageNotes: this.state.pageNotes,
            pageImageTitle: this.state.pageImageTitle,
            pageDBID: this.state.pageDBID
        });
        //this.render();
    }

    render() {
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
            width: 450,
            height: "auto"
        };

        const librariesNav = (
            <ul className="nav nav-pills flex-column">
                <li className="nav-item" onClick={e => this.handleSelect(e)} data-id="1">
                    <a className={this.state.selectedLibItem == 1 ? "nav-link active" : "nav-link"} href="#">Pages</a>
                </li>
                <li className="nav-item" onClick={e => this.handleSelect(e)} data-id="2">
                    <a className={this.state.selectedLibItem == 2 ? "nav-link active" : "nav-link"} href="#">Images</a>
                </li>
            </ul>
        );

        const existingPages = this.state.pages.map((page) =>
            <ExistingPageThumbnail key={page.id} page={page}
                                   onEditClick={this.chooseToEdit} onDeleteClick={this.handleDelete}
                                   onMoveUp={this.moveUp} onMoveDown={this.moveDown}/>
        );

        const libraryPages = this.state.libraryOfPages.map((page) =>
            <div class="p-3">
                <LibraryPageThumbnail key={page.id} page={page}
                                      onAddClick={this.addTemplatePage} onViewClick={this.inspectPage}/>
            </div>
        );

        const libraryImages = this.state.libraryOfImages.map((image) =>
            <div class="p-3">
                <LibraryImageThumbnail data-id={image.id} image={image}
                                       onAddClick={this.addExistingImage} onViewClick={this.inspectImage}/>
            </div>
        );

        let active = 7;
        let items = [];
        /*for (let number = 1; number <= this.state.pages.length; number++) {
            items.push(
                <li className={this.state.currentPage.id == number ? "page-item active" : "page-item"}
                    data-id={number}
                    onClick={this.chooseToEdit}>
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
        );*/

        const pageEditor = (
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h5 class="card-title">Page Editor</h5>
                    <p><Glyphicon glyph="save"> All changes saved.</Glyphicon></p>
                </div>
                <div className="card-body" style={pageEditorStyle}>
                    {this.state.currentPage!=null?[
                    <div class="d-flex justify-content-center">
                        <img
                            src={require('../images/' + this.state.pageImageTitle + '.jpg')}
                            alt="Choose an image from the 'Images' tab"
                            style={imgStyle} className="card-img-top"/>
                    </div>,
                    <form style={marginAtTop}>
                        <div class="form-group row" style={marginAtTop}>
                            <label class="col-sm-3 col-form-label"><strong>Page Title</strong></label>
                            <div class="col-sm-9">
                                <input type="text" className="form-control" name="pageTitle"
                                       placeholder="Add the title" value={this.state.pageTitle} onChange={this.updateInput}/>
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
                    </form> ]:[
                        <p> Choose a page to edit.</p>
                        ]}

                </div>
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
                                src={require('../images/' + this.state.inspectedPage.imageTitle + '.jpg')}
                                alt="Choose an image from the 'Images' tab"
                                style={imgStyle} className="card-img-top"/>
                        </div>
                        <div className="form-group">
                            <label><strong>Page Story</strong></label>
                            <textarea className="form-control" value={this.state.inspectedPage.text}
                                      placeholder="Text for the page.."
                                      maxLength="100" disabled={true}/>
                        </div>
                        <div className="d-flex justify-content-end">
                            {charactersLeft}/100
                        </div>
                    </form>
                ] : []}
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

        const addToPageOptions = this.state.pages.map((page) =>
            <option value={page.id}>{page.title}</option>
        );

        return (

            <Container>
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
                    header="A note required"
                    onConfirm={this.addInspectedImage}
                    onCancel={this.handleClosePortal}
                    buttonText="ADD TO A PAGE"
                    cancelButtonText="CANCEL"
                    cancelButton={true}
                >
                    <div className="d-flex justify-content-center">
                        {this.state.imageToAdd != null ?
                            <img src={require('../images/' + this.state.imageToAdd.path + '.jpg')} alt="Error"
                                 style={inspectedImageStyle}/>
                            : []}
                    </div>
                </Portal>
                <Portal
                    open={this.state.showInspectPagePortal}
                    header="Page Inspector"
                    onConfirm={this.addInspectedTemplatePage}
                    onCancel={this.handleClosePortal}
                    buttonText="ADD"
                    cancelButtonText="CLOSE"
                    cancelButton={true}
                >
                    {pageInspector}
                </Portal>
                <div className="row" style={buttonsWell}>
                    <Col xs={12} md={6}>
                        <form>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label">Story Title</label>
                                <div class="col-sm-6">
                                    <input type="email" value={this.state.story.title}
                                           class="form-control form-control-sm" id="colFormLabelSm"
                                           placeholder="Title of the story"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label">Story Title</label>
                                <div class="col-sm-6">
                                    <input type="email" value={this.state.story.title}
                                           class="form-control form-control-sm" id="colFormLabelSm"
                                           placeholder="Title of the story"/>
                                </div>
                            </div>
                        </form>
                    </Col>
                    <Col xs={12} md={2}>
                        <a class="btn btn-large btn-info" href="/toda"><Glyphicon glyph="charts"> View
                            TODA</Glyphicon></a>
                    </Col>
                    <Col xs={12} md={2}>
                        <a class="btn btn-large btn-success" href="/toda" block><Glyphicon glyph="save"> Finish
                            Story</Glyphicon></a>
                    </Col>
                    <Col xs={12} md={2}>
                        <a class="btn btn-large btn-danger" href="/toda" block><Glyphicon glyph="bin"> Discard
                            Story</Glyphicon></a>
                    </Col>
                </div>
                <Row>
                    <Col xs={12} md={3}>
                        <div className="card">
                            <div className="card-header">
                                <h5>Pages</h5>
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
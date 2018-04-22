import React, {Component} from "react";
///import {Nav, Navbar, NavItem, NavDropdown} from "react-bootstrap";
import "./App.css";
import RouteNavItem from "./components/RouteNavItem";
import NavDropdown from "./components/NavDropdown";
import Routes from "./Routes";
import io from "socket.io-client";

class App extends Component {
    constructor(props) {
        super(props);

        this.userHasLoggedIn=this.userHasLoggedIn.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
        this.userChoseAStory=this.userChoseAStory.bind(this);

        this.state = {
            isLoggedIn: true,
            username: '',
            isAuthenticating:true,
            storyno:1
        };
        this.socket = io('localhost:8080');
    }

    componentDidMount() {
        this.socket.emit('CHECKED_IF_LOGGED_IN');

        this.socket.on('LOGGED_IN_OR_NOT', function (data1, data2) {
            this.setState({
                isLoggedIn: data1,
                username: data2
            });
        }.bind(this));
    }

    userHasLoggedIn = logged => {
        //alert(logged);
        this.setState({ isLoggedIn: logged });
    }

    userChoseAStory = story =>{
        this.setState({ storyno: story });
    }

    handleLogout = event => {
        //alert("logged out");
        this.userHasLoggedIn(false);
        this.socket.emit('logOut');
    }

    render() {
        //alert(this.state.isLoggedIn+ this.state.username);
        //<li className="nav-item dropdown" title="Stories" id="basic-nav-dropdown">


        const stateProps = {
            storyno:this.state.storyno,
            isLoggedIn: this.state.isLoggedIn,
            userHasLoggedIn: this.userHasLoggedIn,
            userChoseAStory: this.userChoseAStory
        };

        return (
            <div className="App container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
                    <a className="navbar-brand" href="#">SatD</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {this.state.isLoggedIn ? [
                                    <RouteNavItem href="/" name="Home">Home</RouteNavItem>,
                                        <RouteNavItem className="dropdown-item" href="/stories" name="Library">Stories</RouteNavItem>

                                ]
                                :[]}
                        </ul>
                        <div>
                            {this.state.isLoggedIn
                                ?
                                    <button class="btn btn-outline-secondary" onClick={this.handleLogout} type="button">Log out</button>
                                : [
                                    <button class="btn btn-outline-primary" type="button">Sign up</button>
                                ]}
                        </div>
                    </div>
                </nav>

                { /* Pass properties regarding the state to routes*/}
                <Routes stateProps={stateProps}/>
            </div>
        );
    }
}

export default App;
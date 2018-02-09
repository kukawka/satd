import React, {Component} from "react";
///import {Nav, Navbar, NavItem, NavDropdown} from "react-bootstrap";
import "./App.css";
import RouteNavItem from "./components/RouteNavItem";
import NavDropdown from "./components/NavDropdown";
import Routes from "./Routes";

class App extends Component {
    constructor(props) {
        super(props);

        this.userHasLoggedIn=this.userHasLoggedIn.bind(this);
        this.handleLogout=this.handleLogout.bind(this);

        this.state = {
            isLoggedIn: true,
            isAuthenticating:true
        };
    }

    userHasLoggedIn = logged => {
        //alert(logged);
        this.setState({ isLoggedIn: logged });
    }

    handleLogout = event => {
        //alert("logged out");
        this.userHasLoggedIn(false);
    }

    render() {
        //alert(this.state.isLoggedIn);
        //<li className="nav-item dropdown" title="Stories" id="basic-nav-dropdown">

        const stateProps = {
            isLoggedIn: this.state.isLoggedIn,
            userHasLoggedIn: this.userHasLoggedIn
        };

        return (
            <div className="App container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">SatD</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {this.state.isLoggedIn ? [
                                    <RouteNavItem href="/" name="Home">Home</RouteNavItem>,
                                    <RouteNavItem href = "/appointments" name="Appointments"> Appointments </RouteNavItem>,
                                    <RouteNavItem href="/patients" name="Patients">Patients</RouteNavItem>,

                                <NavDropdown name="Stories">
                                        <RouteNavItem className="dropdown-item" href="/stories" name="Library">Library</RouteNavItem>
                                        <RouteNavItem className="dropdown-item" href="/writeastory" name="Write A Story">Write A Story</RouteNavItem>
                                </NavDropdown>
                                ]
                                :[]}
                            {this.state.isLoggedIn
                                ? <li className="nav-item"> <a className="nav-link" href="/" onClick={this.handleLogout} name="Logout">Logout </a></li>
                                : [
                                    <RouteNavItem key={1} href="/signup" name="Signup">
                                        Signup
                                    </RouteNavItem>,
                                    <RouteNavItem key={2} href="/login" name="Login">
                                        Login
                                    </RouteNavItem>
                                ]}
                        </ul>
                    </div>
                </nav>

                { /* Pass properties regarding the state to routes*/}
                <Routes stateProps={stateProps} />
            </div>
        );
    }
}

export default App;
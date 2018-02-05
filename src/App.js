import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar, NavItem, NavDropdown} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";

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
        this.setState({ isLoggedIn: logged });
    }

    handleLogout = event => {
        this.userHasLoggedIn(false);
    }

    render() {
        //alert(this.state.isLoggedIn);

        const stateProps = {
            isLoggedIn: this.state.isLoggedIn,
            userHasLoggedIn: this.userHasLoggedIn
        };

        return (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">SatD</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullLeft>
                            {this.state.isLoggedIn ? [
                                    /*if the user is logged in provide them with a full menu*/
                                <RouteNavItem key={1} href="/">Home</RouteNavItem>,
                                <RouteNavItem key={2} href = "/appointments"> Appointments </RouteNavItem>,
                                <RouteNavItem key={3} href="/patients">Patients</RouteNavItem>,
                                <NavDropdown key={4} eventKey={3} title="Stories" id="basic-nav-dropdown">
                                    <RouteNavItem key={5} href="/stories">Library</RouteNavItem>
                                    <RouteNavItem key={6} href="/writeastory">Write A Story</RouteNavItem>
                                </NavDropdown>
                            ]
                            :[]}
                        </Nav>
                        <Nav pullRight>
                        {this.state.isLoggedIn
                            ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                            : [
                                <RouteNavItem key={7} href="/signup">
                                    Signup
                                </RouteNavItem>,
                                <RouteNavItem key={8} href="/login">
                                    Login
                                </RouteNavItem>
                            ]}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                { /* Pass properties regarding the state to routes*/}
                <Routes stateProps={stateProps} />
            </div>
        );
    }
}

export default App;
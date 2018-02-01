import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";

class App extends Component {
    constructor(props) {
        super(props);

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
                                <RouteNavItem href="/">Home</RouteNavItem>,
                                < RouteNavItem href = "/appointments"> Appointments </RouteNavItem>,
                                <RouteNavItem href="/patients">Patients</RouteNavItem>,
                                <RouteNavItem href="/stories">Stories</RouteNavItem>
                            ]
                            :[]}
                        </Nav>
                        <Nav pullRight>
                        {this.state.isLoggedIn
                            ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                            : [
                                <RouteNavItem key={1} href="/signup">
                                    Signup
                                </RouteNavItem>,
                                <RouteNavItem key={2} href="/login">
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
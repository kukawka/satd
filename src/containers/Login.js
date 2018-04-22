import React, {Component} from "react";
import Col from "../components/Col";
import Row from "../components/Row";
import Container from "../components/Container";
import Well from "../components/Well";
import "./Login.css";
import io from "socket.io-client";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false,
            invalidEmail: false,
            invalidPas: false,
            loginError: false
        };
        this.socket = io('localhost:8080');

        this.handleLogin = ev => {
            //ev.preventDefault();
            this.socket.emit('tryLoggingIn', {
                email: this.state.email,
                password: this.state.password
            });
        };

       this.socket.on('login', function (data) {
            if (data.message) {
                //alert('success');
                props.userHasLoggedIn(true);
                //this.logIn();
            }
            else {
                alert('failed');
            }
        });
        this.logIn=this.logIn.bind(this) ;

        //this.socket.on=this.socket.on.bind(this);
    }

    logIn(){
        this.props.userHasLoggedIn(true);
    }



    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        //reset the states
        this.setState({
            invalidEmail: false,
            invalidPas: false
        });

        let invalidData=false ;
        //checking for a valid email:
        var standardE = /\S+@\S+\.\S+/;
        if (!standardE.test(this.state.email)) {
            this.setState({invalidEmail: true});
            invalidData=true;
        }
        //checking for a valid password
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        var standardP = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!standardP.test(this.state.password)) {
            this.setState({invalidPas: true});
            invalidData=true;
        }
        if (!invalidData) {
            //alert('no error');
            this.handleLogin();
        }
    }

    render() {
        var centeredStyle = {
            textAlign: "center",
            alignItems: "center"
        };

        return (
            <Container>
                <Row>
                    <Col xs={12} md={4}/>
                    <Col xs={12} md={4}>
                        <div style={centeredStyle}>
                            <h1>SatD</h1>
                            <p>Stories at the Dentist- your way to a better communication</p>
                        </div>
                    </Col>
                    <Col xs={12} md={4}/>
                </Row>
                <Row>
                    <Col xs={12} md={4}/>
                    <Col xs={12} md={4}>
                        <Well id="loginFormWell">
                            <form class="needs-validation" onSubmit={this.handleSubmit} noValidate>
                                <div class="form-group">
                                    <label for="validationCustom01">Username</label>
                                    <input type="email"
                                           class={this.state.invalidEmail ? "form-control is-invalid" : "form-control"}
                                           name="email" placeholder="Email"
                                           value={this.state.email} onChange={this.handleChange} required/>
                                    {this.state.invalidEmail &&
                                    <div className="invalid-feedback">
                                        Please provide a valid email!
                                    </div>
                                    }
                                    {this.state.loginError &&
                                    <div className="invalid-feedback">
                                        Invalid email or password
                                    </div>
                                    }
                                </div>
                                <div class="form-group">
                                    <label for="validationCustom02">Password</label>
                                    <input type="password"
                                           class={this.state.invalidPas ? "form-control is-invalid" : "form-control"}
                                           name="password"
                                           placeholder="Password" value={this.state.password}
                                           onChange={this.handleChange} required/>
                                    {this.state.invalidPas &&
                                    <div class="invalid-feedback">
                                        Please provide a valid password!
                                    </div>
                                    }
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck"
                                               required/>
                                        <label class="form-check-label" for="invalidCheck">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div style={centeredStyle}>
                                    <button className="btn btn-primary"
                                            type="submit">Log in
                                    </button>
                                </div>
                            </form>
                        </Well>
                    </Col>
                    <Col xs={12} md={4}/>
                </Row>
            </Container>
        );
    }
}
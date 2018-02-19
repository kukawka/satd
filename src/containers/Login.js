import React, { Component } from "react";
import Col from "../components/Col";
import Row from "../components/Row";
import Container from "../components/Container";
import Well from "../components/Well";
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

   /* var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });*/

    /*login(email, password) {
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });
        const user = new CognitoUser({ Username: email, Pool: userPool });
        const authenticationData = { Username: email, Password: password };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        return new Promise((resolve, reject) =>
            result=>resolve()
        );
    }*/

    handleSubmit = async event => {
        event.preventDefault();

       try {
            //await this.login(this.state.email, this.state.password);
            this.props.userHasLoggedIn(true);
            alert("Logged in");
        } catch (e) {
            alert(e);
        }
    }

    render() {
        var centeredStyle={
            textAlign:"center",
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
            <form class="needs-validation" novalidate>
                <div class="form-group">
                        <label for="validationCustom01">Username</label>
                        <input type="text" class="form-control" id="validationCustom01" placeholder="First name" value="Mark" required/>
                            <div class="invalid-feedback">
                                Please provide a valid username!
                            </div>
                </div>
                <div class="form-group">
                        <label for="validationCustom02">Password</label>
                        <input type="password" class="form-control" id="validationCustom02" placeholder="Last name" value="Otto" required/>
                            <div class="invalid-feedback">
                                Please provide a valid password!
                            </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                            <label class="form-check-label" for="invalidCheck">
                                Remember me
                            </label>
                    </div>
                </div>
                <div style={centeredStyle}>
                <button class="btn btn-primary" type="submit"></button>
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
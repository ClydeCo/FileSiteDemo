import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/AuthenticationStore';

import '../style/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: 'WSADMIN',
            password: 'Digital',
            authenticating: false,
            gettingUser: false,
            errorMessage: ""
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.discoveryCallback = this.discoveryCallback.bind(this);
        this.handleLoginCallback = this.handleLoginCallback.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        document.body.classList.add("body-background-blue");
    }

    componentWillUnmount() {
        document.body.classList.remove("body-background-blue");
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    discoveryCallback(object) {
        this.setState({
            gettingUser: false
        });
    }

    handleLoginCallback(object) {
        if (!object) {
            this.setState({
                authenticating: false,
                errorMessage: "Failed to Login. Please Try Again."
            });
            return;
        }

        this.setState({
            authenticating: false,
            gettingUser: true,
            errorMessage: ""
        });
        this.props.requestDiscoveryFunction(this.discoveryCallback);
    }

    handleLogin() {
        this.setState({
            authenticating: true,
        });
        this.props.requestAuthenticationFunction(this.state.email, this.state.password, this.handleLoginCallback);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto" style={{ paddingTop: "120px" }}>
                        <img className="img-responsive" src="largeLogo.svg" />
                        <span className="text-center text-light"><h3>FileSite Integration Demo</h3></span>
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="text" id="inputEmail"
                                            value={this.state.email} onChange={this.handleEmailChange}
                                            className="form-control" placeholder="Email address" required autoFocus />
                                        <label htmlFor="inputEmail">Email address</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword"
                                            value={this.state.password} onChange={this.handlePasswordChange}
                                            className="form-control" placeholder="Password" required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>

                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                    </div>
                                    {
                                        this.state.authenticating
                                            ?
                                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" disabled onClick={this.handleLogin}>
                                                Authenticating user <i className="fa fa-spinner fa-spin c-white fa-2x"></i>
                                            </button>
                                            :
                                            this.state.gettingUser
                                                ?
                                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" disabled onClick={this.handleLogin}>
                                                    Getting user <i className="fa fa-spinner fa-spin c-white fa-2x"></i>
                                                </button>
                                                :
                                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.handleLogin}>
                                                    Sign in
                                                </button>
                                    }
                                    <hr />
                                    <div className="alert alert-danger" style={this.state.errorMessage.length > 0 ? { display: "block" } : { display: "none" }} role="alert">{this.state.errorMessage}</div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.authenticationStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Login);
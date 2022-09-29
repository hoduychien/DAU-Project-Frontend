import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';


import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            show: false
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }
    handleShowHidePassword = (event) => {
        this.setState({
            show: !this.state.show
        })
    }

    handleLogin = async () => {
        // clear error
        this.setState({
            errorMessage: '',
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errorCode !== 0) {
                this.setState({
                    errorMessage: data.message,
                })
            }
            if (data && data.errorCode === 0) {
                // eslint-disable-next-line no-undef
                this.props.userLoginSuccess(data.user);
                console.log("Success!!");
            }
        } catch (error) {
            // show error
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message,
                    })
                }
            }
        }
    }


    render() {
        return (
            <div className="login">
                <div className="login-container">
                    <div className="login-content">
                        <h1>Login</h1>
                        <div className="form-field">
                            <input
                                type="text"
                                className="form-input"
                                placeholder=" "
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                            <label className="form-label">Username</label>
                        </div>
                        <div className="form-field">
                            <input
                                type={this.state.show ? `text` : `password`}
                                className="form-input"
                                placeholder=" "
                                onChange={(event) => this.handleOnChangePassword(event)} />
                            <label className="form-label">Password</label>
                            <span className="eye" onClick={() => { this.handleShowHidePassword() }}>
                                <i className={this.state.show ? `fa fa-eye` : `fa fa-eye-slash`}></i>
                            </span>


                        </div>
                        <div className="form-error">
                            {this.state.errorMessage}
                        </div>
                        <button type="button" className="form-btn" onClick={() => { this.handleLogin() }}>
                            Login
                        </button>
                        <div className="form-link">
                            <span>
                                You don't have an account.
                                <a href="/register">
                                    Register Now
                                </a>
                            </span>
                        </div>

                        <div className="form-line"></div>

                        <div>
                            <span>Or</span>
                        </div>

                        <div className="form-group">
                            <button className="form-btn">
                                Google
                            </button>
                            <button className="form-btn">
                                Facebook
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

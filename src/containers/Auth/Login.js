import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';


class Login extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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

    handleLogin = () => {
        console.log(`Username: ${this.state.username}`)
        console.log(`Password: ${this.state.password}`)
    }


    render() {
        return (
            <div className="login">
                <div className="login-container">
                    <div className="login-content">
                        <h1>Đăng nhập</h1>
                        <div className="form-field">
                            <input
                                type="text"
                                className="form-input"
                                placeholder=" "
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                            <label className="form-label">Tên đăng nhập</label>
                        </div>
                        <div className="form-field">
                            <input
                                type={this.state.show ? `text` : `password`}
                                className="form-input"
                                placeholder=" "
                                onChange={(event) => this.handleOnChangePassword(event)} />
                            <label className="form-label">Mật khẩu</label>
                            <span className="eye" onClick={()=>{this.handleShowHidePassword()}}>
                                <i class={this.state.show ? `fa fa-eye` : `fa fa-eye-slash`}></i>
                            </span>

                            
                        </div>
                        <button className="form-btn" onClick={() => { this.handleLogin() }}>
                            Đăng nhập
                        </button>
                        <div className="form-link">
                            <span>Quên mật khẩu ?</span>
                        </div>

                        <div className="form-line"></div>

                        <div>
                            <span>Hoặc</span>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

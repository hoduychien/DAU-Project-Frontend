import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import './Register.scss';
import Swal from 'sweetalert2';

import { createNewUserService } from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            gender: '',
            roleId: 3,
            valid: ''
        }
    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    validateInput = () => {
        let arrInput = [
            'firstName',
            'lastName',
            'email',
            'password',
            'address',
            'phone',
            'gender',
            // 'roleId'
        ]
        let isValid = true;
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                this.setState({
                    valid: `${arrInput[i]} is required`
                })
                break;
            }
        }
        return isValid;
    }

    handleRegister = async () => {
        let isValid = await this.validateInput();
        let err = this.state.valid;
        if (isValid === true) {
            this.setState({
                valid: '',
            })
            this.registerSubmit(this.state);
        }

        else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                confirmButtonText: 'I get it',
                text: err,
            })
        }
    }

    registerSubmit = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.message.errorCode !== 0) {
                let err = response.message.errorMessage;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'I get it',
                    text: err,
                })
            }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tạo tài khoản thành công',
                    showConfirmButton: false,
                    timer: 1500
                })

            }
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <div className="login">
                <div className="login-container">
                    <div className="login-content">
                        <h1>Register</h1>
                        <div className="form-field">
                            <input
                                type="text"
                                className="form-input"
                                placeholder=" "
                                onChange={(event) => { this.handleOnchangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />
                            <label className="form-label">First Name</label>
                        </div>
                        <div className="form-field">
                            <input
                                type="text"
                                className="form-input"
                                placeholder=" "
                                onChange={(event) => { this.handleOnchangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />
                            <label className="form-label">Last Name</label>
                        </div>
                        <div className="form-field">
                            <input
                                type="text"
                                className="form-input"
                                placeholder=" "
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                value={this.state.email}
                            />
                            <label className="form-label">Email</label>
                        </div>
                        <div className="form-field">
                            <input
                                type="password"
                                className="form-input"
                                placeholder=" "
                                onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                value={this.state.password}
                            />
                            <label className="form-label">Password</label>
                        </div>
                        <div className="form-field">
                            <input
                                type="text"
                                className="form-input"
                                placeholder=" "
                                onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                value={this.state.address}
                            />
                            <label className="form-label">Address</label>
                        </div>
                        <div className="form-field">
                            <input
                                type="text"
                                className="form-input"
                                placeholder=" "
                                onChange={(event) => { this.handleOnchangeInput(event, "phone") }}
                                value={this.state.phone}
                            />
                            <label className="form-label">Phone Number</label>
                        </div>
                        <div className="modal-radio">
                            <div className="modal-radio-item">
                                <label htmlFor="male">Male</label>
                                <input type="radio" name="gender" id="male" value="Male"
                                    onChange={(event) => { this.handleOnchangeInput(event, "gender") }}
                                />
                            </div>
                            <div className="modal-radio-item">
                                <label htmlFor="female">Female</label>
                                <input type="radio" name="gender" id="female" value="Female"
                                    onChange={(event) => { this.handleOnchangeInput(event, "gender") }}
                                />
                            </div>
                        </div>
                        <div className="form-error">
                            {/* {this.state.valid} */}
                        </div>
                        <button
                            type="button"
                            className="form-btn"
                            onClick={() => { this.handleRegister() }}
                        >
                            Register
                        </button>
                        <div className="form-link">
                            <span>Already have an account. <a href="/login"> Login now</a></span>
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

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';


class ModalAddUser extends Component {

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
            roleId: '',
            valid: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggle();
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
            'email',
            'password',
            'firstName',
            'lastName',
            'address', 'phone',
            'gender',
            'roleId'
        ]
        let isValid = true;
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                // alert('Missing Parameter: ' + arrInput[i]);

                this.setState({
                    valid: `Missing Parameter: ${arrInput[i]}`
                })
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.validateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
            this.setState({
                valid: '',
            })
        }


    }


    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    className={'modal-container'}
                    size="lg"
                    centered
                >
                    <ModalBody>
                        <div className="modal-body">
                            <h3 className="modal-title">Create New User</h3>
                            <div className="modal-group">
                                <div className="modal-item">
                                    <label className="modal-item-label">Email</label>
                                    <input
                                        type="text"
                                        className="modal-item-input"
                                        placeholder="Enter email ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">Password</label>
                                    <input
                                        type="password"
                                        className="modal-item-input"
                                        placeholder="Enter password ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                        value={this.state.password}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">First Name</label>
                                    <input
                                        type="text"
                                        className="modal-item-input"
                                        placeholder="Enter first name ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "firstName") }}
                                        value={this.state.firstName}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="modal-item-input"
                                        placeholder="Enter last name ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "lastName") }}
                                        value={this.state.lastName}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">Address</label>
                                    <input
                                        type="text"
                                        className="modal-item-input"
                                        placeholder="Enter address ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                        value={this.state.address}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">Phone</label>
                                    <input
                                        type="text"
                                        className="modal-item-input"
                                        placeholder="Enter Phone number ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "phone") }}
                                        value={this.state.phone}
                                    />
                                </div>
                            </div>

                            <div className="modal-group">
                                <div>
                                    <label className="modal-item-label">Gender</label>
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
                                </div>

                                <div>
                                    <label className="modal-item-label">Role</label>
                                    <div className="modal-radio">
                                        <div className="modal-radio-item">
                                            <label htmlFor="admin">Admin</label>
                                            <input type="radio" name="roleRadio" id="admin" value="1"
                                                onChange={(event) => { this.handleOnchangeInput(event, "roleId") }}
                                            />
                                        </div>
                                        <div className="modal-radio-item">
                                            <label htmlFor="mentor">Mentor</label>
                                            <input type="radio" name="roleRadio" id="mentor" value="2"
                                                onChange={(event) => { this.handleOnchangeInput(event, "roleId") }}
                                            />
                                        </div>
                                        <div className="modal-radio-item">
                                            <label htmlFor="student">Student</label>
                                            <input type="radio" name="roleRadio" id="student" value="3"
                                                onChange={(event) => { this.handleOnchangeInput(event, "roleId") }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="modal-error">
                                {this.state.valid}
                            </div>

                            <div className="modal-group">
                                <button className="modal-btn" onClick={() => this.handleAddNewUser()} >Create</button>
                                <button className="modal-btn" onClick={() => this.toggle()} >Cancel</button>
                            </div>
                        </div>

                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddUser);




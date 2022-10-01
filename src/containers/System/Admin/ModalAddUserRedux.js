import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import './ModalUser.scss';
import { languages } from '../../../utils';
import { getAllKeywordsService } from '../../../services/userService';
import *  as actions from "../../../store/actions"
import avatar from "../../../assets/images/avatar.png"

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
            valid: '',
            genderArr: []
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let res = await getAllKeywordsService('gender');
        //     if (res && res.errorCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
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
            'address',
            'phone',
            'gender',
            'location',
            'roleId'
        ]
        let isValid = true;
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                this.setState({
                    valid: `Missing Parameter: ${arrInput[i]}`
                })
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = async () => {
        let isValid = await this.validateInput();
        let err = this.state.valid;
        if (isValid === true) {
            Swal.fire({
                icon: 'success',
                title: 'Done !!!',
                confirmButtonText: 'I get it',
                text: "Tạo người dùng thành công",
            })
            this.setState({
                valid: '',
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Opp ...',
                confirmButtonText: 'I get it',
                confirmButtonColor: '#3085d6',
                text: err,
            })
            this.setState({
                valid: '',
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders
            })
        }
    }


    render() {
        let genderArray = this.state.genderArr;
        let language = this.props.language;

        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    className={'modal-container'}
                    size="xl"
                    centered
                >
                    <ModalBody>
                        <div className="modal-body">
                            <h3 className="modal-title">
                                <FormattedMessage id="modal.create-user" />
                            </h3>
                            <div className="modal-group">
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.email" />
                                    </label>
                                    <input
                                        type="text"
                                        className="modal-item-input"
                                        placeholder="Enter email ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.password" />
                                    </label>
                                    <input
                                        type="password"
                                        className="modal-item-input"
                                        placeholder="Enter password ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                        value={this.state.password}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.firstname" />
                                    </label>
                                    <input
                                        type="text"
                                        className="modal-item-input"
                                        placeholder="Enter first name ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "firstName") }}
                                        value={this.state.firstName}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.lastname" />
                                    </label>
                                    <input
                                        type="text"
                                        className="modal-item-input"
                                        placeholder="Enter last name ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "lastName") }}
                                        value={this.state.lastName}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.address" />
                                    </label>
                                    <textarea
                                        type="text"
                                        className="modal-item-input" rows="4" cols="50"
                                        placeholder="Enter address ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                        value={this.state.address}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.phone" />
                                    </label>
                                    <input
                                        type="number"
                                        className="modal-item-input"
                                        placeholder="Enter Phone number ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "phone") }}
                                        value={this.state.phone}
                                    />
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.gender" />
                                    </label>
                                    <select id="inputState" className="modal-item-input" onChange={(event) => { this.handleOnchangeInput(event, "gender") }}>
                                        <option selected disabled hidden>Choose Gender...</option>

                                        {
                                            genderArray && genderArray.length > 0 &&
                                            genderArray.map((item, index) => {
                                                return (
                                                    <option key={index} > {language === languages.VI ? item.vi : item.en}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <i className="fas fa-chevron-down"></i>
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.location" />
                                    </label>
                                    <div className="modal-item-input">
                                        <select id="inputState" className="" onChange={(event) => { this.handleOnchangeInput(event, "location") }}>
                                            <option selected disabled hidden>Choose Location ...</option>
                                            <option value="1">Lecturer</option>
                                            <option value="1">Doctor</option>
                                            <option value="1">Master</option>
                                        </select>

                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.role" />
                                    </label>
                                    <div className="modal-item-input">
                                        <select id="inputState" className="" onChange={(event) => { this.handleOnchangeInput(event, "roleId") }}>
                                            <option selected disabled hidden>Choose Role ...</option>
                                            <option value="1">Admin</option>
                                            <option value="2">Lecturer</option>
                                            <option value="3">Student</option>
                                        </select>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.avatar" />
                                    </label>
                                    <input className="modal-item-input" type="file" id="avatar" accept="image/*" />
                                    <label for="avatar" className="modal-item-avatar">
                                        Choose a photo
                                    </label>
                                </div>
                                <div className="modal-item modal-item-img">
                                    <img src={avatar} alt="" />
                                </div>

                            </div>

                            <div className="modal-group-action">
                                <button className="modal-btn" onClick={() => this.handleAddNewUser()} >
                                    <FormattedMessage id="modal.create" />
                                </button>
                                <button className="modal-btn" onClick={() => this.toggle()} >
                                    <FormattedMessage id="modal.cancel" />
                                </button>
                            </div>
                        </div>

                    </ModalBody>
                </Modal>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genderArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddUser);




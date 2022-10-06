import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import './ModalUser.scss';
import { languages, CommonUtils } from '../../../utils';
import { getAllKeywordsService } from '../../../services/userService';
import *  as actions from "../../../store/actions"
import avatar from "../../../assets/images/avatar-df.png";
import 'react-image-lightbox/style.css';
import { emitter } from '../../../utils/emitter';


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
            position: '',
            roleId: '',
            avatar: '',
            valid: '',
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImage: '',
        }
        this.listenEmitter();
    }

    listenEmitter() {
        emitter.on('EVEN_CLEAR_MODAL_DATA', () => {
            let roleArray = this.props.roles;
            let positionArray = this.props.positions;
            let genderArray = this.props.genders;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phone: '',
                roleId: roleArray && roleArray.length > 0 ? roleArray[2].keyMap : '',
                position: positionArray && positionArray.length > 0 ? positionArray[0].keyMap : '',
                gender: genderArray && genderArray.length > 0 ? genderArray[0].keyMap : '',
                avatar: '',
                valid: '',
                previewImage: '',
                desc: ''

            })
        })
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
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
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let url = URL.createObjectURL(file);

            this.setState({
                previewImage: url,
                avatar: base64.currentTarget.result
            })
        }
        else { }

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
            'position',
            'roleId',
            'desc'
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
            this.props.createNewUser(this.state);
            this.setState({
                valid: '',
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'I get it',
                text: err,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.genders !== this.props.genders) {
            let genderArray = this.props.genders;
            this.setState({
                genderArr: genderArray,
                gender: genderArray && genderArray.length > 0 ? genderArray[0].keyMap : ''
            })
        }
        if (prevProps.positions !== this.props.positions) {
            let positionArray = this.props.positions;

            this.setState({
                positionArr: positionArray,
                position: positionArray && positionArray.length > 0 ? positionArray[0].keyMap : ''
            })
        }
        if (prevProps.roles !== this.props.roles) {
            let roleArray = this.props.roles;
            this.setState({
                roleArr: roleArray,
                roleId: roleArray && roleArray.length > 0 ? roleArray[2].keyMap : ''
            })
        }
    }



    render() {
        let language = this.props.language;
        let genderArray = this.state.genderArr;
        let roleArray = this.state.roleArr;
        let positionArray = this.state.positionArr;
        let imgUrl = this.state.previewImage;

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
                                        Description
                                    </label>
                                    <textarea
                                        type="text"
                                        className="modal-item-input" rows="4" cols="50"
                                        placeholder="Enter description ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "desc") }}
                                        value={this.state.desc}
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
                                                    <option key={index} value={item.keyMap} >
                                                        {language === languages.VI ? item.vi : item.en}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>

                                    <i className="fas fa-chevron-down"></i>
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.position" />
                                    </label>
                                    <div className="modal-item-input">
                                        <select id="inputState" className="" onChange={(event) => { this.handleOnchangeInput(event, "position") }}>
                                            <option selected disabled hidden>Choose Position ...</option>

                                            {
                                                positionArray && positionArray.length > 0 &&
                                                positionArray.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>
                                                            {language === languages.VI ? item.vi : item.en}
                                                        </option>
                                                    )
                                                })
                                            }
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
                                            {
                                                roleArray && roleArray.length > 0 &&
                                                roleArray.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap} >
                                                            {language === languages.VI ? item.vi : item.en}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div className="modal-item">
                                    <label className="modal-item-label">
                                        <FormattedMessage id="modal.avatar" />
                                    </label>
                                    <input className="modal-item-input" type="file"
                                        id="avatar"
                                        accept="image/*"
                                        onChange={(event) => this.handleOnchangeImage(event)} />
                                    <label className="modal-item " htmlFor="avatar" >
                                        <img src={imgUrl === '' ? avatar : imgUrl} alt="" />
                                    </label>
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
        genders: state.admin.genderArr,
        positions: state.admin.positionArr,
        roles: state.admin.roleArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddUser);




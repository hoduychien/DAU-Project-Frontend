import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { languages, CommonUtils } from '../../../../utils';
import *  as actions from "../../../../store/actions"
import thumb from "../../../../assets/course/default-placeholder.png";
import 'react-image-lightbox/style.css';
import _ from 'lodash';



class ModalEditCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            schedule: '',
            image: '',
            valid: '',
            previewImage: '',
        }
    }

    async componentDidMount() {
        let course = this.props.currentCourse;
        console.log(course)

        if (course && !_.isEmpty(course)) {
            let imgBase64 = ''
            if (course.image) {
                imgBase64 = new Buffer(course.image, 'base64').toString('binary')
            }

            this.setState({
                id: course.id,
                name: course.name,
                schedule: course.schedule,
                desc: course.desc,
                image: course.image,
                previewImage: imgBase64,
            })
        }
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
                image: base64.currentTarget.result
            })
        }

    }


    validateInput = () => {
        let arrInput = [
            'name',
            'desc',
            'schedule',
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

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleUpdateCourse = () => {
        let isValid = this.validateInput();
        if (isValid === true) {
            this.props.editCourse(this.state);
            this.setState({
                valid: '',
            })
        }
    }



    render() {
        let imgUrl = this.state.previewImage;

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
                        <div className="modals-body">
                            <h3 className="modals-title">
                                Update Course
                            </h3>
                            <div className="modals-group">
                                <div className="modals-item">
                                    <label className="modals-item-label">
                                        Course Name
                                    </label>
                                    <input
                                        type="text"
                                        className="modals-item-input"
                                        placeholder="Enter course name ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "name") }}
                                        value={this.state.name}
                                    />
                                </div>
                                <div className="modals-item">
                                    <label className="modals-item-label">
                                        Schedule
                                    </label>
                                    <textarea
                                        type="text"
                                        className="modals-item-input" rows="4" cols="50"
                                        placeholder="Enter schedule ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "schedule") }}
                                        value={this.state.schedule}
                                    />
                                </div>
                                <div className="modals-item">
                                    <label className="modals-item-label">
                                        Description
                                    </label>
                                    <textarea
                                        type="text"
                                        className="modals-item-input" rows="5" cols="50"
                                        placeholder="Enter description ..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "desc") }}
                                        value={this.state.desc}
                                    />
                                </div>
                                <div className="modals-item">
                                    <label className="modals-item-label">
                                        Thumbnail
                                    </label>
                                    <input className="modals-item-input" type="file"
                                        id="avatar"
                                        accept="image/*"
                                        onChange={(event) => this.handleOnchangeImage(event)} />
                                    <label className="modals-item " htmlFor="avatar" >
                                        <img src={imgUrl === '' ? thumb : imgUrl} alt="" />
                                    </label>
                                </div>


                            </div>

                            <div className="modals-group-action">
                                <button className="modals-btn" onClick={() => this.handleUpdateCourse()} >
                                    <FormattedMessage id="modal.create" />
                                </button>
                                <button className="modals-btn" onClick={() => this.toggle()} >
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCourse);




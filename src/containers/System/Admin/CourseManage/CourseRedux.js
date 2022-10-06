import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CourseRedux.scss'
import *  as actions from "../../../../store/actions";
import Modal from './ModalAddCourseRedux';
import ModalEditSubject from './ModalEditCourse';
import Swal from 'sweetalert2';
import { createCourseService } from '../../../../services/courseService';
import { emitter } from '../../../../utils/emitter';



class CourseRedux extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            AllCourses: [],
            isOpenEditModal: false,
            userEdit: {},

        }
    }

    getAll = async () => {
        this.props.fetchAllCourseStart();
    }
    async componentDidMount() {
        await this.getAll();
    }

    handleAddUser = () => {
        this.setState({
            isOpen: true,
        })
    }
    handleEditUser = (user) => {
        this.setState({
            isOpenEditModal: true,
            userEdit: user,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }
    toggleEditModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal,
        })
    }

    createNewCourse = async (data) => {
        let response = await createCourseService(data);
        if (response && response.message.errorCode !== 0) {
            let err = response.message.errorMessage
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'I get it',
                text: err,
            })
        }
        else {
            await this.getAll();
            this.setState({
                isOpen: false,
            })
            Swal.fire({
                icon: 'success',
                title: 'Done',
                confirmButtonText: 'I get it',
                text: "Create course success",
            })
            emitter.emit('EVEN_CLEAR_MODAL_DATA');
        }
    }

    handleDeleteCourse = (course) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No, cancel!',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.deleteCourseStart(course.id);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    }
    handleUpdateCourse = async (data) => {
        this.props.updateCourseStart(data);
        setTimeout(() => {
            this.getAll();
        }, 500)
        this.setState({
            isOpenEditModal: false,
        })
        Swal.fire({
            icon: 'success',
            title: 'Update Success',
            showConfirmButton: false,
            timer: 1500
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.courses !== this.props.courses) {
            this.setState({
                AllCourses: this.props.courses,
            })
        }

    }

    render() {
        let userArr = this.state.AllCourses
        return (
            <div className="user-container" >

                <Modal
                    isOpen={this.state.isOpen}
                    toggle={this.toggleUserModal}
                    createNewCourse={this.createNewCourse}
                />

                {
                    this.state.isOpenEditModal &&
                    <ModalEditSubject
                        isOpen={this.state.isOpenEditModal}
                        toggle={this.toggleEditModal}
                        currentCourse={this.state.userEdit}
                        editCourse={this.handleUpdateCourse}
                    />
                }
                <div className="table-users">
                    <div className="header">
                        <div className="header-title">
                            <p>Course manager</p>

                        </div>
                        <div className="header-search-box">
                            <input type="text" placeholder="Search for course" />
                        </div>

                        <button
                            className="header-btn"
                            onClick={() => this.handleAddUser()}
                        >
                            Create Course
                        </button>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Course Name</th>
                                <th>Schedule</th>
                                <th>Description</th>
                                <th width="200">Action</th>
                            </tr>
                            {userArr && userArr.length > 0 &&

                                userArr.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.schedule}</td>
                                            <td>{item.desc}</td>
                                            <td className="table-action">
                                                <button className="table-btn"
                                                    onClick={() => this.handleEditUser(item)}
                                                >
                                                    Edit
                                                </button>
                                                <button className="table-btn"
                                                    onClick={() => this.handleDeleteCourse(item)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        courses: state.admin.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCourseStart: () => dispatch(actions.fetchAllCourseStart()),
        deleteCourseStart: (id) => dispatch(actions.deleteCourseStart(id)),
        updateCourseStart: (user) => dispatch(actions.updateUserStart(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseRedux);

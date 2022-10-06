import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../../store/actions";
import Swal from 'sweetalert2';
import { createSubjectService } from '../../../../services/subjectService';
import { emitter } from '../../../../utils/emitter';
import Modal from './ModalAddSubject';


class CourseRedux extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            allSubject: []
        }
    }

    getAll = async () => {
        this.props.fetchAllSubjectStart();
    }
    async componentDidMount() {
        await this.getAll();
    }

    handleAddSubject = () => {
        this.setState({
            isOpen: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    createNewSubject = async (data) => {
        let response = await createSubjectService(data);
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
                text: "Create subject success",
            })
            emitter.emit('EVEN_CLEAR_MODAL_DATA');
        }
    }

    handleDeleteSubject = (subject) => {
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
                this.props.deleteSubjectStart(subject.id);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
        console.log(subject)
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.subjectData !== this.props.subjectData) {
            this.setState({
                allSubject: this.props.subjectData,
            })
        }

    }

    render() {
        let subjectArr = this.state.allSubject
        return (
            <div className="user-container" >

                <Modal
                    isOpen={this.state.isOpen}
                    toggle={this.toggleUserModal}
                    createNewSubject={this.createNewSubject}
                />
                <div className="table-users">
                    <div className="header">
                        <div className="header-title">
                            <p>Subject manager</p>
                        </div>
                        <div className="header-search-box">
                            <input type="text" placeholder="Search for course" />
                        </div>

                        <button
                            className="header-btn"
                            onClick={() => this.handleAddSubject()}
                        >
                            Create Subject
                        </button>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Subject Name</th>
                                <th>Location</th>
                                <th>Description</th>
                                <th width="200">Action</th>
                            </tr>
                            {subjectArr && subjectArr.length > 0 &&

                                subjectArr.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.location}</td>
                                            <td>{item.desc}</td>
                                            <td className="table-action">
                                                <button className="table-btn"
                                                >
                                                    Edit
                                                </button>
                                                <button className="table-btn"
                                                    onClick={() => this.handleDeleteSubject(item)}
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
        subjectData: state.admin.subjectData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSubjectStart: () => dispatch(actions.fetchAllSubjectStart()),
        deleteSubjectStart: (id) => dispatch(actions.deleteSubjectStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseRedux);

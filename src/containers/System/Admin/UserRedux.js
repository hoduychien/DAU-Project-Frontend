import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService } from '../../../services/userService';
import Modal from './ModalAddUserRedux';
import Swal from 'sweetalert2';
import *  as actions from "../../../store/actions";
import { emitter } from '../../../utils/emitter';
import ModalEditUserRedux from './ModalEditUserRedux';


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isOpenEditModal: false,
            AllUsers: [],
            userEdit: {},
            userIdEdit: ''
        }
    }

    async componentDidMount() {
        await this.getAll();
    }

    getAll = async () => {
        this.props.fetchAllUserStart()
    }

    handleAddUser = () => {
        this.setState({
            isOpen: true,
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
    handleEditUser = (user) => {
        this.setState({
            isOpenEditModal: true,
            userEdit: user,
        })
    }

    handleUpdateUser = async (data) => {
        this.props.updateUserStart(data);
        setTimeout(() => {
            this.getAll();
        }, 500)
        this.setState({
            isOpenEditModal: false,
        })

        console.log(data)
    }

    createNewUser = async (data) => {
        // this.props.createNewUsers({
        //     email: data.email,
        //     password: data.password,
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     address: data.address,
        //     phone: data.phone,
        //     avatar: data.avatar,
        //     gender: data.gender,
        //     position: data.position,
        //     roleId: data.roleId,
        // })
        // await this.getAll();
        // this.setState({
        //     isOpen: false,
        // })

        try {
            let response = await createNewUserService(data);
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
                    text: "Create user success",
                })

                emitter.emit('EVEN_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error)
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                AllUsers: this.props.users,
            })
        }
    }

    handleDeleteUser = (user) => {
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
                this.props.deleteUserStart(user.id);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
    render() {
        let userArr = this.state.AllUsers
        return (
            <div className="user-container" >
                <Modal
                    isOpen={this.state.isOpen}
                    toggle={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />


                {
                    this.state.isOpenEditModal &&
                    <ModalEditUserRedux
                        isOpen={this.state.isOpenEditModal}
                        toggle={this.toggleEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.handleUpdateUser}
                    />
                }
                <div className="table-users">
                    <div className="header">
                        <div className="header-title">
                            <p>Users Manager</p>
                        </div>
                        <div className="header-search-box">
                            <input type="text" placeholder="Search for users" />
                        </div>

                        <button
                            className="header-btn"
                            onClick={() => this.handleAddUser()}
                        >
                            Create User
                        </button>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th width="150">FullName</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th width="200">Action</th>
                            </tr>

                            {userArr && userArr.length > 0 &&

                                userArr.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.firstName} {item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>{item.gender === "M" ? "Male" : "Female"}</td>
                                            <td>{item.roleId}</td>
                                            <td className="table-action">
                                                <button className="table-btn"
                                                    onClick={() => this.handleEditUser(item)}
                                                >
                                                    Edit
                                                </button>
                                                <button className="table-btn"
                                                    onClick={() => this.handleDeleteUser(item)}
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
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUsers: (data) => dispatch(actions.CreateUserStart(data)),
        fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id)),
        updateUserStart: (user) => dispatch(actions.updateUserStart(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

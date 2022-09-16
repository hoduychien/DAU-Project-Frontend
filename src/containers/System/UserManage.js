import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import './modalUser.scss';
import { getAllUsers } from '../../services/userService';
import Modal from './ModalAddUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpen: false,
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('all');
        if (response && response.errorCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
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

    createNewUser = (data) => {
        console.log(data)
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <Modal
                    isOpen={this.state.isOpen}
                    toggle={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
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
                            onClick={() => this.handleAddUser()}>

                            Create User
                        </button>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>FullName</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th width="230">Action</th>
                            </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.firstName} {item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>{item.gender}</td>
                                            <td className="table-action">
                                                <button className="table-btn ">
                                                    Edit
                                                </button>
                                                <button className="table-btn">
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
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

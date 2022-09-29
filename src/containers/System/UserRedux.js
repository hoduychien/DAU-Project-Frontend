import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import './modalUser.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import Modal from './ModalAddUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
import Swal from 'sweetalert2';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }

    render() {
        return (
            <div className="user-container">
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
                        >
                            Create User
                        </button>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                {/* <th></th> */}
                                <th>FullName</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th width="230">Action</th>
                            </tr>
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

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./userManage.scss";
import "./modalUser.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import Modal from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
import Swal from "sweetalert2";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpen: false,
      isOpenEditModal: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAll();
  }

  getAll = async () => {
    let response = await getAllUsers("all");
    if (response && response.errorCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddUser = () => {
    this.setState({
      isOpen: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  toggleEditModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.message.errorCode !== 0) {
        let err = response.message.errorMessage;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          confirmButtonText: "I get it",
          text: err,
        });
      } else {
        await this.getAll();
        this.setState({
          isOpen: false,
        });
        emitter.emit("EVEN_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      let alert = confirm("Are you sure you want to delete?");
      if (alert) {
        let response = await deleteUserService(user.id);
        if (response && response.message.errorCode === 0) {
          await this.getAll();
        } else {
          alert(response.message.errorMessage);
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenEditModal: true,
      userEdit: user,
    });
  };
  handleUpdateUser = async (user) => {
    try {
      let response = await editUserService(user);

      if (response && response.errorCode === 0) {
        this.setState({
          isOpenEditModal: false,
        });
        await this.getAll();
      } else {
        alert(response.errorCode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />

        {this.state.isOpenEditModal && (
          <ModalEditUser
            isOpen={this.state.isOpenEditModal}
            toggle={this.toggleEditModal}
            currentUser={this.state.userEdit}
            editUser={this.handleUpdateUser}
          />
        )}
        <div className="table-users">
          <div className="header">
            <div className="header-title">
              <p>Users Manager</p>
            </div>
            <div className="header-search-box">
              <input type="text" placeholder="Search for users" />
            </div>
            <button className="header-btn" onClick={() => this.handleAddUser()}>
              Create User
            </button>
          </div>
          <table>
            <tbody>
              <tr>
                <th>FullName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Gender</th>
                <th width="230">Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.gender}</td>
                      <td className="table-action">
                        <button
                          className="table-btn"
                          onClick={() => this.handleEditUser(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="table-btn"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

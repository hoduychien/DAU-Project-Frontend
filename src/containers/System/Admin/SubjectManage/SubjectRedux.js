import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import Swal from "sweetalert2";
import { createSubjectService } from "../../../../services/subjectService";
import { emitter } from "../../../../utils/emitter";
import Modal from "./ModalAddSubject";
import ModalEditSubjectRedux from "./ModalEditSubjectRedux";

class CourseRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      allSubject: [],
      isOpenEditModal: false,
      userEdit: {},
      userIdEdit: "",
    };
  }

  async componentDidMount() {
    await this.getAll();
  }
  getAll = async () => {
    this.props.fetchAllSubjectStart();
  };

  handleAddSubject = () => {
    this.setState({
      isOpen: true,
    });
  };

  togglesSubjectModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  toggleEditModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };
  handleEditUser = (user) => {
    this.setState({
      isOpenEditModal: true,
      userEdit: user,
    });
  };
  handleUpdateSubject = async (data) => {
    this.props.editSubjectStartRedux({
      id: data.id,
      name: data.name,
      desc: data.desc,
      location: data.location,
      image: data.image,
    });
    setTimeout(() => {
      this.getAll();
    }, 500);
    this.setState({
      isOpenEditModal: false,
    });
  };

  createNewSubject = async (data) => {
    let response = await createSubjectService(data);
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
      Swal.fire({
        icon: "success",
        title: "Done",
        confirmButtonText: "I get it",
        text: "Create subject success",
      });
      emitter.emit("EVEN_CLEAR_MODAL_DATA");
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.subjectData !== this.props.subjectData) {
      this.setState({
        allSubject: this.props.subjectData,
      });
    }
  }
  handleDeleteSubject = (subject) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel!",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.deleteSubjectStart(subject.id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  render() {
    let subjectArr = this.state.allSubject;
    return (
      <div className="user-container">
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.togglesSubjectModal}
          createNewSubject={this.createNewSubject}
        />

        {this.state.isOpenEditModal && (
          <ModalEditSubjectRedux
            isOpen={this.state.isOpenEditModal}
            toggle={this.toggleEditModal}
            currentSubject={this.state.userEdit}
            editSubject={this.handleUpdateSubject}
          />
        )}
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
              {subjectArr &&
                subjectArr.length > 0 &&
                subjectArr.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.location}</td>
                      <td>{item.desc}</td>
                      <td className="table-action">
                        <button
                          className="table-btn"
                          onClick={() => this.handleEditUser(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="table-btn"
                          onClick={() => this.handleDeleteSubject(item)}
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
  return {
    subjectData: state.admin.subjectData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSubjectStart: () => dispatch(actions.fetchAllSubjectStart()),
    deleteSubjectStart: (id) => dispatch(actions.deleteSubjectStart(id)),
    editSubjectStartRedux: (data) => dispatch(actions.editSubjectStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseRedux);

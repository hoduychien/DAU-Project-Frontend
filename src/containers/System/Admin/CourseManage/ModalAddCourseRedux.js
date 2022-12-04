import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { languages, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import thumb from "../../../../assets/course/default-placeholder.png";
import "react-image-lightbox/style.css";
import { emitter } from "../../../../utils/emitter";
import "./ModalAddCourseRedux.scss";

class ModalAddCourseRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      schedule: "",
      image: "",
      valid: "",
      previewImage: "",
    };
    this.listenEmitter();
  }

  listenEmitter() {
    emitter.on("EVEN_CLEAR_MODAL_DATA", () => {
      this.setState({
        name: "",
        desc: "",
        schedule: "",
        image: "",
        valid: "",
        previewImage: "",
      });
    });
  }

  async componentDidMount() {}

  toggle = () => {
    this.props.toggle();
  };

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let url = URL.createObjectURL(file);

      this.setState({
        previewImage: url,
        image: base64.currentTarget.result,
      });
    }
  };

  validateInput = () => {
    let arrInput = ["name", "desc", "schedule", "previewImage"];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        this.setState({
          valid: `Missing Parameter: ${arrInput[i]}`,
        });
        break;
      }
    }
    return isValid;
  };

  handleAddNewCourse = async () => {
    let isValid = await this.validateInput();
    let err = this.state.valid;
    if (isValid === true) {
      this.props.createNewCourse(this.state);
      this.setState({
        valid: "",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonText: "I get it",
        text: err,
      });
    }
  };

  componentDidUpdate(prevProps) {}

  render() {
    let language = this.props.language;
    let imgUrl = this.state.previewImage;

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className={"modal-container"}
          size="lg"
          centered
        >
          <ModalBody>
            <div className="modals-body">
              <h3 className="modals-title">Create new Course</h3>
              <div className="modals-group">
                <div className="modals-item">
                  <label className="modals-item-label">Course Name</label>
                  <input
                    type="text"
                    className="modals-item-input"
                    placeholder="Enter course name ..."
                    onChange={(event) => {
                      this.handleOnchangeInput(event, "name");
                    }}
                    value={this.state.name}
                  />
                </div>
                <div className="modals-item">
                  <label className="modals-item-label">Schedule</label>
                  <textarea
                    type="text"
                    className="modals-item-input"
                    rows="4"
                    cols="50"
                    placeholder="Enter schedule ..."
                    onChange={(event) => {
                      this.handleOnchangeInput(event, "schedule");
                    }}
                    value={this.state.schedule}
                  />
                </div>
                <div className="modals-item">
                  <label className="modals-item-label">Description</label>
                  <textarea
                    type="text"
                    className="modals-item-input"
                    rows="5"
                    cols="50"
                    placeholder="Enter description ..."
                    onChange={(event) => {
                      this.handleOnchangeInput(event, "desc");
                    }}
                    value={this.state.desc}
                  />
                </div>
                <div className="modals-item">
                  <label className="modals-item-label">Thumbnail</label>
                  <input
                    className="modals-item-input"
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label className="modals-item " htmlFor="avatar">
                    <img src={imgUrl === "" ? thumb : imgUrl} alt="" />
                  </label>
                </div>
              </div>

              <div className="modals-group-action">
                <button
                  className="modals-btn"
                  onClick={() => this.handleAddNewCourse()}
                >
                  Create
                </button>
                <button className="modals-btn" onClick={() => this.toggle()}>
                  Cancel
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genderArr,
    positions: state.admin.positionArr,
    roles: state.admin.roleArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddCourseRedux);

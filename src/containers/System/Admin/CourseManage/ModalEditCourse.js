import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { languages, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import avatar from "../../../../assets/images/avatar-df.png";
import "react-image-lightbox/style.css";
import _ from "lodash";

class ModalEditSubjectRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      schedule: "",
      image: "",
      previewImage: "",
      desc: "",
    };
  }

  async componentDidMount() {
    let course = this.props.currentCourse;

    if (course && !_.isEmpty(course)) {
      let imgBase64 = "";
      if (course.image) {
        imgBase64 = new Buffer(course.image, "base64").toString("binary");
      }

      this.setState({
        id: course.id,
        name: course.name,
        schedule: course.schedule,
        image: imgBase64,
        desc: course.desc,
        previewImage: imgBase64,
      });
    }
  }

  toggle = () => {
    this.props.toggle();
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

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  validateInput = () => {
    let arrInput = ["name", "schedule", "desc"];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        this.setState({
          valid: `Missing Parameter: ${arrInput[i]}`,
        });
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          confirmButtonText: "I get it",
          text: `Missing Parameter: ${arrInput[i]}`,
        });
        break;
      }
    }
    return isValid;
  };

  handleUpdateSubject = () => {
    let isValid = this.validateInput();
    if (isValid === true) {
      this.props.editCourse(this.state);
      this.setState({
        valid: "",
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.genders !== this.props.genders) {
      let genderArray = this.props.genders;

      this.setState({
        genderArr: genderArray,
      });
    }
    if (prevProps.positions !== this.props.positions) {
      let positionArray = this.props.positions;

      this.setState({
        positionArr: positionArray,
      });
    }
    if (prevProps.roles !== this.props.roles) {
      let roleArray = this.props.roles;
      this.setState({
        roleArr: roleArray,
      });
    }
  }

  render() {
    let imgUrl = this.state.previewImage;

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className={"modal-container"}
          size="xl"
          centered
        >
          <ModalBody>
            <div className="modals-body">
              <h3 className="modals-title">Update Course</h3>
              <div className="modals-group">
                <div className="modals-item">
                  <label className="modals-item-label">Subject name</label>
                  <input
                    type="text"
                    className="modals-item-input"
                    placeholder="Enter subject name ..."
                    onChange={(event) => {
                      this.handleOnchangeInput(event, "name");
                    }}
                    value={this.state.name}
                  />
                </div>
                <div className="modals-item">
                  <label className="modals-item-label">schedule</label>
                  <textarea
                    type="text"
                    className="modals-item-input"
                    rows="5"
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
                  <label className="modals-item-label">
                    <FormattedMessage id="modal.avatar" />
                  </label>
                  <input
                    className="modals-item-input"
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label className="modals-item " htmlFor="avatar">
                    <img src={imgUrl === "" ? avatar : imgUrl} alt="" />
                  </label>
                </div>
              </div>

              <div className="modals-group-action">
                <button
                  className="modals-btn"
                  onClick={() => this.handleUpdateSubject()}
                >
                  Update
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEditSubjectRedux);

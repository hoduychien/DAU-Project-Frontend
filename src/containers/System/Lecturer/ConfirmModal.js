import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import _ from "lodash";
import { FiChevronDown, FiBox, FiMail } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiLinkAlt, BiTimeFive } from "react-icons/bi";
import { CommonUtils } from "../../../utils";

import "./ConfirmModal.scss";

class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lecturersEmail: ``,
      studentEmail: ``,
      file: ``,
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      setTimeout(() => {
        this.setState({
          lecturersEmail: this.props.dataModal.lecturersEmail,
          studentEmail: this.props.dataModal.studentEmail,
        });
      }, 500);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        lecturersEmail: this.props.dataModal.lecturersEmail,
        studentEmail: this.props.dataModal.studentEmail,
      });
    }
  }

  handelOnchangeEmail = (event) => {
    this.setState({
      studentEmail: event.target.value,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let filedata = data[0];

    if (filedata) {
      let base64 = await CommonUtils.getBase64(filedata);

      this.setState({
        file: base64.currentTarget.result,
      });
    }
  };

  handleSentEmail = () => {
    this.props.sentEmail(this.state);
  };

  render() {
    let { isOpenModal, closeModal, dataModal, sentEmail } = this.props;

    let { lecturersEmail, studentEmail } = this.props.dataModal;

    return (
      <React.Fragment>
        <Modal
          isOpen={isOpenModal}
          className={"modal-booking-container"}
          size="lg"
          centered
          toggle={closeModal}
        >
          <ModalBody>
            <div className="modal-confirm">
              <div className="modal-confirm-header">
                <h3>Liện hệ học viên</h3>

                <div className="modal-confirm-header-btn">
                  <FiChevronDown />
                  <FiMail />
                  <FiBox />
                </div>
              </div>
              <div className="modal-confirm-main">
                <div className="modal-confirm-item">
                  <label htmlFor="">From:</label>
                  <div className="modal-confirm-input">
                    <input
                      type="text"
                      placeholder="Email người gửi"
                      value={lecturersEmail}
                      disabled
                    />
                  </div>
                </div>
                <div className="modal-confirm-item">
                  <label htmlFor="">To:</label>
                  <div className="modal-confirm-input">
                    <input
                      type="text"
                      placeholder="Email người nhận"
                      value={studentEmail}
                      onChange={(event) => this.handelOnchangeEmail(event)}
                    />
                  </div>
                </div>

                <div className="modal-confirm-item">
                  <label htmlFor="">Tiêu đề:</label>
                  <div className="modal-confirm-input">
                    <input type="text" placeholder="Nhập tiêu đề" />
                  </div>
                </div>
                <div className="modal-confirm-item">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Nhập nội dung email"
                  ></textarea>
                </div>

                <div className="modal-confirm-item">
                  <label htmlFor="">File:</label>
                  <div className="modal-confirm-input">
                    <input
                      type="file"
                      accept="image/png"
                      onChange={(event) => this.handleOnchangeImage(event)}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-confirm-action">
                <div className="modal-confirm-action-icon">
                  <BiLinkAlt />
                  <RiDeleteBinLine />
                  <BiTimeFive />
                </div>

                <div className="modal-confirm-action-btn">
                  <div
                    className="modal-confirm-action-btn-item"
                    onClick={closeModal}
                  >
                    Cancel
                  </div>
                  <div
                    className="modal-confirm-action-btn-item"
                    onClick={() => this.handleSentEmail()}
                  >
                    Sent Email
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);

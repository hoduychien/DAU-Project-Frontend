import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../Header/Header";
import "./LecturerSchedule.scss";
import { getStudentForSubject } from "../../../services/userService";
import Select from "react-select";
import * as actions from "../../../store/actions";
import Swal from "sweetalert2";
import LoadingOverlay from "react-loading-overlay";

import {
  getDetailSubject,
  postSentEmail,
} from "../../../services/subjectService";
import ConfirmModal from "./ConfirmModal";

class LecturerSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStudent: [],
      selectedLecturers: null,
      selectedLecturersLabel: null,
      selectedOption: null,
      selectedSubject: null,
      subjectArr: [],
      lecturersArr: [],

      isOpenModalConfirm: false,
      dataModal: {},

      isloading: false,
    };
  }

  async componentDidMount() {
    this.props.fetchAllSubjectStart();
    this.props.getSubjectRequired();
  }

  getDataStudent = async (subjectId, lecturersId) => {
    const { isLoggedIn, userInfo } = this.props;
    console.log("info", userInfo);

    if (userInfo && userInfo.roleId === "R1") {
      let res = await getStudentForSubject({
        subjectId: subjectId,
        lecturersId: lecturersId,
      });

      if (res && res.data) {
        this.setState({
          dataStudent: res.data,
        });
      }
    } else if (userInfo && userInfo.roleId === "R2") {
      let res = await getStudentForSubject({
        subjectId: subjectId,
        lecturersId: userInfo.id,
      });

      if (res && res.data) {
        this.setState({
          dataStudent: res.data,
        });
      }
    } else {
      this.setState({
        dataStudent: "",
      });
    }
  };

  dataInputSelect = (data, type) => {
    let result = [];
    if (data && data.length > 0) {
      if (type === "SUBJECT") {
        data.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;

          result.push(object);
        });
      }

      if (type === "LECTURERS") {
        data.map((item, index) => {
          let object = {};
          object.label = `${item.firstName} ${item.lastName}`;
          object.value = item.id;
          result.push(object);
        });
      }
    }

    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.subjectData !== this.props.subjectData) {
      let dataSelect = this.dataInputSelect(this.props.subjectData, "SUBJECT");
      this.setState({
        subjectArr: dataSelect,
      });
    }

    if (prevProps.subjectRequired !== this.props.subjectRequired) {
      let { resLecrurers } = this.props.subjectRequired;
      let dataLecturers = this.dataInputSelect(resLecrurers, "LECTURERS");

      this.setState({
        lecturersArr: dataLecturers,
      });
    }
  }

  handleChange = async (selectedOption) => {
    this.setState(
      {
        selectedOption: selectedOption,
        selectedSubject: selectedOption.value,
      },
      () => {
        console.log(`Option selected:`, this.state.selectedOption);
      }
    );

    let { lecturersArr } = this.state;

    let res = await getDetailSubject(selectedOption.value);

    if (res && res.errorCode === 0 && res.data) {
      let lecturers = "";
      let selectedLecturers = "";

      if (res.data.Subject_info) {
        lecturers = res.data.Subject_info.lecturersId;
        selectedLecturers = lecturersArr.find((item) => {
          return item && item.value === lecturers;
        });

        this.setState({
          selectedLecturers: lecturers,
        });

        let { user } = this.props;
        this.getDataStudent(
          this.state.selectedSubject
          // this.state.selectedLecturers
        );
      }
    }
  };

  handleChangeRequired = async (selectedOption) => {
    this.setState(
      {
        selectedLecturersLabel: selectedOption,
        selectedLecturers: selectedOption.value,
      },
      () => {
        console.log(`Option selected:`, this.state.selectedLecturers);

        this.getDataStudent(
          this.state.selectedSubject,
          this.state.selectedLecturers
        );
      }
    );
  };

  handleConfirm = (item) => {
    // console.log("object", item.studentData.firstName);
    // return;
    let data = {
      subjectId: item.subjectId,
      lecturersId: item.lecturersId,
      studentId: item.studentId,
      studentEmail: item.studentData.email,
      lecturersEmail: item.subjectIdData.lecturersSubjectData.email,
      timeType: item.timeType,
      studentName: item.studentData.firstName,
      lecturersPhone: item.subjectIdData.lecturersSubjectData.phone,
      lecturersEmail: item.subjectIdData.lecturersSubjectData.email,
    };
    console.log(this.state.selectedSubject, this.state.selectedLecturers);

    this.setState({
      isOpenModalConfirm: true,
      dataModal: data,
    });
  };

  handleContact = () => {
    alert("contact");
  };

  closeModal = () => {
    this.setState({
      isOpenModalConfirm: false,
      dataModal: {},
    });
  };

  sentEmail = async (data) => {
    let { dataModal } = this.state;
    let res = await postSentEmail({
      lecturersEmail: data.lecturersEmail,
      studentEmail: data.studentEmail,
      file: data.file,
      subjectId: dataModal.subjectId,
      studentId: dataModal.studentId,
      timeType: dataModal.timeType,
    });

    if (res && res.errorCode === 0) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Ph???n h???i th??nh c??ng",
      });

      this.getDataStudent(
        this.state.selectedSubject,
        this.state.selectedLecturers
      );
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        confirmButtonText: "I get it",
        text: "Ph???n h???i th???t b???i",
      });
    }

    this.closeModal();
  };
  render() {
    let {
      subjectArr,
      selectedOption,
      dataStudent,
      selectedLecturers,
      selectedLecturersLabel,
      lecturersArr,
      isOpenModalConfirm,
      dataModal,
    } = this.state;

    const { isLoggedIn, userInfo } = this.props;
    // console.log("info", userInfo);

    const customStyles = {
      control: (base) => ({
        ...base,
        minHeight: 24,
      }),
      dropdownIndicator: (base) => ({
        ...base,
        padding: 2,
      }),
      clearIndicator: (base) => ({
        ...base,
        padding: 2,
      }),
      multiValue: (base) => ({
        ...base,
      }),
      valueContainer: (base) => ({
        ...base,
        padding: "0px 8px",
      }),
      input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
      }),
    };
    return (
      <React.Fragment>
        <ConfirmModal
          isOpenModal={isOpenModalConfirm}
          dataModal={dataModal}
          closeModal={this.closeModal}
          sentEmail={this.sentEmail}
        />
        <Header />
        <div>
          <div className="lecturer-schedule-container">
            <div className="lecturer-schedule-title">
              {userInfo && userInfo.roleId === "R1"
                ? "Qu???n l?? k??? ho???ch gi???ng d???y"
                : userInfo.roleId === "R2"
                ? `K??? ho???ch gi???ng d???y c???a gi??o vi??n ${userInfo.firstName} ${userInfo.lastName}`
                : "None"}
            </div>

            <div className="subject-form">
              <div className="modals-item">
                <label className="modals-item-label">Ch???n m??n h???c</label>
                <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={subjectArr}
                  placeholder={"Ch???n m??n h???c"}
                  styles={customStyles}
                />
              </div>
              <div
                className={
                  userInfo && userInfo.roleId === "R1"
                    ? "modals-item"
                    : "modals-item d-none"
                }
              >
                <label className="modals-item-label">Ch???n gi???ng vi??n</label>

                <Select
                  value={selectedLecturersLabel}
                  onChange={this.handleChangeRequired}
                  options={lecturersArr}
                  placeholder={"Gi???ng vi??n ph??? tr??ch..."}
                  name="selectedLecturers"
                  styles={customStyles}
                />
              </div>
            </div>
            <div className="lecturer-schedule-heading">
              <p>Danh s??ch h???c vi??n</p>
              <div className="lecturer-schedule-sent">Th??ng b??o</div>
            </div>
          </div>

          <div className="lecturer-schedule-list">
            <table>
              <tr>
                <th>No.</th>
                <th>FullName</th>
                <th>Time</th>
                <th>Email</th>
                <th>Phone</th>
                {/* <th>Address</th> */}
                <th>Status</th>
                <th>Action</th>
              </tr>

              {dataStudent && dataStudent.length > 0 ? (
                dataStudent.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.studentData.firstName}</td>
                      <td>{item.timeTypeDataEnroll.vi}</td>
                      <td>{item.studentData.email}</td>
                      <td>{item.studentData.phone}</td>
                      {/* <td>{item.studentData.address}</td> */}
                      <td className="">
                        {item.statusId === "S1"
                          ? "Ch??? x??c nh???n"
                          : item.statusId === "S2"
                          ? "???? x??c nh???n"
                          : item.statusId === "S3"
                          ? "???? ph???n h???i"
                          : "???? h???c xong"}
                      </td>
                      <td className="btn-group">
                        <div
                          className={
                            item.statusId === "S1"
                              ? "btn-confirm d-none"
                              : "btn-confirm "
                          }
                          onClick={() => this.handleConfirm(item)}
                        >
                          Ph???n h???i
                        </div>
                        <div
                          className={
                            item.statusId === "S1"
                              ? "btn-contact "
                              : "btn-contact d-none"
                          }
                          onClick={() => this.handleContact()}
                        >
                          Li??n h???
                        </div>
                        <div
                          className={
                            item.statusId === "S1"
                              ? "btn-cancel "
                              : "btn-cancel d-none"
                          }
                          onClick={() => this.handleContact()}
                        >
                          Cancel
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="nodata">
                  <td>No data to display</td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    subjectData: state.admin.subjectData,
    userInfo: state.user.userInfo,
    subjectRequired: state.admin.requiredSubjectData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSubjectStart: () => dispatch(actions.fetchAllSubjectStart()),
    getSubjectRequired: () => dispatch(actions.getSubjectRequired()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturerSchedule);

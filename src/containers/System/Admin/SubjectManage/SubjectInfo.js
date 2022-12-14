import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import Swal from "sweetalert2";
import "./SubjectInfo.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { languages } from "../../../../utils";
import { getDetailSubject } from "../../../../services/subjectService";
import Modal from "./ModalSubjectShedule";

const mdParser = new MarkdownIt();

class SubjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentText: "",
      contentCode: "",
      selectedOption: null,
      desc: "",
      address: "",
      note: "",
      subjectArr: [],
      checkData: false,

      priceArr: [],
      studyTimeArr: [],
      paymentArr: [],
      provinceArr: [],
      courseArr: [],
      lecturersArr: [],
      selectedPrice: null,
      selectedStudyTime: null,
      selectedPayment: null,
      selectedProvince: null,
      selectedCourse: null,
      selectedLecturers: null,

      isOpen: false,

      courseId: "",
      lecturesId: "",
    };
  }

  handleOpenModal = () => {
    if (!this.state.selectedOption) {
      Swal.fire({
        icon: "warning",
        title: "Opps ...",
        confirmButtonText: "I get it",
        text: "Please select subject ...",
      });
    } else {
      this.setState({
        isOpen: true,
      });
    }
  };

  togglesSubjectModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentDidMount() {
    this.props.fetchAllSubjectStart();
    this.props.getSubjectRequired();
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentText: text,
      contentCode: html,
    });
  };

  handleSaveContent = () => {
    let isValid = this.validateInput();
    if (isValid === true) {
      this.props.saveInfoDetailSubject({
        contentCode: this.state.contentCode,
        contentText: this.state.contentText,
        desc: this.state.desc,
        subjectId: this.state.selectedOption.value,

        selectedPrice: this.state.selectedPrice.value,
        selectedStudyTime: this.state.selectedStudyTime.value,
        selectedPayment: this.state.selectedPayment.value,
        selectedProvince: this.state.selectedProvince.value,
        address: this.state.address,
        note: this.state.note,
        courseId:
          this.state.selectedCourse && this.state.selectedCourse.value
            ? this.state.selectedCourse.value
            : "",
        lecturersId:
          this.state.selectedLecturers && this.state.selectedLecturers.value
            ? this.state.selectedLecturers.value
            : "",
      });
    }
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption }, () => this.state.selectedOption.value);

    let {
      paymentArr,
      priceArr,
      provinceArr,
      studyTimeArr,
      courseArr,
      lecturersArr,
    } = this.state;
    let res = await getDetailSubject(selectedOption.value);
    if (res && res.errorCode === 0 && res.data && res.data.Markdown) {
      let address = "",
        payment = "",
        price = "",
        province = "",
        studyTime = "",
        note = "",
        course = "",
        lecturers = "";

      let selectedPayment = "";
      let selectedPrice = "";
      let selectedProvince = "";
      let selectedStudyTime = "";
      let selectedCourse = "";
      let selectedLecturers = "";

      if (res.data.Subject_info) {
        address = res.data.Subject_info.address;
        note = res.data.Subject_info.note;
        payment = res.data.Subject_info.payment;
        price = res.data.Subject_info.price;
        province = res.data.Subject_info.province;
        studyTime = res.data.Subject_info.studyTime;
        course = res.data.Subject_info.courseId;
        lecturers = res.data.Subject_info.lecturersId;

        selectedPayment = paymentArr.find((item) => {
          return item && item.value === payment;
        });
        selectedPrice = priceArr.find((item) => {
          return item && item.value === price;
        });
        selectedProvince = provinceArr.find((item) => {
          return item && item.value === province;
        });
        selectedStudyTime = studyTimeArr.find((item) => {
          return item && item.value === studyTime;
        });

        selectedCourse = courseArr.find((item) => {
          return item && item.value === course;
        });
        selectedLecturers = lecturersArr.find((item) => {
          return item && item.value === lecturers;
        });
      }

      let markdown = res.data.Markdown;
      if (markdown.desc === null || address === null || note === null) {
        this.setState({
          contentText: "",
          desc: "",
          checkData: false,
          note: "",
          address: "",
          selectedPayment: "",
          selectedPrice: "",
          selectedProvince: "",
          selectedStudyTime: "",
          selectedCourse: "",
          selectedLecturers: "",
        });
      } else {
        this.setState({
          contentText: markdown.contentText,
          desc: markdown.desc,
          checkData: true,
          note: note,
          address: address,
          selectedPayment: selectedPayment,
          selectedPrice: selectedPrice,
          selectedProvince: selectedProvince,
          selectedStudyTime: selectedStudyTime,
          selectedCourse: selectedCourse,
          selectedLecturers: selectedLecturers,
        });
      }
    }
  };

  handleChangeRequired = async (selectedOption, name) => {
    let selectedName = name.name;
    let stateCopy = { ...this.state };

    stateCopy[selectedName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  validateInput = () => {
    let arrInput = [
      "selectedOption",
      "selectedPrice",
      "selectedStudyTime",
      "selectedPayment",
      "selectedProvince",
      "selectedCourse",
      "desc",
      "contentText",
    ];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        let error = "";
        switch (arrInput[i]) {
          case "selectedOption":
            error = `Ch??a ch???n m??n h???c !!!`;
            break;
          case "selectedPrice":
            error = `Ch??a ch???n m???c h???c ph?? !!!`;
            break;
          case "selectedStudyTime":
            error = `Ch??a ch???n th???i gian h???c !!!`;
            break;
          case "selectedPayment":
            error = `Ch??a ch???n ph????ng th??c thanh to??n !!!`;
            break;
          case "selectedProvince":
            error = `Ch??a ch???n c?? s??? !!!`;
            break;
          case "selectedCourse":
            error = `Ch??a ch???n kho?? h???c cho m??n h???c !!!`;
            break;
          case "desc":
            error = `Ch??a nh???p ti??u ????? !!!`;
            break;
          case "contentText":
            error = `Ch??a nh???p b??i vi???t !!!`;
            break;

          default:
            break;
        }

        Swal.fire({
          icon: "warning",
          title: "Oops...",
          confirmButtonText: "I get it",
          text: error,
        });
        break;
      }
    }
    return isValid;
  };

  handleChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  dataInputSelect = (data, type) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      if (type === "SUBJECT") {
        data.map((item, index) => {
          let object = {};

          let labelVi = `${item.name}`;
          let labelEn = `${item.name}`;
          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.id;

          result.push(object);
        });
      }
      if (type === "PRICE") {
        data.map((item, index) => {
          let object = {};

          let labelVi = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.vi);

          let labelEn = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(item.en);

          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.keyMap;

          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE" || type === "STUDYTIME") {
        data.map((item, index) => {
          let object = {};

          let labelVi = `${item.vi}`;
          let labelEn = `${item.en}`;
          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.keyMap;

          result.push(object);
        });
      }
      if (type === "COURSE") {
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
      let {
        resPrice,
        resPayment,
        resProvince,
        resStudyTime,
        resCourses,
        resLecrurers,
      } = this.props.subjectRequired;
      let dataPrice = this.dataInputSelect(resPrice, "PRICE");
      let dataStudyTime = this.dataInputSelect(resStudyTime, "STUDYTIME");
      let dataPayment = this.dataInputSelect(resPayment, "PAYMENT");
      let dataProvince = this.dataInputSelect(resProvince, "PROVINCE");
      let dataCourse = this.dataInputSelect(resCourses, "COURSE");
      let dataLecturers = this.dataInputSelect(resLecrurers, "LECTURERS");

      this.setState({
        priceArr: dataPrice,
        studyTimeArr: dataStudyTime,
        paymentArr: dataPayment,
        provinceArr: dataProvince,
        courseArr: dataCourse,
        lecturersArr: dataLecturers,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.dataInputSelect(this.props.subjectData, "SUBJECT");
      let { resPrice, resPayment, resProvince, resStudyTime } =
        this.props.subjectRequired;
      let dataPrice = this.dataInputSelect(resPrice, "PRICE");
      let dataStudyTime = this.dataInputSelect(resStudyTime, "STUDYTIME");
      let dataPayment = this.dataInputSelect(resPayment, "PAYMENT");
      let dataProvince = this.dataInputSelect(resProvince, "PROVINCE");

      this.setState({
        subjectArr: dataSelect,
        priceArr: dataPrice,
        studyTimeArr: dataStudyTime,
        paymentArr: dataPayment,
        provinceArr: dataProvince,
      });
    }
  }

  render() {
    let {
      selectedOption,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      selectedCourse,
      selectedLecturers,
      subjectArr,
      lecturersArr,
      priceArr,
      studyTimeArr,
      paymentArr,
      provinceArr,
      courseArr,
      selectedStudyTime,
    } = this.state;
    let { checkData } = this.state;
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
    console.log(selectedLecturers);

    return (
      <div className="subject-container">
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.togglesSubjectModal}
          selectedOption={this.state.selectedOption}
        />

        <div className="subject-form">
          <div className="modals-item">
            <div className="subject-title">Qu???n l?? th??ng tin m??n h???c</div>
          </div>
          <div className="modals-item">
            <label className="modals-item-label">Ch???n m??n h???c</label>
            <div className="subject-header">
              <div className="subject-select">
                <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={subjectArr}
                  placeholder={"Ch???n m??n h???c"}
                  styles={customStyles}
                />
              </div>
              <button
                className={
                  this.state.selectedOption && this.state.selectedOption
                    ? ""
                    : "d-none"
                }
                onClick={() => this.handleOpenModal()}
              >
                M??? l???p
              </button>
            </div>
          </div>

          <div className="modals-list">
            <div className="modals-item">
              <label className="modals-item-label">Ch???n m???c h???c ph?? :</label>
              <Select
                value={selectedPrice}
                onChange={this.handleChangeRequired}
                options={priceArr}
                placeholder={"Ch???n m???c h???c ph?? ..."}
                name="selectedPrice"
                styles={customStyles}
              />
            </div>
            <div className="modals-item">
              <label className="modals-item-label">
                Ch???n ph????ng th???c thanh to??n :
              </label>
              <Select
                value={selectedPayment}
                onChange={this.handleChangeRequired}
                options={paymentArr}
                placeholder={"Ch???n ph????ng th??c thanh to??n ..."}
                name="selectedPayment"
                styles={customStyles}
              />
            </div>
            <div className="modals-item">
              <label className="modals-item-label">Ch???n c?? s??? :</label>
              <Select
                value={selectedProvince}
                onChange={this.handleChangeRequired}
                options={provinceArr}
                placeholder={"Ch???n c?? s??? ..."}
                name="selectedProvince"
                styles={customStyles}
              />
            </div>
            <div className="modals-item ">
              <label className="modals-item-label">Ch???n th???i gian h???c :</label>
              <Select
                value={selectedStudyTime}
                onChange={this.handleChangeRequired}
                options={studyTimeArr}
                placeholder={"Ch???n th???i gian h???c ..."}
                name="selectedStudyTime"
                styles={customStyles}
              />
            </div>

            <div className="modals-item ">
              <label className="modals-item-label">Ch???n kho?? h???c :</label>

              <Select
                value={selectedCourse}
                onChange={this.handleChangeRequired}
                options={courseArr}
                placeholder={"M??n h???c thu???c kho?? ..."}
                name="selectedCourse"
                styles={customStyles}
              />
            </div>

            <div className="modals-item ">
              <label className="modals-item-label">
                Ch???n gi???ng vi??n ph??? tr??ch :
              </label>

              <Select
                value={selectedLecturers}
                onChange={this.handleChangeRequired}
                options={lecturersArr}
                placeholder={"Gi???ng vi??n ph??? tr??ch..."}
                name="selectedLecturers"
                styles={customStyles}
              />
            </div>

            <div className="modals-item modals-item-long">
              <label className="modals-item-label">?????a ch??? :</label>
              <textarea
                type="text"
                className="modals-item-input"
                rows="4"
                cols="50"
                placeholder="Enter address ..."
                onChange={(event) => this.handleChangeText(event, "address")}
                value={this.state.address}
              />
            </div>
            <div className="modals-item modals-item-long">
              <label className="modals-item-label">Ghi ch?? :</label>
              <textarea
                type="text"
                className="modals-item-input"
                rows="5"
                cols="50"
                placeholder="Enter note ..."
                onChange={(event) => this.handleChangeText(event, "note")}
                value={this.state.note}
              />
            </div>
          </div>
          <div className="modals-item">
            <label className="modals-item-label">Ti??u ?????</label>
            <textarea
              type="text"
              className="modals-item-input"
              rows="5"
              cols="50"
              placeholder="Enter subject title ..."
              onChange={(event) => this.handleChangeText(event, "desc")}
              value={this.state.desc}
            />
          </div>

          <div className="modals-item">
            <label className="modals-item-label">B??i vi???t</label>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentText}
            />
          </div>
        </div>

        <div
          className={
            checkData === true
              ? "button button--update"
              : "button button--primary"
          }
          onClick={() => this.handleSaveContent()}
        >
          {checkData === true ? "L??u thay ?????i" : "L??u th??ng tin"}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subjectData: state.admin.subjectData,
    subjectRequired: state.admin.requiredSubjectData,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSubjectStart: () => dispatch(actions.fetchAllSubjectStart()),
    saveInfoDetailSubject: (data) =>
      dispatch(actions.saveInfoDetailSubject(data)),
    getSubjectRequired: () => dispatch(actions.getSubjectRequired()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectInfo);

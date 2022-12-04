import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./SubjectExtraInfo.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { getExtraInfoSchedule } from "../../../services/subjectService";
import {
  MdOutlineLocationOn,
  MdAvTimer,
  MdCreditScore,
  MdPermPhoneMsg,
  MdMailOutline,
} from "react-icons/md";

class SubjectExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraInfo: {},
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.subjectId !== prevProps.subjectId) {
      let res = await getExtraInfoSchedule(this.props.subjectId);
      if (res && res.errorCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }
  render() {
    let { extraInfo } = this.state;
    let { language } = this.props;
    console.log(extraInfo);

    let currency;
    if (extraInfo && extraInfo.priceTypeData) {
      if (language === languages.VI) {
        currency = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(extraInfo.priceTypeData.vi);
      } else {
        currency = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(extraInfo.priceTypeData.en);
      }
    }

    return (
      <React.Fragment>
        <div className="schedule-extra-info">
          <div className="schedule-extra-info-item">
            Cyberlearn là hệ thống đào tạo lập trình hiện đại dành cho mọi đối
            tượng
          </div>
          <div className="schedule-extra-info-item">
            <span>Địa chỉ :</span>{" "}
            {extraInfo && extraInfo.address ? extraInfo.address : ""}
          </div>
          <div className="schedule-extra-info-item">
            <span>Học trong :</span>{" "}
            {extraInfo &&
              extraInfo.studyTimeTypeData &&
              language === languages.VI &&
              extraInfo.studyTimeTypeData.vi}
            {extraInfo &&
              extraInfo.studyTimeTypeData &&
              language === languages.EN &&
              extraInfo.studyTimeTypeData.en}
          </div>
          <div className="schedule-extra-info-item">
            <span className="orange-span">Học Phí :</span>{" "}
            <span className="orange-span">{currency}</span>
          </div>

          <div className="schedule-extra-info-item">
            <span>Hotline :</span>{" "}
            <span className="blue-span">+84 762 766 682</span>
          </div>
          <div className="schedule-extra-info-item">
            <span>Liên hệ :</span>{" "}
            <span className="blue-span">chienhoo20@gmail.com</span>
          </div>
          <div className="schedule-extra-info-item">
            {extraInfo && extraInfo.note ? extraInfo.note : ""}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailSubjectData: state.admin.detailSubjectData,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDetailSubject: (id) => dispatch(actions.fetchSubjectDetailStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectExtraInfo);

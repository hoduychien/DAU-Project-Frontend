import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../Footer/Footer";
import { withRouter } from "react-router";
import "./CourseDetail.scss";
import SubjectSchedule from "../../Student/Subject/SubjectSchedule";
import SubjectExtraInfo from "../../Student/Subject/SubjectExtraInfo";

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSubjectId: [2],
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { arrSubjectId } = this.state;
    return (
      <React.Fragment>
        <div className="course-detail">
          <HomeHeader />
          <div className="course-detail-main"></div>
          {arrSubjectId &&
            arrSubjectId.length > 0 &&
            arrSubjectId.map((item, index) => {
              return (
                <div className="d-flex">
                  <div>
                    <SubjectSchedule subjectId={item} key={index} />
                    <SubjectExtraInfo subjectId={item} />
                  </div>
                  <div></div>
                </div>
              );
            })}
          <Footer />
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CourseDetail)
);

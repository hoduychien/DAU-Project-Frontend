import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import banner from "../../../assets/images/banner-detail-subject.png";
import "./DetailSubject.scss";
import Footer from "../../Footer/Footer";
import * as actions from "../../../store/actions";
import SubjectSchedule from "../../Student/Subject/SubjectSchedule";
import SubjectExtraInfo from "../../Student/Subject/SubjectExtraInfo";
import banner_cb from "../../../assets/images/banner-cyberlearn.png";
import { AiFillCaretDown } from "react-icons/ai";
import { MdPhone, MdThumbUp } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";

class DetailSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectData: {},
    };
  }

  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.props.loadDetailSubject(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailSubjectData !== this.props.detailSubjectData) {
      this.setState({
        subjectData: this.props.detailSubjectData,
      });
    }
  }

  render() {
    let subjectDetail = this.state.subjectData;
    let imgBase64 = "";
    if (subjectDetail.image) {
      imgBase64 = new Buffer(subjectDetail.image, "base64").toString("binary");
    }
    return (
      <React.Fragment>
        <HomeHeader showHero={false} />

        <div className="subject-detail">
          <div className="subject-detail-main">
            <div className="subject-detail-banner">
              <img src={banner_cb} alt="" />
              <div className="subject-detail-avatar">
                <img src={imgBase64} alt="" />
              </div>
            </div>
            <div className="subject-detail-info">
              <div className="subject-detail-name">
                <h3>{subjectDetail.name}</h3>
                <span>34K lượt thích • 37K người theo dõi</span>
              </div>

              <div className="subject-detail-social">
                <div className="subject-detail-social-item">
                  <MdPhone />
                  <span>Gọi ngay</span>
                </div>
                <div className="subject-detail-social-item">
                  <MdThumbUp />
                  <span>Like</span>
                </div>
                <div className="subject-detail-social-item">
                  <IoMdShareAlt />
                  <span>Share</span>
                </div>
              </div>
            </div>

            <div className="subject-detail-line"></div>

            <ul className="subject-detail-menu">
              <li className="subject-detail-menu-active">
                <span>Bài viết</span>
              </li>
              <li>
                <span>Giới Thiệu</span>
              </li>
              <li>
                <span>Lượt nhắc</span>
              </li>
              <li>
                <span>Người theo dỏi</span>
              </li>
              <li>
                <span>ảnh</span>
              </li>
              <li>
                <span>Video</span>
              </li>
              <li>
                <span>Xem thêm</span>
                <AiFillCaretDown />
              </li>
            </ul>
          </div>

          <div className="subject-detail-infomation">
            <div className="subject-detail-infomation-item">
              <h3>Lịch Khai giảng</h3>
              <SubjectSchedule
                subjectId={
                  subjectDetail && subjectDetail.id ? subjectDetail.id : -1
                }
              />
            </div>
            <div className="subject-detail-infomation-item">
              <h3>Giới Thiệu </h3>
              <SubjectExtraInfo
                subjectId={
                  subjectDetail && subjectDetail.id ? subjectDetail.id : -1
                }
              />
            </div>
          </div>
        </div>

        <div className="subject-detail-post">
          <div className="subject-detail-post-heading">Bài viết</div>
          {subjectDetail &&
            subjectDetail.Markdown &&
            subjectDetail.Markdown.contentCode && (
              <div
                dangerouslySetInnerHTML={{
                  __html: subjectDetail.Markdown.contentCode,
                }}
              ></div>
            )}
        </div>

        {/* <div className="subject-details">
          <div className="subject-banner">
            <img src={imgBase64} alt="" />
            <div className="subject-info">
              <div className="subject-name">{subjectDetail.name}</div>
              {subjectDetail &&
                subjectDetail.Markdown &&
                subjectDetail.Markdown.contentCode && (
                  <div className="subject-descs">
                    {subjectDetail.Markdown.desc}
                  </div>
                )}
              <div className="subject-desc">{subjectDetail.desc}</div>
              <div className="subject-vote">
                <div>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
                <p>Đánh giá (1000+)</p>
              </div>

              <div className="subject-location">
                <i className="fas fa-map-marker-alt"></i>
                {subjectDetail.location}
              </div>

              <div className="subject-actions">
                <div className="subject-action subject-action-like">Like</div>
                <div className="subject-action subject-action-share">Share</div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="subject-schedule">
          <div className="schedule-title">
            <div className="schedule-titles">
              Đăng ký lớp {subjectDetail.name}
            </div>
          </div>
          <div className="line-1"></div>

          <div className="schedule-main">
            <div className="schedule-left">
              <SubjectSchedule
                subjectId={
                  subjectDetail && subjectDetail.id ? subjectDetail.id : -1
                }
              />
            </div>
            <div className="schedule-time">
              <p>Thông tin</p>
            </div>
            <div className="schedule-right">
              <SubjectExtraInfo
                subjectId={
                  subjectDetail && subjectDetail.id ? subjectDetail.id : -1
                }
              />
            </div>
          </div>
        </div> */}

        {/* <div className="subject-post">
          {subjectDetail &&
            subjectDetail.Markdown &&
            subjectDetail.Markdown.contentCode && (
              <div
                dangerouslySetInnerHTML={{
                  __html: subjectDetail.Markdown.contentCode,
                }}
              ></div>
            )}
        </div> */}

        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailSubjectData: state.admin.detailSubjectData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDetailSubject: (id) => dispatch(actions.fetchSubjectDetailStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSubject);

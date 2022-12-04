import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import banner_cb from "../../assets/images/banner-cyberlearn.png";
import { AiFillCaretDown } from "react-icons/ai";
import { MdPhone, MdThumbUp } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import avatar from "../../assets/images/avatar-df.png";
import { getProfileUser } from "../../services/userService";
import _ from "lodash";
import "./ProfileStudent.scss";
import { postVerifyEmail } from "../../services/subjectService";
import Swal from "sweetalert2";

class ProfileStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: "",
    };
  }

  async componentDidMount() {
    let { isLoggedIn, userInfo } = this.props;

    if (userInfo && !_.isEmpty(userInfo)) {
      this.getProfile(this.props.userInfo.id);
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.userInfo !== prevProps.userInfo) {
      this.getProfile(this.props.userInfo.id);
    }
  }

  getProfile = async (studentId) => {
    let res = await getProfileUser(studentId);
    console.log(res);
    if (res && res.errorCode === 0) {
      this.setState({
        profileData: res,
      });
      console.log(res);
    }
  };

  handelConfirmRegister = async (subjectId, token, subjectName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Bạn có muốn đông ý xác nhận đăng ký khóa học ${subjectName}`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel",
      confirmButtonText: "Yes!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await postVerifyEmail({
          token: subjectId,
          subjectId: token,
        });
        this.getProfile(this.props.userInfo.id);
        Swal.fire("Done!", "Xác nhận khóa học thành công.", "success");
      }
    });
  };
  render() {
    const { isLoggedIn, userInfo } = this.props;
    let { profileData } = this.state;

    console.log("checkstate", this.state.profileData);
    let imgBase64 = "";
    if (isLoggedIn) {
      const userAvatar = userInfo.avatar;
      if (userAvatar) {
        imgBase64 = new Buffer(userInfo.avatar, "base64").toString("binary");
      } else {
        imgBase64 = avatar;
      }
    }

    return (
      <React.Fragment>
        <HomeHeader />
        <div className="profile">
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
                  <h3>
                    {userInfo && userInfo.firstName ? userInfo.firstName : ""}{" "}
                    {userInfo && userInfo.lastName ? userInfo.lastName : ""}
                  </h3>
                  <span>0 Lượt thích • 0 Người theo dõi</span>
                </div>

                <div className="subject-detail-social">
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
                <h3>Lịch sử đăng ký</h3>

                <div className="profile-history">
                  <table>
                    <tbody>
                      <tr>
                        <th>No.</th>
                        <th>Môn học</th>
                        <th>Giảng viên</th>
                        <th>Thời gian</th>
                        <th>Địa chỉ</th>
                        <th>Liên hệ</th>
                        <th>Trang thái</th>
                      </tr>

                      {profileData.data &&
                        profileData.data.length > 0 &&
                        profileData.data.map((item, index) => {
                          return (
                            <tr>
                              <td>
                                <div>{index + 1}</div>
                              </td>
                              <td>
                                <div>{item.subjectIdDataEnroll.name}</div>
                              </td>
                              <td>
                                <div>
                                  {
                                    item.subjectIdData.lecturersSubjectData
                                      .firstName
                                  }{" "}
                                  {
                                    item.subjectIdData.lecturersSubjectData
                                      .lastName
                                  }
                                </div>
                              </td>

                              <td>
                                <div>{item.timeTypeDataEnroll.vi}</div>
                              </td>
                              <td>
                                <div>{item.subjectIdData.address}</div>
                              </td>
                              <td>
                                <div>
                                  {
                                    item.subjectIdData.lecturersSubjectData
                                      .phone
                                  }
                                </div>
                              </td>
                              <td
                                className={
                                  item.statusId === "S1" ? "d-none" : ""
                                }
                              >
                                <div>
                                  {item.statusId === "S1"
                                    ? "Kiểm tra email"
                                    : item.statusId === "S2"
                                    ? "Đã xác nhận"
                                    : item.statusId === "S3"
                                    ? "Đã nhận phản hồi"
                                    : item.statusId === "S4"
                                    ? "Đã học xong"
                                    : "Null"}
                                </div>
                              </td>

                              <td
                                className={
                                  item.statusId === "S1" ? "" : "d-none"
                                }
                              >
                                <div
                                  className="btn-confirm"
                                  onClick={() =>
                                    this.handelConfirmRegister(
                                      item.token,
                                      item.subjectId,
                                      item.subjectIdDataEnroll.name
                                    )
                                  }
                                >
                                  Chờ xác nhận
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <div className="subject-detail-infomation-item">
                <h3>Giới Thiệu </h3>

                <div className="profile-info">
                  <div className="profile-info-item"></div>
                  <div className="profile-info-item">
                    <label htmlFor="">Họ và tên:</label>
                    <input type="text" />
                  </div>
                  <div className="profile-info-item">
                    <label htmlFor="">Địa chỉ:</label>
                    <input type="text" />
                  </div>
                  <div className="profile-info-item">
                    <label htmlFor="">Số Điện thoại:</label>
                    <input type="text" />
                  </div>
                  <div className="profile-info-item">
                    <label htmlFor="">Địa chỉ email:</label>
                    <input type="text" />
                  </div>
                </div>
              </div> */}
            </div>
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
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStudent);

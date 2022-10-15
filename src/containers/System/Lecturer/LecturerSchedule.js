import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../Header/Header';
import './LecturerSchedule.scss'

class LecturerSchedule extends Component {
    render() {

        return (
            <React.Fragment>
                <Header />
                <div className="lecturer-schedule-container">
                    <div className="lecturer-schedule-title">
                        Quản lý kế hoạch giảng dạy của giảng viên
                    </div>

                    <div className="subject-form">
                        <div className="modals-item">
                            <label className="modals-item-label">
                                Choose lecturer
                            </label>
                            <input type="text" />
                        </div>
                        <div className="modals-item">
                            <label className="modals-item-label">
                                Choose Class
                            </label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="lecturer-schedule-heading">
                        <p>Danh sách lớp PTCBT10</p>
                        <div className="lecturer-schedule-sent">
                            Thông báo
                        </div>
                    </div>
                </div>

                <div className="lecturer-schedule-list">
                    <table>
                        <tr>
                            <th>FullName</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>Hồ Duy Chiến</td>
                            <td>Hải Châu - Đà Nẵng</td>
                            <td>chienduy2020@gmail.com</td>
                            <td>Male</td>
                            <td>0762766682</td>
                            <td>Liên Hệ</td>
                        </tr>
                        <tr>
                            <td>Hồ Duy Chiến</td>
                            <td>Hải Châu - Đà Nẵng</td>
                            <td>chienduy2020@gmail.com</td>
                            <td>Male</td>
                            <td>0762766682</td>
                            <td>Liên Hệ</td>
                        </tr>
                    </table>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturerSchedule);

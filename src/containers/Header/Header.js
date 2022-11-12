import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { courseMenu } from './menuCourse';
import { subjectMenu } from './menuSubject';
import { lecturerMenu } from './menuLecturer';
import './Header.scss';
import { languages, USER_ROLE } from '../../utils'
import avatar from "../../assets/images/avatar-df.png";
import _ from 'lodash';
import england from '../../assets/images/united-kingdom.png'
import vietnam from '../../assets/images/vietnam.png'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            menuApp: [],
            menuCourse: [],
            menuSubject: [],
            check: false
        }
    }

    componentDidMount() {
        let menuApp = [];
        let menuCourse = [];
        let menuSubject = [];
        let check

        let { userInfo } = this.props;
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menuApp = adminMenu;
                menuCourse = courseMenu;
                menuSubject = subjectMenu;
                check = true
            }
            if (role === USER_ROLE.LECTURER) {
                menuApp = lecturerMenu;
                menuCourse = [];
                menuSubject = [];
                check = false
            }
        }
        this.setState({
            menuApp: menuApp,
            menuCourse: menuCourse,
            menuSubject: menuSubject,
            check: check
        })
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        const userAvatar = userInfo.avatar;
        let imgBase64 = ''
        if (userAvatar) {
            imgBase64 = new Buffer(userInfo.avatar, 'base64').toString('binary')
        }

        return (

            <React.Fragment>
                <div className="header-container">
                    <div className="sidebar-title">
                        <i className="fas fa-bars"></i>
                        <a href="http://localhost:3000" target="_blank" className="sidebar-logo" rel="noreferrer">
                            <h3>CyberLearn</h3>
                        </a>
                    </div>
                    <ul className="sidebar">

                        <li className="sidebar-item">
                            <div>
                                <i className="fas fa-home"></i>
                                <FormattedMessage id="menu.home" className="sidebar-item-name" />
                            </div>

                        </li>
                        <li className="sidebar-item">
                            <div>
                                <i className="fas fa-users-cog"></i>
                                <Navigator menus={this.state.menuApp} className="sidebar-item-name" />
                            </div>
                        </li>

                        <li className={this.state.check ? "sidebar-item" : "sidebar-item d-none"}>
                            <div>
                                <i className="fas fa-bookmark"></i>
                                <Navigator menus={this.state.menuCourse} className="sidebar-item-name" />
                            </div>
                        </li>

                        <li className={this.state.check ? "sidebar-item" : "sidebar-item  d-none"}>
                            <div>
                                <i className="fas fa-book"></i>
                                <Navigator menus={this.state.menuSubject} className="sidebar-item-name" />
                            </div>
                        </li>

                        <li className={language === languages.VI ? "sidebar-item active-lang" : "sidebar-item"}>
                            <div onClick={() => this.handleChangeLanguage(languages.VI)}>
                                <i className="fas fa-globe"></i>
                                <FormattedMessage id="menu.vi" className="sidebar-item-name" />
                            </div>
                        </li>
                        <li className={language === languages.EN ? "sidebar-item active-lang" : "sidebar-item"}>
                            <div onClick={() => this.handleChangeLanguage(languages.EN)}>
                                <i className="fas fa-globe"></i>
                                <FormattedMessage id="menu.en" className="sidebar-item-name" />
                            </div>
                        </li>
                        <li className="sidebar-item">
                            <div>
                                <i className="fas fa-cog"></i>
                                <FormattedMessage id="menu.setting" className="sidebar-item-name" />
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="nav">
                    <div className="nav-left">
                        <div className="nav-search">
                            <input type="text" placeholder="Search ..." />
                        </div>
                    </div>
                    <div className="nav-right">

                        <div className="nav-notifi">
                            <div className="nav-notifi-item">
                                <img src={language === languages.VI ? vietnam : england} alt="" className="nav-notifi-item-image" />

                                <div className="nav-notifi-item-submenu">
                                    <div className="nav-notifi-item-submenu-item"
                                        onClick={() => this.handleChangeLanguage(languages.VI)}
                                    >
                                        <img src={vietnam} alt="" />
                                        <div>
                                            Viêt Nam
                                        </div>
                                    </div>
                                    <div className="nav-notifi-item-submenu-item"
                                        onClick={() => this.handleChangeLanguage(languages.EN)}
                                    >
                                        <img src={england} alt="" />
                                        <div>
                                            English
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nav-notifi-item">
                                <i className="far fa-envelope"></i>
                            </div>
                            <div className="nav-notifi-item">
                                <i className="far fa-bell"></i>
                            </div>
                        </div>
                        <div className="nav-profile">
                            <img src={imgBase64 ? imgBase64 : avatar} alt="" />
                            <div className="nav-profile-detail">
                                <div className="nav-profile-detail-item">
                                    <div>
                                        <div>{userInfo.firstName} {userInfo.lastName} </div>
                                        <br />
                                        Signed in as <br />
                                        <span>{userInfo.email}</span>
                                    </div>
                                </div>

                                <div className="nav-profile-detail-item">
                                    <i className="fas fa-user-circle"></i>
                                    Profile
                                </div>
                                <div className="nav-profile-detail-item">
                                    <i className="fas fa-cog"></i>
                                    Setting
                                </div>
                                <div className="nav-profile-detail-item">
                                    <i className="fas fa-comment-dots"></i>
                                    Status
                                </div>
                                <div onClick={processLogout} className="nav-profile-detail-item">
                                    <i className="fas fa-sign-out-alt"></i>
                                    Sign out
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

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
        console.log(this.state)

        return (

            <div className="header-container">
                <div className="sidebar-title">
                    <i className="fas fa-bars"></i>
                    <h3>CyberLearn</h3>
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
                            {/* <FormattedMessage id="menu.message" /> */}
                            <Navigator menus={this.state.menuCourse} className="sidebar-item-name" />
                        </div>
                    </li>

                    <li className={this.state.check ? "sidebar-item" : "sidebar-item  d-none"}>
                        <div>
                            <i className="fas fa-book"></i>
                            {/* <FormattedMessage id="menu.message" /> */}
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

                    <li className="sidebar-item sidebar-item-bottom">
                        <div className="sidebar-item-profile">
                            <img src={imgBase64 ? imgBase64 : avatar} alt="" />
                            <div className="sidebar-item-info">
                                <p>{userInfo.firstName} {userInfo.lastName} </p>
                                <span>{userInfo.email}</span>
                            </div>
                        </div>
                        <div onClick={processLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </li>
                </ul>


            </div>
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

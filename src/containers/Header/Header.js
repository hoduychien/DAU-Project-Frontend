import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { courseMenu } from './menuCourse';
import './Header.scss';
import { languages } from '../../utils'
import avatar from "../../assets/images/avatar-df.png";


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
        }
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
            <div className="header-container">
                <div className="sidebar-title">
                    <i className="fas fa-bars"></i>
                    <h3>CyberLearn</h3>
                </div>
                <ul className="sidebar">
                    {/* <li className="sidebar-item sidebar-search">
                        <input type="text" placeholder="Search ..." />
                    </li> */}

                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-home"></i>
                            <FormattedMessage id="menu.home" />
                        </div>

                    </li>
                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-users-cog"></i>
                            <Navigator menus={adminMenu} />
                        </div>
                    </li>

                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-bookmark"></i>
                            {/* <FormattedMessage id="menu.message" /> */}
                            <Navigator menus={courseMenu} />
                        </div>
                    </li>
                    <li className={language === languages.VI ? "sidebar-item active-lang" : "sidebar-item"}>
                        <div onClick={() => this.handleChangeLanguage(languages.VI)}>
                            <i className="fas fa-globe"></i>
                            <FormattedMessage id="menu.vi" />
                        </div>
                    </li>
                    <li className={language === languages.EN ? "sidebar-item active-lang" : "sidebar-item"}>
                        <div onClick={() => this.handleChangeLanguage(languages.EN)}>
                            <i className="fas fa-globe"></i>
                            <FormattedMessage id="menu.en" />
                        </div>
                    </li>
                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-cog"></i>
                            <FormattedMessage id="menu.setting" />
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { languages } from '../../utils'

class Header extends Component {


    handleChangeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    }
    render() {
        const { processLogout, language, userInfo } = this.props;

        console.log('check :', userInfo)
        return (
            <div className="header-container">
                <ul className="sidebar">
                    <div className="sidebar-title">
                        <i className="fas fa-bars"></i>
                        <h3>CyberLearn</h3>
                    </div>
                    <li className="sidebar-item sidebar-search">
                        <input type="text" placeholder="Search ..." />
                    </li>

                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-home"></i>
                            <Navigator menus={adminMenu} />
                        </div>
                    </li>
                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-users-cog"></i>
                            <FormattedMessage id="menu.system.header" />
                        </div>
                    </li>

                    <li className="sidebar-item">
                        <div>
                            <i className="fab fa-facebook-messenger"></i>
                            <FormattedMessage id="menu.message" />
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
                            <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
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

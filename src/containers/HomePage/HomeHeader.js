import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import './homeHeader.scss';
import heroBanner from '../../assets/images/Hero.png';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
// import avatar from '../../assets/images/avatar.png'

class HomeHeader extends Component {


    changeLanguage = (lang) => {
        this.props.changeLanguageRedux(lang);
    }


    render() {
        console.log("check", this.props.isLoggedIn)
        const { processLogout, isLoggedIn, userInfo } = this.props;
        return (
            <React.Fragment>
                <div className="home-header">
                    <div className="home-header-main">
                        <div className="home-header-logo">
                            <span>LOGO</span>
                        </div>

                        <ul className="header-menu">
                            <li className="header-menu-item">
                                <a href="#!" className="header-menu-link">
                                    <FormattedMessage id="home-header.home" />
                                </a>
                            </li>
                            <li className="header-menu-item">
                                <a href="#course" className="header-menu-link">
                                    <FormattedMessage id="home-header.course" />
                                </a>
                            </li>
                            <li className="header-menu-item">
                                <a href="#subjects" className="header-menu-link">
                                    <FormattedMessage id="home-header.subjects" />
                                </a>
                            </li>
                            <li className="header-menu-item">
                                <a href="#lecturers" className="header-menu-link">
                                    <FormattedMessage id="home-header.lecturers" />
                                </a>
                            </li>
                            <li className="header-menu-item">
                                <a href="#!" className="header-menu-link header-menu-parent">
                                    <FormattedMessage id="home-header.lang" />
                                    <i className="fas fa-chevron-down"></i>

                                    <div className="header-menu-child">
                                        <div className="header-menu-child-item">
                                            <span onClick={() => this.changeLanguage(languages.VI)}>Vietnamese (VN)</span>
                                        </div>
                                        <div className="header-menu-child-item">
                                            <span onClick={() => this.changeLanguage(languages.EN)}>English (EN)</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>

                        <div className={isLoggedIn === true ? "header-auth d-none" : "header-auth"}>
                            <div className="header-action">
                                <a href="http://localhost:3000/register" target="_blank" className="button button--hover" rel="noreferrer">
                                    <FormattedMessage id="home-header.register" />
                                </a>
                            </div>

                            <div className="header-action">
                                <a href="http://localhost:3000/login" target="_blank" className="button button--primary" rel="noreferrer">
                                    <FormattedMessage id="home-header.login" />
                                </a>
                            </div>
                        </div>

                        <div className={isLoggedIn === false ? "header-user-info d-none" : "header-user-info"}>
                            {/* <img src={avatar} alt="" /> */}
                            Welcome {userInfo && userInfo.firstName ? userInfo.firstName : ''} {userInfo && userInfo.lastName ? userInfo.lastName : ''} !
                            <div className="header-user">

                                <div className="header-item">
                                    <div>
                                        <i className="fas fa-user"></i>
                                        <FormattedMessage id="home-header.user" />
                                    </div>
                                </div>

                                <div className="header-item">
                                    <div>
                                        <i className="fas fa-sun"></i>
                                        <FormattedMessage id="home-header.light-mode" />
                                    </div>
                                    <i className="fas fa-chevron-right"></i>

                                </div>
                                <div className="header-item">
                                    <div>
                                        <i className="fas fa-language"></i>
                                        <FormattedMessage id="home-header.lang" />
                                    </div>
                                    <i className="fas fa-chevron-right"></i>
                                </div>

                                <div className="header-item">
                                    <div>
                                        <i className="fas fa-cog"></i>
                                        <FormattedMessage id="menu.setting" />
                                    </div>
                                </div>

                                <div onClick={processLogout} className="header-item">
                                    <div>
                                        <i className="fas fa-sign-out-alt"></i>
                                        <FormattedMessage id="home-header.logout" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home-hero">
                    <div className="home-hero-content">
                        <div className="home-hero-title">
                            <FormattedMessage id="home-header.title" />
                        </div>
                        <div className="home-hero-heading">
                            <FormattedMessage id="home-header.heading" />
                        </div>
                        <div className="home-hero-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio elementum tortor facilisi tristique viverra ullamcorper odio mi tincidunt.
                        </div>
                        <div className="home-hero-search">
                            <input type="text" placeholder="Tìm kiếm mọi thứ tại đây..." />
                            <div className="home-hero-search-btn">
                                <FormattedMessage id="home-header.search" />
                            </div>
                        </div>
                        <div className="home-hero-tag">
                            <div className="home-hero-tag-item">
                                <i className="fas fa-check-circle"></i>
                                Sign up for free
                            </div>
                            <div className="home-hero-tag-item">
                                <i className="fas fa-check-circle"></i>
                                Great Service
                            </div>
                        </div>
                    </div>
                    <div className="home-hero-banner">
                        <img src={heroBanner} alt="" />
                    </div>
                </div>

                <div className="home-slide">

                </div>
            </React.Fragment >
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
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);

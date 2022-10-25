import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import './homeHeader.scss';
import heroBanner from '../../assets/images/Hero.png';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router'
import avatar from "../../assets/images/avatar-df.png";


class HomeHeader extends Component {
    changeLanguage = (lang) => {
        this.props.changeLanguageRedux(lang);
    }

    handleBackHome = () => {
        this.props.history.push(`/`);
        window.scrollTo(0, 0)
    }

    render() {
        const { processLogout, isLoggedIn, userInfo, language } = this.props;
        let imgBase64 = ''
        if (isLoggedIn) {
            const userAvatar = userInfo.avatar;
            if (userAvatar) {
                imgBase64 = new Buffer(userInfo.avatar, 'base64').toString('binary')
            }
        }
        else {
            imgBase64 = avatar
        }
        return (
            <React.Fragment>
                <div className="home-header">
                    <div className="home-header-main">
                        <div className="home-header-logo">
                            <span onClick={() => this.handleBackHome()}>
                                CyberLearn
                            </span>
                        </div>

                        <ul className="header-menu">
                            <li className="header-menu-item">
                                <div className="header-menu-link">
                                    <FormattedMessage id="home-header.home" />
                                </div>
                            </li>
                            <li className="header-menu-item">
                                <div className="header-menu-link">
                                    <FormattedMessage id="home-header.course" />
                                </div>
                            </li>

                            <li className="header-menu-item">
                                <div className="header-menu-link">
                                    <FormattedMessage id="home-header.lecturers" />
                                </div>
                            </li>
                            <li className="header-menu-item">
                                <div className="header-menu-link">
                                    <FormattedMessage id="home-header.subjects" />
                                </div>
                            </li>
                            <li className="header-menu-item">
                                <div className="header-menu-link header-menu-parent">
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
                                </div>
                            </li>
                        </ul>

                        <div className={isLoggedIn === true ? "header-auth d-none" : "header-auth"}>
                            <div className="header-action">
                                <a href="http://localhost:3000/register" className="button button--hover" rel="noreferrer">
                                    <FormattedMessage id="home-header.register" />
                                </a>
                            </div>

                            <div className="header-action">
                                <a href="http://localhost:3000/login" className={language === languages.VI ? "button button--primary" : "button button--long"} rel="noreferrer">
                                    <FormattedMessage id="home-header.login" />
                                </a>
                            </div>
                        </div>


                        <div className={isLoggedIn === false ? "nav-profile d-none" : "nav-profile"}>




                            <div className="nav-user">
                                <div>{userInfo && userInfo.firstName ? userInfo.firstName : ''}  {userInfo && userInfo.lastName ? userInfo.lastName : ''}  </div>
                                <img src={imgBase64 ? imgBase64 : avatar} alt="" />
                            </div>


                            <div className="nav-profile-detail">
                                <div className="nav-profile-detail-item">
                                    <div>
                                        <div>{userInfo && userInfo.firstName ? userInfo.firstName : ''}  {userInfo && userInfo.lastName ? userInfo.lastName : ''}  </div>
                                        <br />
                                        Signed in as <br />
                                        <span>{userInfo && userInfo.email ? userInfo.email : ''} </span>
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
                                <div className={userInfo && userInfo.roleId === 'R3' ? "nav-profile-detail-item d-none" : "nav-profile-detail-item "}>
                                    <i className="fab fa-windows"></i>
                                    <a href="/system/user-manage-redux" target="_blank">Dashboard</a>
                                </div>
                                <div onClick={processLogout} className="nav-profile-detail-item">
                                    <i className="fas fa-sign-out-alt"></i>
                                    Sign out
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {
                    this.props.showHero === true &&
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
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));

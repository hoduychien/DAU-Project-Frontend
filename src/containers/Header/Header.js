import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {

    render() {
        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div> */}



                <ul className="sidebar">
                    <div className="sidebar-title">
                        <i className="fas fa-bars"></i>
                        <h3>CyberLearn</h3>
                    </div>

                    <li className="sidebar-item sidebar-search">
                        {/* <i className="fas fa-search"></i> */}
                        <input type="text" placeholder="Search ..." />
                    </li>

                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-home"></i>
                            Dashboard
                        </div>
                    </li>
                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-users-cog"></i>
                            Systems
                        </div>
                    </li>

                    <li className="sidebar-item">
                        <div>
                            <i className="fab fa-facebook-messenger"></i>
                            Messenger
                        </div>
                    </li>
                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-folder"></i>
                            Project
                        </div>
                    </li>

                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-chart-pie"></i>
                            Analysis
                        </div>
                    </li>
                    <li className="sidebar-item">
                        <div>
                            <i className="fas fa-cog"></i>
                            Settings
                        </div>
                    </li>

                    <li className="sidebar-item sidebar-item-bottom">
                        <div className="sidebar-item-profile">
                            <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                            <div className="sidebar-item-info">
                                <p>Chien Duy</p>
                                <span>admin@gmail.com</span>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

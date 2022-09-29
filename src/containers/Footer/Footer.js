import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';
import facebook from '../../assets/course/facebook.png';

class HomePage extends Component {

    render() {
        return (
            <div>
                <div className="footer" id="footer">
                    <div className="footer-main">
                        <div className="footer-column">
                            <div className="footer-logo">
                                Logo
                            </div>
                            <div className="footer-line">
                                © 2022, ChienDuy. All Right Reserved
                            </div>
                            <div className="footer-line">
                                Follow Us - Fb. / Tw. / Inst.
                            </div>
                        </div>
                    </div>
                </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

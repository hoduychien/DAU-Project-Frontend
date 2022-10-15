import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';
import facebook from '../../assets/course/facebook.png';

class HomePage extends Component {

    render() {
        return (
            <div>
                <footer>
                    <ul class="icons">
                        <li>
                            <div>
                                <ion-icon name="logo-whatsapp"></ion-icon>
                            </div>
                        </li>
                        <li>
                            <div>
                                <ion-icon name="logo-linkedin"></ion-icon>
                            </div>
                        </li>
                        <li>
                            <div>
                                <ion-icon name="logo-facebook"></ion-icon>
                            </div>
                        </li>
                        <li>
                            <div>
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </li>
                    </ul>
                    <ul class="menu">
                        <li>
                            <div>Home</div>
                        </li>
                        <li>
                            <div>About</div>
                        </li>
                        <li>
                            <div>Partners</div>
                        </li>
                        <li>
                            <div>Specialties</div>
                        </li>
                        <li>
                            <div>Contact Us</div>
                        </li>
                    </ul>
                    <div class="footer-copyright">
                        <p>Copyright @ 2022 All Rights Reserved.</p>
                    </div>
                </footer>
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

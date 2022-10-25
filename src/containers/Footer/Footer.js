import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';

class HomePage extends Component {

    render() {
        return (
            <div>
                <footer className="site-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h6>About</h6>
                                <p className="text-justify">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam iste qui aliquam. Magnam tempora optio accusamus, animi deserunt tenetur modi fugit quae consequuntur provident iste sunt ad, totam culpa soluta praesentium ipsa ratione molestiae quam eaque quis, laborum expedita aperiam at? Inventore iure illum neque illo, cum mollitia ad pariatur?
                                </p>
                            </div>

                            <div className="col-xs-6 col-md-3">
                                <h6>Categories</h6>
                                <ul className="footer-links">
                                    <li><a href="#!">C/C++</a></li>
                                    <li><a href="#!">Python</a></li>
                                    <li><a href="#!">PHP</a></li>
                                    <li><a href="#!">Java</a></li>
                                    <li><a href="#!">Android</a></li>
                                    <li><a href="#!">HTML/CSS</a></li>
                                </ul>
                            </div>

                            <div className="col-xs-6 col-md-3">
                                <h6>Quick Links</h6>
                                <ul className="footer-links">
                                    <li><a href="#!">About Us</a></li>
                                    <li><a href="#!">Contact Us</a></li>
                                    <li><a href="#!">Contribute</a></li>
                                    <li><a href="#!">Privacy Policy</a></li>
                                    <li><a href="#!">Sitemap</a></li>
                                </ul>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-6 col-xs-12">
                                <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by
                                    <a href="#!"> CyberLearn</a>.
                                </p>
                            </div>

                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <ul className="social-icons">
                                    <li><a className="facebook" href="#!"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a className="twitter" href="#!"><i className="fab fa-twitter"></i></a></li>
                                    <li><a className="dribbble" href="#!"><i className="fab fa-dribbble"></i></a></li>
                                    <li><a className="linkedin" href="#!"><i className="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
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

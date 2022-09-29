import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Lecturers.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import lecturer_1 from "../../../assets/course/lecturer-1.png";
import lecturer_2 from "../../../assets/course/lecturer-2.png";
import lecturer_3 from "../../../assets/course/lecturer-3.png";
import facebook from '../../../assets/course/facebook.png';
import mail from '../../../assets/course/mail.png';
import twitter from '../../../assets/course/twitter.png';
import instagram from '../../../assets/course/instagram.png';


class Lecturers extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        };
        return (
            <section className="section" id="lecturers">
                <div className="lecturers-content">
                    <div className="section-heading">
                        <div className="section-title">
                            <FormattedMessage id="home-header.lecturers" />
                        </div>
                        <p className="section-desc">
                            <FormattedMessage id="home-header.desc-5" />
                        </p>
                    </div>
                    <div className="lecturers-list">
                        <Slider {...settings}>
                            <div className="lecturers-item">
                                <img src={lecturer_1} alt="" />
                                <div className="lecturers-item-info">
                                    <span className="lecturers-item-title">Phạm Huy Hoàng</span>
                                    <p className="lecturers-item-text">Chuyên môn: Java, NodeJs, ReactJs ...</p>
                                    <p className="lecturers-item-desc">Kinh nghiệm 8 năm trong ngành Công nghệ thông tin</p>
                                    <div className="lecturers-item-social">
                                        <img src={facebook} alt="" />
                                        <img src={mail} alt="" />
                                        <img src={twitter} alt="" />
                                        <img src={instagram} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="lecturers-item">
                                <img src={lecturer_2} alt="" />
                                <div className="lecturers-item-info">
                                    <span className="lecturers-item-title">Phạm Huy Hoàng</span>
                                    <p className="lecturers-item-text">Chuyên môn: Java, NodeJs, ReactJs ...</p>
                                    <p className="lecturers-item-desc">Kinh nghiệm 8 năm trong ngành Công nghệ thông tin</p>
                                    <div className="lecturers-item-social">
                                        <img src={facebook} alt="" />
                                        <img src={mail} alt="" />
                                        <img src={twitter} alt="" />
                                        <img src={instagram} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="lecturers-item">
                                <img src={lecturer_3} alt="" />
                                <div className="lecturers-item-info">
                                    <span className="lecturers-item-title">Phạm Huy Hoàng</span>
                                    <p className="lecturers-item-text">Chuyên môn: Java, NodeJs, ReactJs ...</p>
                                    <p className="lecturers-item-desc">Kinh nghiệm 8 năm trong ngành Công nghệ thông tin</p>
                                    <div className="lecturers-item-social">
                                        <img src={facebook} alt="" />
                                        <img src={mail} alt="" />
                                        <img src={twitter} alt="" />
                                        <img src={instagram} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="lecturers-item">
                                <img src={lecturer_1} alt="" />
                                <div className="lecturers-item-info">
                                    <span className="lecturers-item-title">Phạm Huy Hoàng</span>
                                    <p className="lecturers-item-text">Chuyên môn: Java, NodeJs, ReactJs ...</p>
                                    <p className="lecturers-item-desc">Kinh nghiệm 8 năm trong ngành Công nghệ thông tin</p>
                                    <div className="lecturers-item-social">
                                        <img src={facebook} alt="" />
                                        <img src={mail} alt="" />
                                        <img src={twitter} alt="" />
                                        <img src={instagram} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="lecturers-item">
                                <img src={lecturer_2} alt="" />
                                <div className="lecturers-item-info">
                                    <span className="lecturers-item-title">Phạm Huy Hoàng</span>
                                    <p className="lecturers-item-text">Chuyên môn: Java, NodeJs, ReactJs ...</p>
                                    <p className="lecturers-item-desc">Kinh nghiệm 8 năm trong ngành Công nghệ thông tin</p>
                                    <div className="lecturers-item-social">
                                        <img src={facebook} alt="" />
                                        <img src={mail} alt="" />
                                        <img src={twitter} alt="" />
                                        <img src={instagram} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="lecturers-item">
                                <img src={lecturer_3} alt="" />
                                <div className="lecturers-item-info">
                                    <span className="lecturers-item-title">Phạm Huy Hoàng</span>
                                    <p className="lecturers-item-text">Chuyên môn: Java, NodeJs, ReactJs ...</p>
                                    <p className="lecturers-item-desc">Kinh nghiệm 8 năm trong ngành Công nghệ thông tin</p>
                                    <div className="lecturers-item-social">
                                        <img src={facebook} alt="" />
                                        <img src={mail} alt="" />
                                        <img src={twitter} alt="" />
                                        <img src={instagram} alt="" />
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    {/* <div className="section-more">
                        Xem Thêm
                        <i className="fas fa-arrow-right"></i>
                    </div> */}
                </div>
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Lecturers);

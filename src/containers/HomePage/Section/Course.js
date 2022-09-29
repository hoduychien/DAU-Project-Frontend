import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Course.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import courseImages from "../../../assets/course/course.png";
import courseImages2 from "../../../assets/course/course-2.png";
import courseImages3 from "../../../assets/course/course-3.png";
import courseImages4 from "../../../assets/course/course-4.png";
import courseImages5 from "../../../assets/course/course-5.png";
import courseImages6 from "../../../assets/course/course-6.png";
import bannerCourse from "../../../assets/images/banner-1.png";


class Course extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        };
        return (
            <section className="section" id="course">
                <div className="course-content">
                    <div className="section-heading">
                        <div className="section-title">
                            <FormattedMessage id="home-header.course" />
                        </div>
                        <p className="section-desc">
                            <FormattedMessage id="home-header.desc-1" />
                        </p>
                    </div>
                    <div className="course-list">
                        <Slider {...settings}>
                            <div className="course-item">
                                <img src={courseImages} alt="" />
                                <div className="course-item-info">
                                    <div className="course-item-vote">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="course-item-title">Kiến thức cơ sở</span>
                                    <p className="course-item-desc">Làm quên với máy tính và kiến thức cơ bản về ngành công nghê thông tin</p>
                                    <div className="course-item-more">
                                        <FormattedMessage id="home-header.see-more" />
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>

                            </div>
                            <div className="course-item">
                                <img src={courseImages2} alt="" />
                                <div className="course-item-info">
                                    <div className="course-item-vote">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="course-item-title">Lập trình cơ sở</span>
                                    <p className="course-item-desc">Làm quên với máy tính và kiến thức cơ bản về ngành công nghê thông tin</p>
                                    <div className="course-item-more">
                                        <FormattedMessage id="home-header.see-more" />
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="course-item">
                                <img src={courseImages3} alt="" />
                                <div className="course-item-info">
                                    <div className="course-item-vote">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="course-item-title">Lập trình nâng cao</span>
                                    <p className="course-item-desc">Làm quên với máy tính và kiến thức cơ bản về ngành công nghê thông tin</p>
                                    <div className="course-item-more">
                                        <FormattedMessage id="home-header.see-more" />
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="course-item">
                                <img src={courseImages4} alt="" />
                                <div className="course-item-info">
                                    <div className="course-item-vote">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="course-item-title">Web Developer</span>
                                    <p className="course-item-desc">Làm quên với máy tính và kiến thức cơ bản về ngành công nghê thông tin</p>
                                    <div className="course-item-more">
                                        <FormattedMessage id="home-header.see-more" />
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="course-item">
                                <img src={courseImages5} alt="" />
                                <div className="course-item-info">
                                    <div className="course-item-vote">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="course-item-title">Mobile Developer</span>
                                    <p className="course-item-desc">Làm quên với máy tính và kiến thức cơ bản về ngành công nghê thông tin</p>
                                    <div className="course-item-more">
                                        <FormattedMessage id="home-header.see-more" />
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="course-item">
                                <img src={courseImages6} alt="" />
                                <div className="course-item-info">
                                    <div className="course-item-vote">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="course-item-title">Data Analysis</span>
                                    <p className="course-item-desc">Làm quên với máy tính và kiến thức cơ bản về ngành công nghê thông tin</p>
                                    <div className="course-item-more">
                                        <FormattedMessage id="home-header.see-more" />
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>

                <div className="course-post">
                    <div className="course-post-left">
                        <div className="course-post-heading">
                            <FormattedMessage id="home-header.desc-2" />

                        </div>
                        <div className="course-post-desc">
                            <FormattedMessage id="home-header.desc-3" />
                        </div>
                        <div className="course-post-desc">
                            <FormattedMessage id="home-header.desc-4" />
                        </div>

                        <div className="button button--primary">
                            <FormattedMessage id="home-header.see-more" />
                        </div>

                    </div>

                    <div className="course-post-right">
                        <img src={bannerCourse} alt="" />
                    </div>
                </div>
            </section>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);

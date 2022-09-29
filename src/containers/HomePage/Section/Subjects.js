import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Subjects.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import htmlCss from "../../../assets/course/html-css.jpg";
import frontend from "../../../assets/course/front-end.jpg";
import python from "../../../assets/course/python.jpg";
import backend from "../../../assets/course/backend.png";


class Subjects extends Component {

    render() {
        let settings = {
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 3,
            slidesToScroll: 1,
        };
        return (
            <section className="section" id="subjects">
                <div className="subjects-content">
                    <div className="section-heading">
                        <div className="section-title">
                            <FormattedMessage id="home-header.subjects" />
                        </div>
                        <p className="section-desc">
                            <FormattedMessage id="home-header.desc-1" />
                        </p>
                    </div>
                    <div className="subjects-list">
                        <Slider {...settings}>
                            <div className="subjects-item">
                                <img src={python} alt="" />
                                <div className="subjects-item-info">
                                    <div className="subjects-item-vote">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="subjects-item-title">Lập Trình Python Căn Bản</span>
                                    <p className="subjects-item-desc">Làm quên với máy tính và kiến thức cơ bản về ngành công nghê thông tin</p>
                                    <div className="subjects-item-more">
                                        <FormattedMessage id="home-header.see-more" />
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>

                            </div>
                            <div className="subjects-item">
                                <img src={frontend} alt="" />
                                <div className="subjects-item-info">
                                    <div className="subjects-item-vote">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="subjects-item-title">Lập Trình FRONT-END Chuyên Nghiệp</span>
                                    <p className="subjects-item-desc">Làm quên với máy tính và kiến thức cơ bản về ngành công nghê thông tin</p>
                                    <div className="subjects-item-more">
                                        <FormattedMessage id="home-header.see-more" />
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="subjects-item">
                                <img src={backend} alt="" />
                                <div className="subjects-item-info">
                                    <div className="subjects-item-vote">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="subjects-item-title">Lập trình BACK-END chuyên nghiệp</span>
                                    <p className="subjects-item-desc">Làm quên với máy tính và kiến thức cơ bản về ngành công nghê thông tin</p>
                                    <div className="subjects-item-more">
                                        <FormattedMessage id="home-header.see-more" />
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="subjects-item">
                                <img src={htmlCss} alt="" />
                                <div className="subjects-item-info">
                                    <div className="subjects-item-vote">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="subjects-item-title">Khoá Học HTML/CSS Cơ Bản</span>
                                    <p className="subjects-item-desc">Làm quên với máy tính và kiến thức cơ bản về ngành công nghê thông tin</p>
                                    <div className="subjects-item-more">
                                        <FormattedMessage id="home-header.see-more" />
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>

                <div className="button button--secondary">
                    <FormattedMessage id="home-header.see-more" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);

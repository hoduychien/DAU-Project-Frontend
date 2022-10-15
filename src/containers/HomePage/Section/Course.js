import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Course.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as actions from "../../../store/actions"



class Course extends Component {

    constructor(props) {
        super(props)
        this.state = {
            courseArr: []
        }
    }

    componentDidMount() {
        this.props.loadCourses();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.courseData !== this.props.courseData) {
            this.setState({
                courseArr: this.props.courseData
            })
        }
    }

    render() {
        let courses = this.state.courseArr;


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
                            {
                                courses && courses.length > 0 && courses.map((item, index) => {
                                    let imgBase64 = ''
                                    if (item.image) {
                                        imgBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }

                                    return (
                                        <div className="course-item">
                                            <img src={imgBase64} alt="" />
                                            <div className="course-item-info">
                                                <div className="course-item-vote">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                </div>
                                                <span className="course-item-title">
                                                    {item.name}
                                                </span>
                                                <p className="course-item-desc">
                                                    {item.desc}
                                                </p>
                                                <div className="course-item-more">
                                                    <FormattedMessage id="home-header.see-more" />
                                                    <i className="fas fa-arrow-right"></i>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }



                        </Slider>
                    </div>
                </div>


            </section>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        courseData: state.admin.courses,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCourses: () => dispatch(actions.fetchAllCourseStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);

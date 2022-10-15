import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Subjects.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router'

import bannerCourse from "../../../assets/images/banner-1.png";

class Subjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjectArr: []
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.loadSubject();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.subjectData !== this.props.subjectData) {
            this.setState({
                subjectArr: this.props.subjectData
            })
        }
    }

    handleDetailSubject = (subject) => {
        this.props.history.push(`/detail-subjects/${subject.id}`)
    }


    render() {
        let subjects = this.state.subjectArr;

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

                            {
                                subjects && subjects.length > 0 && subjects.map((item, index) => {
                                    let imgBase64 = ''
                                    if (item.image) {
                                        imgBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }

                                    return (
                                        <div className="subjects-item">
                                            <div onClick={() => this.handleDetailSubject(item)}>
                                                <img src={imgBase64} alt="" />
                                            </div>
                                            <div className="subjects-item-info">
                                                <div className="subjects-item-vote">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                </div>
                                                <span className="subjects-item-title">
                                                    {item.name}
                                                </span>
                                                <p className="subjects-item-desc">
                                                    {item.desc}
                                                </p>
                                                <p className="subjects-item-descs">
                                                    {item.location}
                                                </p>
                                                <div className="subjects-item-more" onClick={() => this.handleDetailSubject(item)}>
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
                </div>
            </section>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        subjectData: state.admin.subjectData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadSubject: () => dispatch(actions.fetchAllSubjectStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subjects));

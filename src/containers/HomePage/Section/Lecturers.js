import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Lecturers.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import facebook from '../../../assets/course/facebook.png';
import mail from '../../../assets/course/mail.png';
import twitter from '../../../assets/course/twitter.png';
import instagram from '../../../assets/course/instagram.png';

import { languages } from '../../../utils'

import * as actions from "../../../store/actions"


class Lecturers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lecturersArr: []
        }
    }


    componentDidMount() {
        this.props.loadLecturer();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lecturerData !== this.props.lecturerData) {
            this.setState({
                lecturersArr: this.props.lecturerData
            })
        }
    }

    render() {
        let lectures = this.state.lecturersArr;
        let { language } = this.props;

        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
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

                            {
                                lectures && lectures.length > 0 && lectures.map((item, index) => {
                                    let imgBase64 = ''
                                    if (item.avatar) {
                                        imgBase64 = new Buffer(item.avatar, 'base64').toString('binary')
                                    }

                                    return (
                                        <div className="lecturers-item">
                                            <img src={imgBase64} alt="" />
                                            <div className="lecturers-item-info">
                                                <span className="lecturers-item-title">
                                                    {item.firstName} {item.lastName}
                                                </span>
                                                <p className="lecturers-item-text">
                                                    Chức vụ : {language === languages.VI ? item.positionData.vi : item.positionData.en}
                                                </p>
                                                <p className="lecturers-items">Chuyên môn: Java, NodeJs, ReactJs ...</p>
                                                <p className="lecturers-item-desc">{item.desc}</p>
                                                <div className="lecturers-item-social">
                                                    <img src={facebook} alt="" />
                                                    <img src={mail} alt="" />
                                                    <img src={twitter} alt="" />
                                                    <img src={instagram} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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
        lecturerData: state.admin.lecturerData,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadLecturer: () => dispatch(actions.fetchAllLecturers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lecturers);

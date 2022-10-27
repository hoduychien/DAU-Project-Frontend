import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import banner from '../../../assets/images/banner.png';
import "./DetailSubject.scss";
import Footer from '../../Footer/Footer';
import * as actions from '../../../store/actions';
import SubjectSchedule from '../../Student/Subject/SubjectSchedule'
import SubjectExtraInfo from '../../Student/Subject/SubjectExtraInfo'

class DetailSubject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subjectData: {}
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.loadDetailSubject(this.props.match.params.id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailSubjectData !== this.props.detailSubjectData) {
            this.setState({
                subjectData: this.props.detailSubjectData
            })
        }
    }

    render() {
        let subjectDetail = this.state.subjectData;
        console.log("đang tìm", subjectDetail)
        let imgBase64 = ''
        if (subjectDetail.image) {
            imgBase64 = new Buffer(subjectDetail.image, 'base64').toString('binary')
        }
        return (
            <React.Fragment>
                <HomeHeader showHero={false} />

                <div className="subject-details">
                    <div className="subject-banner">
                        <img src={imgBase64} alt="" />
                        <div className="subject-info">
                            <div className="subject-name">
                                {subjectDetail.name}
                            </div>
                            {subjectDetail && subjectDetail.Markdown && subjectDetail.Markdown.contentCode
                                &&
                                <div className="subject-descs">
                                    {subjectDetail.Markdown.desc}
                                </div>
                            }
                            <div>
                                {subjectDetail.desc}
                            </div>
                            <div className="subject-vote">
                                <div>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                </div>
                                <p>Đánh giá (1000+)</p>
                            </div>

                            <div className="subject-location">
                                <i className="fas fa-map-marker-alt"></i>
                                {subjectDetail.location}
                            </div>

                            <div className="subject-actions">
                                <div className="subject-action subject-action-like">
                                    Like
                                </div>
                                <div className="subject-action subject-action-share">
                                    Share
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="subject-schedule">
                    <div className="schedule-title">
                        <div className="schedule-titles">
                            Đăng ký lớp {subjectDetail.name}
                        </div>
                    </div>
                    <div className="line-1"></div>

                    <div className="schedule-main">



                        <div className="schedule-left">

                            <SubjectSchedule
                                subjectId={subjectDetail && subjectDetail.id ? subjectDetail.id : -1}
                            />

                        </div>
                        <div className="schedule-time">
                            <p>Thông tin</p>
                        </div>
                        <div className="schedule-right">

                            <SubjectExtraInfo
                                subjectId={subjectDetail && subjectDetail.id ? subjectDetail.id : -1}
                            />

                        </div>
                    </div>

                </div>

                <div className="subject-post">
                    {subjectDetail && subjectDetail.Markdown && subjectDetail.Markdown.contentCode
                        &&
                        <div
                            dangerouslySetInnerHTML={{ __html: subjectDetail.Markdown.contentCode }}
                        >

                        </div>
                    }
                </div>

                <Footer />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        detailSubjectData: state.admin.detailSubjectData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDetailSubject: (id) => dispatch(actions.fetchSubjectDetailStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSubject);

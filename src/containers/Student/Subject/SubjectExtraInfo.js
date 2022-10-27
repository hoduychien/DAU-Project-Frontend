import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import "./SubjectExtraInfo.scss";
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils';
import { getExtraInfoSchedule } from '../../../services/subjectService'

class SubjectExtraInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            extraInfo: {},
        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.subjectId !== prevProps.subjectId) {
            let res = await getExtraInfoSchedule(this.props.subjectId);
            if (res && res.errorCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }

        }
    }
    render() {
        let { extraInfo } = this.state
        let { language } = this.props
        console.log(extraInfo)

        let currency
        if (extraInfo && extraInfo.priceTypeData) {
            if (language === languages.VI) {
                currency = new Intl.NumberFormat(
                    'vi-VN', { style: 'currency', currency: 'VND' }
                ).format(extraInfo.priceTypeData.vi);
            } else {
                currency = new Intl.NumberFormat(
                    'en-US', { style: 'currency', currency: 'USD' }
                ).format(extraInfo.priceTypeData.en);
            }
        }


        return (
            <React.Fragment>

                <div className="schedule-info-item">
                    <div className="schedule-location">
                        <span> <FormattedMessage id={"modal.address"} /> :</span>  {extraInfo && extraInfo.address ? extraInfo.address : ''}
                    </div>
                    <div className="schedule-location">
                        <span><FormattedMessage id={"modal.time"} /> :</span>

                        {extraInfo && extraInfo.studyTimeTypeData && language === languages.VI
                            &&
                            extraInfo.studyTimeTypeData.vi
                        }
                        {extraInfo && extraInfo.studyTimeTypeData && language === languages.EN
                            &&
                            extraInfo.studyTimeTypeData.en
                        }

                    </div>
                    <div className="schedule-location">
                        <span><FormattedMessage id={"modal.tuition"} /> :</span> {currency}
                    </div>
                    <div className="schedule-location">
                        {extraInfo && extraInfo.note ? extraInfo.note : ''}
                    </div>
                </div>
                <div className="schedule-info-item">
                    <div className="schedule-location">
                        <span>Hotline</span>: <span className="blue-span">+84 762 766 682</span>
                    </div>
                    <div className="schedule-location">
                        <span>Email</span>: <span className="blue-span">chienhoo20@gmail.com</span>
                    </div>
                    <div className="schedule-location">
                        <span><FormattedMessage id={"modal.payment"} /> :</span>
                    </div>
                    {language === languages.EN &&
                        <ul>
                            <li>Cash</li>
                            <li>Credit Card</li>
                            <li>All Payment</li>
                        </ul>
                    }

                    {language === languages.VI &&
                        <ul>
                            <li>Tiền mặt</li>
                            <li>Thẻ tính dụng</li>
                            <li>Áp dụng tất cá</li>
                        </ul>
                    }
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        detailSubjectData: state.admin.detailSubjectData,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDetailSubject: (id) => dispatch(actions.fetchSubjectDetailStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectExtraInfo);

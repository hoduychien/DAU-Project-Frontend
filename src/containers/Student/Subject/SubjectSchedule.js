import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import "./SubjectSchedule.scss";
import moment from 'moment';
import localization from 'moment/locale/vi';
import { languages } from '../../../utils';
import { getScheduleByMonth } from '../../../services/subjectService'

class SubjectSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checkOpen: false,
            arrMonth: [],
            subjectSchedule: []
        }
    }

    async componentDidMount() {
        setTimeout(() => {
            this.getAllMonth();
        }, 100)
    }

    getAllMonth = async () => {
        let arrDate = []
        for (let i = 0; i < 5; i++) {
            let object = {}
            object.label = moment(new Date()).add(i, 'months').format('MM - YYYY');
            object.value = moment(new Date()).add(i, 'months').format('MM/YYYY');
            arrDate.push(object);
        }
        if (this.props.subjectId && this.props.subjectId !== -1) {
            let id = this.props.subjectId;
            let res = await getScheduleByMonth(id, moment(new Date()).format('MM/YYYY'));
            if (res && res.errorCode === 0) {
                this.setState({
                    subjectSchedule: res.data ? res.data : []
                })
            }
        }

        this.setState({
            arrMonth: arrDate
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleChangeSelect = async (event) => {
        if (this.props.subjectId && this.props.subjectId !== -1) {
            let id = this.props.subjectId;
            let month = event.target.value;
            let res = await getScheduleByMonth(id, month);


            if (res && res.errorCode === 0) {
                this.setState({
                    subjectSchedule: res.data ? res.data : []
                })
            }
            console.log(res);
        }
    }

    render() {
        let { arrMonth, subjectSchedule } = this.state;
        let { language } = this.props;
        return (
            <React.Fragment>
                <div className="schedule-item">
                    <div className="schedule-time">
                        <div className="schedule-time-select">
                            <select onChange={(event) => this.handleChangeSelect(event)}>
                                {arrMonth && arrMonth.length > 0 &&
                                    arrMonth.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>
                                                Lịch khai giảng tháng {item.label}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                    </div>

                </div>


                <div className="space-50"></div>

                {subjectSchedule && subjectSchedule.length > 0 ?
                    subjectSchedule.map((item, index) => {
                        let time = (language === languages.VI ? item.timeTypeData.vi : item.timeTypeData.en)
                        return (
                            <div className="schedule-item">
                                <div>{time}</div>
                                <div className="line"></div>
                                <div key={index} className="button button--long">
                                    Đăng ký
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="schedule-item">
                        <div className="schedule-item-notification">
                            <span>Chưa có lịch khai giảng trong tháng này !</span>
                        </div>
                    </div>
                }




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

export default connect(mapStateToProps, mapDispatchToProps)(SubjectSchedule);

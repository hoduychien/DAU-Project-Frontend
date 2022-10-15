import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../Header/Header';
import './SubjectSchedule.scss'
import Select from 'react-select';
import *  as actions from "../../../store/actions"
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { languages, dateFormat } from '../../../utils';
import Swal from 'sweetalert2';
import _ from 'lodash';
import { saveSubjectSchedule } from '../../../services/subjectService';



class SubjectSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subjectArr: [],
            selectedOption: null,
            curentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllSubjectStart();
        this.props.fetchScheduleTimeStart();
    }

    handleChange = async (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        }, () =>
            console.log(`Option selected:`, this.state.selectedOption.value)
        );


    };

    dataInputSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                object.label = `${item.name}`;
                object.value = item.id;

                result.push(object);
            })

        }

        return result;
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.subjectData !== this.props.subjectData) {
            let dataSelect = this.dataInputSelect(this.props.subjectData)
            this.setState({
                subjectArr: dataSelect
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            let data = this.props.dataTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }

    }

    handleChangeDate = (date) => {
        this.setState({
            curentDate: date[0]
        })
    }

    handelClickButtonTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }

    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedOption, curentDate } = this.state;
        let result = []
        if (!selectedOption && _.isEmpty(selectedOption)) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                confirmButtonText: 'I get it',
                text: 'No subjects have been selected yet !',
            })
            return;
        }

        if (!curentDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                confirmButtonText: 'I get it',
                text: 'Have not selected the opening date yet !',
            })
            return;
        }


        // let dateFormat = moment(curentDate).format('DD/MM/YYYY');
        // let monthFormat = moment(curentDate).format('MM/YYYY');

        let dateFormat = new Date(curentDate).getTime();
        let monthFormat = new Date(curentDate).getTime();


        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(
                item => item.isSelected === true
            )
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {};
                    object.subjectId = selectedOption.value;
                    object.date = dateFormat;
                    object.month = monthFormat;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    confirmButtonText: 'I get it',
                    text: 'No time frame selected !',
                })
                return;
            }
        }

        let res = await saveSubjectSchedule({
            arrSchedule: result,
            subjectId: selectedOption.value,
            dateFormat: dateFormat
        })

        if (res.errorCode === 0) {
            Swal.fire({
                icon: 'success',
                title: 'Done ~',
                confirmButtonText: 'I get it',
                text: 'Create schedule success .',
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Opps ...',
                confirmButtonText: 'I get it',
                text: res.errorMessage,
            })
        }
    }

    render() {
        let { selectedOption } = this.state;
        let { rangeTime } = this.state;
        let { language } = this.props;

        return (
            <React.Fragment>
                <Header />
                <div className="subject-schedule-container">
                    <div className="subject-schedule-title">
                        Quản lý kế hoạch khai giảng
                    </div>
                    <hr />

                    <div className="subjects-form">
                        <div className="subjects-items">
                            <label className="modals-item-label">
                                Chọn môn học
                            </label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={this.state.subjectArr}
                            />
                        </div>
                        <div className="subjects-items">
                            <label className="modals-item-label">
                                Chọn ngày khai giảng
                            </label>
                            <DatePicker
                                onChange={this.handleChangeDate}
                                placeholder={"Choose mouth"}
                                selected={this.state.curentDate}
                                minDate={new Date()}
                            />

                        </div>
                    </div>


                    <div className="modals-item">
                        <div className="subject-schedule-list">
                            <div className="schedule-main">
                                <div className="schedule-left">
                                    {rangeTime && rangeTime.length > 0 &&
                                        rangeTime.map((item, index) => {
                                            return (
                                                <div className="schedule-item" >
                                                    <div>{language === languages.VI ? item.vi : item.en}</div>
                                                    <div className="line-1"></div>
                                                    <div className={item.isSelected === true ? "button button--enable" : "button button--disable"} key={index}
                                                        onClick={() => this.handelClickButtonTime(item)}
                                                    >
                                                        {item.isSelected === true ? "Huỷ" : "Tạo"}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="schedule-right">
                                    <div className="schedule-time">
                                        <p>Thông tin</p>
                                    </div>
                                    <div className="schedule-location">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing.
                                    </div>
                                    <div className="schedule-location">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis libero, quibusdam
                                        repellat adipisci quam culpa ad cupiditate officia doloremque suscipit?
                                    </div>
                                    <div className="schedule-price">
                                        Lorem ipsum dolor sit amet.
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="button button--long mt-10"
                        onClick={() => this.handleSaveSchedule()}
                    >
                        Lưu thông tin
                    </div>
                </div>



            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        subjectData: state.admin.subjectData,
        language: state.app.language,
        dataTime: state.admin.dataTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSubjectStart: () => dispatch(actions.fetchAllSubjectStart()),
        fetchScheduleTimeStart: () => dispatch(actions.fetchScheduleTimeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectSchedule);

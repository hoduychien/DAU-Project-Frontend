import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { languages, CommonUtils } from '../../../../utils';
import DatePicker from "../../../../components/Input/DatePicker";
import *  as actions from "../../../../store/actions"
import { saveSubjectSchedule } from '../../../../services/subjectService';
import _ from 'lodash';
import './ModalSubjectSchedule.scss'

class ModalAddSubject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curentDate: '',
            rangeTime: [],
            subjectName: ''
        }
    }



    async componentDidMount() {
        this.props.fetchScheduleTimeStart();
        if (this.props.selectedOption) {
            this.setState({
                subjectName: this.props.selectedOption.label
            })
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.dataTime !== this.props.dataTime) {
            let data = this.props.dataTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
        if (prevProps.selectedOption !== this.props.selectedOption) {
            this.setState({
                subjectName: this.props.selectedOption.label
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


    toggle = () => {
        this.props.toggle();
    }

    handleSaveSchedule = async () => {
        let { rangeTime, curentDate } = this.state;
        let result = []
        if (this.props.selectedOption) {
            if (!curentDate) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    confirmButtonText: 'I get it',
                    text: 'Have not selected the opening date yet !',
                })
                return;
            }
            else {
                let dateFormat = new Date(curentDate).getTime();
                let monthFormat = (new Date(curentDate).getMonth() + 1) + "/" + new Date(curentDate).getFullYear();

                if (rangeTime && rangeTime.length > 0) {
                    let selectedTime = rangeTime.filter(
                        item => item.isSelected === true
                    )
                    if (selectedTime && selectedTime.length > 0) {
                        selectedTime.map(schedule => {
                            let object = {};
                            object.subjectId = this.props.selectedOption.value;
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
                    subjectId: this.props.selectedOption.value,
                    dateFormat: dateFormat + ''
                })

                if (res.errorCode === 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Done ~',
                        confirmButtonText: 'I get it',
                        text: 'Create schedule success .',
                    })
                    this.props.toggle();
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Opps ...',
                        confirmButtonText: 'I get it',
                        text: res.errorMessage,
                    })
                }
            }

        }

    }


    render() {
        let { rangeTime, subjectName } = this.state;
        let { language } = this.props;
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    className={'modals-subjects-container'}
                    size="lg"
                    centered
                >
                    <ModalBody>
                        <div className="modals-subjects-container">
                            <div className="subjects-schedule-container">
                                <div className="subject-schedule-title">
                                    Lịch mở lớp môn học : {subjectName}
                                </div>
                                <div className="modals-item-label">

                                </div>
                                <div className="subjects-form">

                                    <div className="subjects-items">
                                        <label className="modals-item-label">
                                            Chọn ngày khai giảng
                                        </label>
                                        <div className="subjects-date">
                                            <DatePicker
                                                onChange={this.handleChangeDate}
                                                placeholder={"Chọn ngày khai giảng"}
                                                selected={this.state.curentDate}
                                                minDate={new Date()}
                                                className="subjects-date-picker"
                                            />
                                            <i class="fas fa-calendar-alt"></i>
                                        </div>


                                    </div>
                                </div>


                                <div className="modals-item">
                                    <div className="subjects-schedule-list">
                                        <div className="schedule-main">
                                            <div className="schedule-left">
                                                <div className="schedule-time">
                                                    <p>Chọn thời gian học</p>
                                                </div>
                                                {rangeTime && rangeTime.length > 0 &&
                                                    rangeTime.map((item, index) => {
                                                        return (
                                                            <div className="schedule-item" >
                                                                <div className="schedule-times">{language === languages.VI ? item.vi : item.en}</div>
                                                                <div className="line-2"></div>
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

                                        </div>

                                    </div>

                                </div>

                                <div className="button button--long mt-10"
                                    onClick={() => this.handleSaveSchedule()}
                                >
                                    Lưu thông tin
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                </Modal>

            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        dataTime: state.admin.dataTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchScheduleTimeStart: () => dispatch(actions.fetchScheduleTimeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddSubject);




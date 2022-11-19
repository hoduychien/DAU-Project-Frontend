import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalBooking.scss';
import moment from 'moment';
import btnClose from '../../../../assets/images/close-icon.png';
import iconDown from '../../../../assets/images/chevron-down.png';
import { getDetailSubjectForMoldal } from '../../../../services/subjectService'
import { languages } from '../../../../utils';
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from '../../../../store/actions'
import Select from 'react-select';
import { postStudentRigister } from '../../../../services/subjectService'
import Swal from 'sweetalert2';
import _ from "lodash";
import { BiUserCircle, BiPhone, BiMailSend, BiCalendarCheck, BiLocationPlus } from "react-icons/bi";




class ModalBooking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataFromParent: {},
            fullName: '',
            phone: '',
            email: '',
            address: '',
            birthday: '',
            date: '',
            genders: '',
            selectedGender: '',
            subjectId: '',
            timeType: ''
        }
    }

    async componentDidMount() {
        let subjectId = this.props.dataScheduleChoose.subjectId;
        let timeType = this.props.dataScheduleChoose.timeType
        let data = await this.getSubjectInfo(subjectId);
        let dateChoose = this.props.dataScheduleChoose.date

        this.setState({
            dataFromParent: data,
            subjectId: subjectId,
            timeType: timeType,
            date: dateChoose
        })
        this.props.getGenderStart();

        console.log("checksada:", this.props)
    }

    getSubjectInfo = async (id) => {
        let data = {}
        if (id) {
            let res = await getDetailSubjectForMoldal(id);
            if (res && res.errorCode === 0) {
                data = res.data
            }
        }
        return data;
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataScheduleChoose.subjectId !== prevProps.dataScheduleChoose.subjectId) {
            let data = await this.getSubjectInfo(this.props.dataScheduleChoose.subjectId);
            let subjectId = this.props.dataScheduleChoose.subjectId
            let timeType = this.props.dataScheduleChoose.timeType
            let dateChoose = this.props.dataScheduleChoose.date
            this.setState({
                dataFromParent: data,
                subjectId: subjectId,
                timeType: timeType,
                date: dateChoose
            })

        }

        if (this.props.genders !== prevProps.genders) {

            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
    }

    buildDataGender = (data) => {
        let res = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === languages.VI ? item.vi : item.en;
                object.value = item.keyMap
                res.push(object);
            })
        }
        return res
    }


    handleOnchangeIput = (event, id) => {
        let value = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = value;
        this.setState({
            ...stateCopy
        })
    }

    handleChangeDate = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        });
    }


    handleConfirm = async () => {
        let date = new Date(this.state.date).getTime();
        let timeString = this.renderTimeBooking(this.props.dataScheduleChoose)

        // let timeString = moment(new Date(parseInt(this.props.dataScheduleChoose.date))).format('DD-MM-YYYY');
        let subjectName = this.props.detailSubjectData.name
        let { language } = this.props
        let { dataFromParent } = this.state
        let timeStudy = ''
        if (dataFromParent && dataFromParent.Subject_info) {
            timeStudy = dataFromParent.Subject_info.studyTimeTypeData.vi
        }

        console.log("aaaaaaaaaaaa", date)
        let realTime = new Date()
        let price = ''
        if (dataFromParent && dataFromParent.Subject_info) {
            if (language === languages.VI) {
                price = new Intl.NumberFormat(
                    'vi-VN', { style: 'currency', currency: 'VND' }
                ).format(dataFromParent.Subject_info.priceTypeData.vi);
            } else {
                price = new Intl.NumberFormat(
                    'en-US', { style: 'currency', currency: 'USD' }
                ).format(dataFromParent.Subject_info.priceTypeData.en);
            }

        }

        console.log(subjectName)
        let res = await postStudentRigister({
            fullName: this.state.fullName,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            date: this.state.date,
            selectedGender: this.state.selectedGender,
            subjectId: this.state.subjectId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            subjectName: subjectName,
            price: price,
            timeStudy: timeStudy,
            realTime: realTime
        })

        if (res && res.errorCode === 0) {
            Swal.fire({
                icon: 'success',
                title: 'Done...',
                text: res.errorMessage,
            });
            this.props.handleCloseModalBooking();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                confirmButtonText: 'I get it',
                text: res.errorMessage,
            })
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === languages.VI ?
                dataTime.timeTypeData.vi : dataTime.timeTypeData.en;


            let date = moment(new Date(parseInt(dataTime.date))).format('ddd - DD/MM/YYYY');
            return `${time} - ${date}`
        }
        return ``
    }

    render() {
        let { isOpenModalBooking, handleCloseModalBooking, dataScheduleChoose, language } = this.props
        let { dataFromParent } = this.state



        let currency = ''
        if (dataFromParent && dataFromParent.Subject_info) {
            if (language === languages.VI) {
                currency = new Intl.NumberFormat(
                    'vi-VN', { style: 'currency', currency: 'VND' }
                ).format(dataFromParent.Subject_info.priceTypeData.vi);
            } else {
                currency = new Intl.NumberFormat(
                    'en-US', { style: 'currency', currency: 'USD' }
                ).format(dataFromParent.Subject_info.priceTypeData.en);
            }

        }

        let date = moment(new Date(parseInt(dataScheduleChoose.date))).format('DD-MM-YYYY');





        return (
            <React.Fragment>

                <Modal
                    isOpen={isOpenModalBooking}
                    className={'modal-booking-container'}
                    size="xl"
                    centered
                    toggle={handleCloseModalBooking}
                >
                    <ModalBody>
                        <div className="modal-booking-close"
                            onClick={handleCloseModalBooking}
                        >
                            <img src={btnClose} alt="" className="" />
                        </div>
                        <div className="modal-booking">
                            <div className="modal-booking-info">
                                <div className="modal-booking-prov">

                                    {
                                        dataFromParent && dataFromParent.Subject_info && language === languages.VI
                                            ? dataFromParent.Subject_info.provinceTypeData.vi : ''
                                    }
                                    {
                                        dataFromParent && dataFromParent.Subject_info && language === languages.EN

                                            ? dataFromParent.Subject_info.provinceTypeData.en : ''
                                    }

                                </div>
                                <hr />
                                <div className="modal-booking-subject-name">
                                    {dataFromParent.name}
                                </div>
                                <div className="modal-booking-title">
                                    <span>Address</span>
                                    <hr />
                                </div>
                                <div className="modal-booking-text">
                                    {
                                        dataFromParent && dataFromParent.Subject_info
                                            ? dataFromParent.Subject_info.address : ''
                                    }
                                </div>
                                <div className="modal-booking-title">
                                    <span>About</span>
                                    <hr />
                                </div>

                                <div className="modal-booking-text">
                                    <div className="modal-booking-text-left">
                                        Time study:
                                    </div>
                                    <div className="modal-booking-text-right">
                                        {
                                            dataFromParent && dataFromParent.Subject_info && language === languages.VI

                                                ? dataFromParent.Subject_info.studyTimeTypeData.vi : ''
                                        }
                                        {
                                            dataFromParent && dataFromParent.Subject_info && language === languages.EN

                                                ? dataFromParent.Subject_info.studyTimeTypeData.en : ''
                                        }
                                    </div>
                                </div>


                                <div className="modal-booking-text">
                                    <div className="modal-booking-text-left">
                                        Hotline :
                                    </div>
                                    <div className="modal-booking-text-right blue-span">
                                        +84 762 766 682
                                    </div>
                                </div>

                                <div className="modal-booking-text">
                                    <div className="modal-booking-text-left">
                                        Thơi gian học :
                                    </div>
                                    <div className="modal-booking-text-right">
                                        {
                                            dataScheduleChoose && dataScheduleChoose.timeTypeData && language === languages.VI
                                                ? dataScheduleChoose.timeTypeData.vi : ''
                                        }
                                        {
                                            dataScheduleChoose && dataScheduleChoose.timeTypeData && language === languages.EN

                                                ? dataScheduleChoose.timeTypeData.en : ''
                                        }

                                        <span> --- </span>


                                        {date}

                                    </div>
                                </div>
                                <div className="modal-booking-text">
                                    <div className="modal-booking-text-left">
                                        Email :
                                    </div>
                                    <div className="modal-booking-text-right blue-span">
                                        chienhoo20@gmail.com
                                    </div>
                                </div>
                                <div className="modal-booking-text">
                                    <div className="modal-booking-text-left">
                                        Tuition  :
                                    </div>
                                    <div className="modal-booking-text-right">
                                        {currency}
                                    </div>
                                </div>
                                <div className="modal-booking-text">
                                    <div className="modal-booking-text-left">
                                        Payment :
                                    </div>
                                    <div className="modal-booking-text-right">
                                        {
                                            dataFromParent && dataFromParent.Subject_info && language === languages.VI

                                                ? dataFromParent.Subject_info.paymentTypeData.vi : ''
                                        }
                                        {
                                            dataFromParent && dataFromParent.Subject_info && language === languages.EN

                                                ? dataFromParent.Subject_info.paymentTypeData.en : ''
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="modal-booking-form">
                                <div className="modal-booking-form-main">
                                    <div className="modal-booking-input">
                                        <div className="modal-booking-input-label">
                                            Họ tên :
                                        </div>
                                        <input type="text"
                                            placeholder="Họ và tên ..."
                                            value={this.state.fullName}
                                            onChange={(event) => this.handleOnchangeIput(event, "fullName")}
                                        />
                                        <BiUserCircle className="icons" />
                                    </div>
                                    <div className="modal-booking-input">
                                        <div className="modal-booking-input-label">
                                            Số điện thoại :
                                        </div>
                                        <input type="text" placeholder="Số điện thoại ..."
                                            value={this.state.phone}
                                            onChange={(event) => this.handleOnchangeIput(event, "phone")}
                                        />
                                        <BiPhone className="icons" />
                                    </div>
                                    <div className="modal-booking-input">
                                        <div className="modal-booking-input-label">
                                            Email :
                                        </div>
                                        <input type="email" placeholder="Địa chỉ email ..."
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnchangeIput(event, "email")}
                                        />
                                        <BiMailSend className="icons" />
                                    </div>
                                    <div className="modal-booking-input">
                                        <div className="modal-booking-input-label">
                                            Địa chỉ :
                                        </div>
                                        <input type="text" placeholder="Địa chỉ ..."
                                            value={this.state.address}
                                            onChange={(event) => this.handleOnchangeIput(event, "address")}
                                        />
                                        <BiLocationPlus className="icons" />
                                    </div>

                                    <div className="modal-booking-input">
                                        <div className="modal-booking-input-label">
                                            Ngày sinh :
                                        </div>
                                        <DatePicker
                                            onChange={this.handleChangeDate}
                                            value={this.state.birthday}
                                            placeholder="Ngày sinh"
                                        />
                                        <BiCalendarCheck className="icons" />
                                    </div>
                                    {/*<div className="modal-booking-group">
                                        
                                          <div className="modal-booking-select">
                                            <Select
                                                value={this.state.selectedGender}
                                                onChange={this.handleChangeSelect}
                                                placeholder={'Giới tính ...'}
                                                options={this.state.genders}
                                            />
                                        </div>
                                    </div>*/}
                                    <div className="modal-booking-actions ">
                                        <div className="modal-booking-button modal-booking-button-accept"
                                            onClick={() => this.handleConfirm()}
                                        >
                                            <span>Đăng ký</span>
                                        </div>
                                        <div className="modal-booking-button modal-booking-button-cancel">
                                            <span>Huỷ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        detailSubjectData: state.admin.detailSubjectData,
        language: state.app.language,
        genders: state.admin.genderArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);

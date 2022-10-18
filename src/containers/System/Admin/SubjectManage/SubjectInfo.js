import React, { Component } from 'react';
import { connect } from 'react-redux';
import *  as actions from "../../../../store/actions";
import Swal from 'sweetalert2';
import './SubjectInfo.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

import { getDetailSubject } from '../../../../services/subjectService'

const mdParser = new MarkdownIt();



class SubjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentText: '',
            contentCode: '',
            selectedOption: null,
            desc: '',
            subjectArr: [],
            checkData: false
        }
    }

    componentDidMount() {
        this.props.fetchAllSubjectStart();
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentText: text,
            contentCode: html,
        })
    }

    handleSaveContent = () => {
        let isValid = this.validateInput();
        if (isValid === true) {
            this.props.saveInfoDetailSubject({
                contentCode: this.state.contentCode,
                contentText: this.state.contentText,
                desc: this.state.desc,
                subjectId: this.state.selectedOption.value,
            })
        }

    }

    handleChange = async (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption.value)
        );

        let res = await getDetailSubject(selectedOption.value)

        if (res && res.errorCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            if (markdown.desc === null) {
                this.setState({
                    contentText: "",
                    desc: '',
                    checkData: false
                })
            }
            else {
                this.setState({
                    contentText: markdown.contentText,
                    desc: markdown.desc,
                    checkData: true
                })
            }
        }
    };

    validateInput = () => {
        let arrInput = [
            'desc',
            'contentCode',
            'selectedOption',
        ]
        let isValid = true;
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;

                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    confirmButtonText: 'I get it',
                    text: `Missing Parameter: ${arrInput[i]}`
                })
                break;
            }
        }
        return isValid;
    }

    handleChangeText = (event) => {
        this.setState({
            desc: event.target.value
        })
    }
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
    }

    render() {
        let { selectedOption } = this.state;
        let { checkData } = this.state;
        return (
            <div className="subject-container">
                <div className="subject-title">
                    Quản lý thông tin môn học
                </div>
                <div className="subject-form">
                    <div className="modals-item">
                        <label className="modals-item-label">
                            Choose subject
                        </label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.subjectArr}
                        />
                    </div>
                    <div className="modals-item">
                        <label className="modals-item-label">
                            Subject Title
                        </label>
                        <textarea
                            type="text"
                            className="modals-item-input" rows="5" cols="50"
                            placeholder="Enter subject title ..."
                            onChange={(event) => this.handleChangeText(event)}
                            value={this.state.desc}
                        />
                    </div>

                    <div className="modals-item">
                        <label className="modals-item-label">
                            Bài viết
                        </label>
                        <MdEditor style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentText}
                        />
                    </div>
                </div>


                <div className={checkData === true ? "button button--update" : "button button--primary"}
                    onClick={() => this.handleSaveContent()}
                >
                    {checkData === true ? "Lưu bài đăng" : "Tạo bài đăng"}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        subjectData: state.admin.subjectData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSubjectStart: () => dispatch(actions.fetchAllSubjectStart()),
        saveInfoDetailSubject: (data) => dispatch(actions.saveInfoDetailSubject(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectInfo);

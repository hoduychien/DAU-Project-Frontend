import React, { Component } from 'react';
import { connect } from "react-redux";
import { postVerifyEmail } from '../../services/subjectService';
import HomeHeader from '../HomePage/HomeHeader';
import Footer from '../Footer/Footer';
import './verifyEmail.scss'

class VerifyEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errorCode: ``
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let url = new URLSearchParams(this.props.location.search)
            let token = url.get('token');
            let subjectId = url.get('subjectId');

            let res = await postVerifyEmail({
                token: token,
                subjectId: subjectId
            })

            if (res && res.errorCode === 0) {
                this.setState({
                    status: true,
                    errorCode: res.errorMessage
                })
            } else {
                this.setState({
                    status: false,
                    errorCode: res.errorMessage
                })
            }
            console.log(this.state.errorCode)
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    render() {
        let { status, errorCode } = this.state;
        return (
            <React.Fragment>
                <HomeHeader />
                <div className="verify-email">
                    {errorCode}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

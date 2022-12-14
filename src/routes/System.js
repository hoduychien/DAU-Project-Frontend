import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import CourseRedux from '../containers/System/Admin/CourseManage/CourseRedux'
import SubjectRedux from '../containers/System/Admin/SubjectManage/SubjectRedux';
import UserRedux from '../containers/System/Admin/UserRedux';
import SubjectInfo from '../containers/System/Admin/SubjectManage/SubjectInfo';
import Header from '../containers/Header/Header';


class System extends Component {
    render() {


        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {/*<Route path="/system/user-manage" component={UserManage} />*/}
                            <Route path="/system/user-manage-redux" component={UserRedux} />
                            <Route path="/system/course-manage" component={CourseRedux} />
                            <Route path="/system/subject-manage" component={SubjectRedux} />
                            <Route path="/system/subject-info" component={SubjectInfo} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);

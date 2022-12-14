import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import System from "../routes/System";
import Lecturer from "../routes/Lecturer";
import Subject from "../routes/Subject";
import HomePage from "./HomePage/HomePage.js";
import DetailSubject from "./Student/Subject/DetailSubject";
import VerifyEmail from "./Student/VerifyEmail";
import { CustomToastCloseButton } from "../components/CustomToast";
import CourseDetail from "./Student/Courses/CourseDetail";
import ProfileStudent from "./Student/ProfileStudent";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <span className="content-container">
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route path={path.REGISTER} component={Register} />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route
                  path={path.LECTURER}
                  component={userIsAuthenticated(Lecturer)}
                />
                <Route
                  path={"/subject/"}
                  component={userIsAuthenticated(Subject)}
                />
                <Route path={path.HOMEPAGE} component={HomePage} />
                <Route path={path.DETAIL_SUBJECT} component={DetailSubject} />
                <Route path={path.DETAIL_COURSE} component={CourseDetail} />
                <Route path={path.USER_PROFILE} component={ProfileStudent} />
                <Route path={path.VERITY_EMAIL} component={VerifyEmail} />
              </Switch>
            </span>

            <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

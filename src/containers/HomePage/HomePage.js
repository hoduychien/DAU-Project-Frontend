import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import HomeHeader from './HomeHeader';
import Course from './Section/Course';
import Lecturers from './Section/Lecturers';
import Subjects from './Section/Subjects';
import Footer from '../Footer/Footer';


class HomePage extends Component {

    render() {
        return (
            <div>
                <HomeHeader />
                <Course />
                <Lecturers />
                <Subjects />
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

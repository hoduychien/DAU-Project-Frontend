import actionTypes from './actionTypes';
import {
    getAllKeywordsService,
    createNewUserService,
    editUserService,
    getAllUsers,
    deleteUserService,
    getLecturers,
} from '../../services/userService';

import {
    getAllCourses,
    deleteCourseService,
    editCourseService
} from '../../services/courseService'
import {
    getAllSubject,
    deleteSubjectService,
    editSubjectService,
    saveInfoSubject,
    getDetailSubject
} from '../../services/subjectService'
import Swal from 'sweetalert2';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllKeywordsService('gender');
            if (res && res.errorCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())

            }
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log(error);
        }
    }
}

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllKeywordsService('position');
            if (res && res.errorCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed())
            console.log(error);
        }
    }
}

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllKeywordsService('role');
            if (res && res.errorCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
            console.log(error);
        }
    }
}

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const CreateUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.message.errorCode === 0) {
                dispatch(CreateUserSuccess(res.data))
                Swal.fire({
                    icon: 'success',
                    title: 'Tạo tài khoản thành công',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else {
                dispatch(CreateUserFailed())
            }
        } catch (error) {
            dispatch(CreateUserFailed())
            console.log(error);
        }
    }
}

export const CreateUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const CreateUserFailed = (err) => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('all');
            if (res && res.errorCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            }
            else {
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            dispatch(fetchAllUserFailed())
            console.log(error);
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})


export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(id);
            if (res && res.message.errorCode === 0) {
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            }
            else {
                dispatch(deleteUserFailed())
            }
        } catch (error) {
            dispatch(deleteUserFailed())
            console.log(error);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const updateUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(id);
            console.log(id)
            if (res && res.errorCode === 0) {
                dispatch(updateUserSuccess())
            }
            else {
                dispatch(updateUserFailed())
            }
        } catch (error) {
            dispatch(updateUserFailed())
            console.log(error);
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})

export const fetchAllCourseStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCourses('all');

            if (res && res.errorCode === 0) {
                dispatch(fetchAllCourseSuccess(res.courses.reverse()))
            }
            else {
                dispatch(fetchAllCourseFailed())
            }
        } catch (error) {
            dispatch(fetchAllCourseFailed())
            console.log(error);
        }
    }
}

export const fetchAllCourseSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_COURSE_SUCCESS,
    courses: data
})

export const fetchAllCourseFailed = () => ({
    type: actionTypes.FETCH_ALL_COURSE_FAILED
})

export const deleteCourseStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteCourseService(id);
            if (res && res.message.errorCode === 0) {
                dispatch(deleteCourseSuccess())
                dispatch(fetchAllCourseStart())
            }
            else {
                dispatch(deleteCourseFailed())
            }
        } catch (error) {
            dispatch(deleteCourseFailed())
            console.log(error);
        }
    }
}

export const deleteCourseSuccess = () => ({
    type: actionTypes.DELETE_COURSE_SUCCESS
})

export const deleteCourseFailed = () => ({
    type: actionTypes.DELETE_COURSE_FAILED
})

export const editCourseStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCourseService(data);
            if (res && res.errorCode === 0) {
                dispatch(editCourseSuccess())
                dispatch(fetchAllCourseStart())
            }
            else {
                dispatch(editCourseFailed())

            }
        } catch (error) {
            dispatch(editCourseFailed())
            console.log(error);
        }
    }
}

export const editCourseSuccess = () => ({
    type: actionTypes.UPDATE_COURSE_SUCCESS
})

export const editCourseFailed = () => ({
    type: actionTypes.UPDATE_COURSE_FAILED
})


export const fetchAllLecturers = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getLecturers(6);
            if (res && res.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_LECTURER_SUCCESS,
                    lecturerData: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_LECTURER_FAILED
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.FETCH_ALL_LECTURER_FAILED
            })
        }
    }
}

export const fetchAllSubjectStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSubject('all');
            if (res && res.errorCode === 0) {
                dispatch(fetchAllSubjectSuccess(res.subject.reverse()))
            }
            else {
                dispatch(fetchAllSubjectFailed())
            }
        } catch (error) {
            dispatch(fetchAllSubjectFailed())
            console.log(error);
        }
    }
}

export const fetchAllSubjectSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SUBJECT_SUCCESS,
    subjectData: data
})

export const fetchAllSubjectFailed = () => ({
    type: actionTypes.FETCH_ALL_SUBJECT_FAILED
})

export const deleteSubjectStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSubjectService(id);
            if (res && res.message.errorCode === 0) {
                dispatch(deleteSubjectSuccess())
                dispatch(fetchAllSubjectStart())
            }
            else {
                dispatch(deleteSubjectFailed())

            }
        } catch (error) {
            alert("notdsaa okkk")
            dispatch(deleteSubjectFailed())
            console.log(error);

        }
    }
}

export const deleteSubjectSuccess = () => ({
    type: actionTypes.DELETE_SUBJECT_SUCCESS
})

export const deleteSubjectFailed = () => ({
    type: actionTypes.DELETE_SUBJECT_FAILED
})

export const editSubjectStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editSubjectService(data);
            if (res && res.errorCode === 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Done',
                    confirmButtonText: 'Ok',
                    text: "Edit subject success ~~",
                })
                dispatch(editSubjectSuccess())
                dispatch(fetchAllSubjectStart())
            }
            else {
                dispatch(editSubjectFailed())
            }
        } catch (error) {
            dispatch(editSubjectFailed())
            console.log(error);
        }
    }
}

export const editSubjectSuccess = () => ({
    type: actionTypes.UPDATE_SUBJECT_SUCCESS
})

export const editSubjectFailed = () => ({
    type: actionTypes.UPDATE_SUBJECT_FAILED
})


export const saveInfoDetailSubject = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInfoSubject(data);
            if (res && res.errorCode === 0) {
                let message = res.errorMessage;
                Swal.fire({
                    icon: 'success',
                    title: 'Done',
                    confirmButtonText: 'Ok',
                    text: message,
                })
                dispatch({
                    type: actionTypes.SAVE_INFO_SUBJECT_SUCCESS,
                })
            }
            else {
                dispatch({
                    type: actionTypes.SAVE_INFO_SUBJECT_FAILED
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.SAVE_INFO_SUBJECT_FAILED
            })
        }
    }
}

export const fetchSubjectDetailStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailSubject(id);
            if (res && res.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DETAIL_SUBJECT_SUCCESS,
                    detailSubjectData: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_DETAIL_SUBJECT_FAILED
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.FETCH_DETAIL_SUBJECT_FAILED
            })
        }
    }
}


export const fetchScheduleTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllKeywordsService("TIME");
            if (res && res.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_TIME_FAILED
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.FETCH_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const getSubjectRequired = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_SUBJECT_REQUIRED })
            let resPrice = await getAllKeywordsService('PRICE');
            let resPayment = await getAllKeywordsService('PAYMENT');
            let resProvince = await getAllKeywordsService('PROVINCE');
            let resStudyTime = await getAllKeywordsService('STUDYTIME');
            if (resPrice && resPrice.errorCode === 0
                && resPayment && resPayment.errorCode === 0
                && resProvince && resProvince.errorCode === 0
                && resStudyTime && resStudyTime.errorCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resStudyTime: resStudyTime.data,
                }
                console.log("chceckdsa data", data)
                dispatch(getSubjectRequiredSuccess(data))
            }
            else {
                dispatch(getSubjectRequiredFailed())

            }
        } catch (error) {
            dispatch(getSubjectRequiredFailed())
            console.log(error);
        }
    }
}

export const getSubjectRequiredSuccess = (requiredSubjectData) => ({
    type: actionTypes.GET_SUBJECT_REQUIRED_SUCCESS,
    data: requiredSubjectData
})

export const getSubjectRequiredFailed = () => ({
    type: actionTypes.GET_SUBJECT_REQUIRED_FAILED
})

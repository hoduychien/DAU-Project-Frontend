import actionTypes from '../actions/actionTypes';


const initialState = {
    genderArr: [],
    positionArr: [],
    roleArr: [],
    users: [],
    Lecturers: [],
    subjectData: [],
    detailSubjectData: [],
    dataTime: []

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genderArr = action.data;

            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genderArr = []
            return {
                ...state,
            }


        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positionArr = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positionArr = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roleArr = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roleArr = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = []
            return {
                ...state,
            }


        case actionTypes.FETCH_ALL_COURSE_SUCCESS:
            state.courses = action.courses;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_COURSE_FAILED:
            state.courses = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_LECTURER_SUCCESS:
            state.lecturerData = action.lecturerData;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_LECTURER_FAILED:
            state.lecturerData = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_SUBJECT_SUCCESS:
            state.subjectData = action.subjectData;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SUBJECT_FAILED:
            state.subjectData = []
            return {
                ...state,
            }

        case actionTypes.FETCH_DETAIL_SUBJECT_SUCCESS:
            state.detailSubjectData = action.detailSubjectData;
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_SUBJECT_FAILED:
            state.detailSubjectData = []
            return {
                ...state,
            }

        case actionTypes.FETCH_SCHEDULE_TIME_SUCCESS:
            state.dataTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_SCHEDULE_TIME_FAILED:
            state.dataTime = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;
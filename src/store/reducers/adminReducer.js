import actionTypes from '../actions/actionTypes';


const initialState = {
    genderArr: [],
    rolesArr: [],
    roleArr: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('start', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genderArr = action.data;
            console.log('copyState', copyState);

            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;
import actionTypes from '../actions/actionTypes';

const initialState = {
    allCodeData: [],
    filmData:[],
    resAddUser:{},
    userData:{},
}

const appReducer = (state = initialState, action) => {
    let copyState = [];
    switch (action.type) {
        case actionTypes.GET_ALLCODE_BY_TYPE_START:
            copyState = { ...state };
            return {
                ...copyState
            }
        case actionTypes.GET_ALLCODE_BY_TYPE_SUCCESS:
            copyState = { ...state };
            copyState.allCodeData = action.data;
            return {
                ...copyState
            }
        case actionTypes.GET_ALLCODE_BY_TYPE_FAIL:
            copyState = { ...state };
            copyState.allCodeData = []
            return {
                ...copyState
            }
        case actionTypes.FETCH_FILM_START:
            copyState = { ...state };
            return {
                ...copyState
            }
        case actionTypes.FETCH_FILM_SUCCESS:
            copyState = { ...state };
            copyState.filmData = action.data;
            return {
                ...copyState
            }
        case actionTypes.FETCH_FILM_FAIL:
            copyState = { ...state };
            copyState.filmData = []
            return {
                ...copyState
            }
        case actionTypes.CREATE_USER_START:
            copyState = { ...state };
            return {
                ...copyState
            }
        case actionTypes.CREATE_USER_SUCCESS:
            copyState = { ...state };
            copyState.resAddUser = action.data;
            return {
                ...copyState
            }
        case actionTypes.CREATE_USER_FAIL:
            copyState = { ...state };
            copyState.filmData = []
            return {
                ...copyState
            }
        case actionTypes.GET_USER_START:
            copyState = { ...state };
            return {
                ...copyState
            }
        case actionTypes.GET_USER_SUCCESS:
            copyState = { ...state };
            copyState.userData = action.data;
            return {
                ...copyState
            }
        case actionTypes.GET_USER_FAIL:
            copyState = { ...state };
            copyState.userData = []
            return {
                ...copyState
            }
        default:
            return state;
    }
}

export default appReducer;
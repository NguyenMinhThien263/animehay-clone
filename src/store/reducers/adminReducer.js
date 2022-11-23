import actionTypes from '../actions/actionTypes';

const initialState = {
    allCodeData: [],
    filmData: [],
    resAddUser: {},
    userData: {},
    searchData: [],
    cateData: [],
    aFilmData:{},
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
            copyState.resAddUser = {}
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
            copyState.userData = {}
            return {
                ...copyState
            }
        case actionTypes.GET_FILM_START_BY_SEARCH:
            copyState = { ...state };
            return {
                ...copyState
            }
        case actionTypes.GET_FILM_SUCCESS_BY_SEARCH:
            copyState = { ...state };
            copyState.searchData = action.data;
            return {
                ...copyState
            }
        case actionTypes.GET_FILM_FAIL_BY_SEARCH:
            copyState = { ...state };
            copyState.searchData = []
            return {
                ...copyState
            }
        case actionTypes.GET_FILM_START_BY_GENRE:
            copyState = { ...state };
            return {
                ...copyState
            }
        case actionTypes.GET_FILM_SUCCESS_BY_GENRE:
            copyState = { ...state };
            copyState.cateData = action.data;
            return {
                ...copyState
            }
        case actionTypes.GET_FILM_FAIL_BY_GENRE:
            copyState = { ...state };
            copyState.cateData = []
            return {
                ...copyState
            }
        case actionTypes.FETCH_AFILM_START:
            copyState = { ...state };
            return {
                ...copyState
            }
        case actionTypes.FETCH_AFILM_SUCCESS:
            copyState = { ...state };
            copyState.aFilmData = action.data;
            return {
                ...copyState
            }
        case actionTypes.FETCH_AFILM_FAIL:
            copyState = { ...state };
            copyState.aFilmData = {}
            return {
                ...copyState
            }
        default:
            return state;
    }
}

export default appReducer;
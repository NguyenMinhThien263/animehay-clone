import actionTypes from './actionTypes';
import {
    getAllcodeByType,
    saveFilm,
    getAllFilms,
    getOneFilm,
    editFilm,
    deleteFilm,
    addNewUser,
    getUser,
} from '../../services/userService';
import { toast } from 'react-toastify';
//Allcode
export const getAllcodeByTypeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.GET_ALLCODE_BY_TYPE_START,
            })
            let genreData = await getAllcodeByType('GENRE');
            let statusData = await getAllcodeByType('STATUS');
            let yearData = await getAllcodeByType('YEAR');
            if (
                genreData && genreData.errCode === 0 &&
                yearData && yearData.errCode === 0 &&
                statusData && statusData.errCode === 0
            ) {
                let data = {
                    genreData: genreData.data,
                    statusData: statusData.data,
                    yearData: yearData.data,
                }
                dispatch(getAllcodeByTypeSuccess(data))
            } else {
                dispatch(getAllcodeByTypeFail())
            }
        } catch (error) {
            dispatch(getAllcodeByTypeFail())
            console.log(`${actionTypes.GET_ALLCODE_BY_TYPE_FAIL}:`, error);
        }
    }
}

export const getAllcodeByTypeSuccess = (data) => ({
    type: actionTypes.GET_ALLCODE_BY_TYPE_SUCCESS,
    data: data,
})
export const getAllcodeByTypeFail = () => ({
    type: actionTypes.GET_ALLCODE_BY_TYPE_FAIL,
})
//CreateFilm
export const createFilmStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveFilm(data);
            if (res && res.errCode === 0) {
                toast.success("Create Film Success")
                dispatch(createFilmSuccess())
                dispatch(fetchAllFilmStart(data.page, data.pageSize))
            } else {
                dispatch(createFilmFail())
            }
        } catch (error) {
            toast.error("Create Film failed");
            dispatch(createFilmFail())
            console.log(`${actionTypes.CREATE_FILM_FAIL}:`, error);
        }
    }
}

export const createFilmSuccess = (data) => ({
    type: actionTypes.CREATE_FILM_SUCCESS,
})
export const createFilmFail = () => ({
    type: actionTypes.CREATE_FILM_FAIL,
})
//getAllFilms
export const fetchAllFilmStart = (page, size) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_FILM_START,
            })
            let res = await getAllFilms(page, size);
            if (res && res.errCode === 0) {
                dispatch(fetchAllFilmSuccess(res.data))
            } else {
                dispatch(fetchAllFilmFail())
            }
        } catch (error) {
            dispatch(fetchAllFilmFail())
            console.log(`${actionTypes.FETCH_FILM_FAIL}:`, error);
        }
    }
}

export const fetchAllFilmSuccess = (data) => ({
    type: actionTypes.FETCH_FILM_SUCCESS,
    data: data,
})
export const fetchAllFilmFail = () => ({
    type: actionTypes.FETCH_FILM_FAIL,
})
//EditFilm
export const editFilmStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editFilm(data);
            if (res && res.errCode === 0) {
                toast.success("Edit Film Success")
                dispatch(editFilmSuccess())
                dispatch(fetchAllFilmStart(data.page, data.pageSize))
            } else {
                dispatch(editFilmFail())
            }
        } catch (error) {
            toast.error("Edit Film failed");
            dispatch(editFilmFail())
            console.log(`${actionTypes.EDIT_FILM_FAIL}:`, error);
        }
    }
}

export const editFilmSuccess = () => ({
    type: actionTypes.EDIT_FILM_SUCCESS,
})
export const editFilmFail = () => ({
    type: actionTypes.EDIT_FILM_FAIL,
})
//DeleteFilm
export const deleteFilmStart = (data, page, pageSize) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteFilm(data.id);
            if (res && res.errCode === 0) {
                toast.success("Delete Film Success")
                dispatch(deleteFilmSuccess())
                dispatch(fetchAllFilmStart(page, pageSize))
            } else {
                dispatch(deleteFilmFail())
            }
        } catch (error) {
            toast.error("Delete Film failed");
            dispatch(deleteFilmFail())
            console.log(`${actionTypes.DELETE_FILM_FAIL}:`, error);
        }
    }
}

export const deleteFilmSuccess = () => ({
    type: actionTypes.DELETE_FILM_SUCCESS,
})
export const deleteFilmFail = () => ({
    type: actionTypes.DELETE_FILM_FAIL,
})

//Create user
export const addNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await addNewUser(data);
            if (res) {
                dispatch(addNewUserSuccess(res))
            } else {
                dispatch(addNewUserFail())
            }
        } catch (error) {
            dispatch(addNewUserFail())
            console.log(`${actionTypes.CREATE_USER_FAIL}:`, error);
        }
    }
}

export const addNewUserSuccess = (data) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data
})
export const addNewUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
})
//Get User
export const getUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getUser(data);
            console.log('cehck action', res);
            if (res) {
                dispatch(getUserSuccess(res))
            } else {
                dispatch(getUserFail())
            }
        } catch (error) {
            dispatch(getUserFail())
            console.log(`${actionTypes.GET_USER_FAIL}:`, error);
        }
    }
}

export const getUserSuccess = (data) => ({
    type: actionTypes.GET_USER_SUCCESS,
    data
})
export const getUserFail = () => ({
    type: actionTypes.GET_USER_FAIL,
})
import actionTypes from './actionTypes';
import {
    getAllcodeByType,
    saveFilm,
    getAllFilms,
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
//Film
export const createFilmStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveFilm(data);
            if (res && res.errCode === 0) {
                toast.success("Create Film Success")
                dispatch(createFilmSuccess())
                dispatch(fetchAllFilmStart())
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
//Allcode
export const fetchAllFilmStart = (page, size) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_FILM_START,
            })
            let res = await getAllFilms(page, size);
            if (res && res.errCode === 0) {
                toast.success("Fetch success");
                dispatch(fetchAllFilmSuccess(res.data))
            } else {
                toast.error("Fetch failed");
                dispatch(fetchAllFilmFail())
            }
        } catch (error) {
            toast.error("Fetch failed");
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
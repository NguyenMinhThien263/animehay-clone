import axios from '../axios';
const getAllcodeByType = (type) => {
    return axios.get(`/api/get-allcode-by-type?type=${type}`)
}
const saveFilm = (data) => {
    return axios.post(`/api/save-film`, data)
}
const getAllFilms = (page, size) => {
    return axios.get(`/api/get-all-film?page=${page}&size=${size}`)
}

export {
    getAllcodeByType,
    saveFilm,
    getAllFilms
}
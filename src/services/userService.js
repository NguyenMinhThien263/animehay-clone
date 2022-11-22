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
const getOneFilm = (id) => {
    return axios.get(`/api/get-one-film?id=${id}`)
}
const editFilm = (data) => {
    return axios.put(`/api/edit-film`, data)
}
const deleteFilm = (id) => {
    return axios.delete(`/api/delete-film?id=${id}`)
}
const addNewUser = (data) => {
    return axios.post(`/api/add-new-user`, data)
}
const getUser = (data) => {
    return axios.post(`/api/get-user`, { email: data.email, password: data.password })
}
const getOneFilmBySearch = (inputSearch) => {
    return axios.get(`/api/get-film-by-search?search=${inputSearch}`)
}

export {
    getAllcodeByType,
    saveFilm,
    getAllFilms,
    getOneFilm,
    editFilm,
    deleteFilm,
    addNewUser,
    getUser,
    getOneFilmBySearch,
}
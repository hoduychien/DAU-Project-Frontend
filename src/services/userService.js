import axios from '../axios';
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`)
}

const createNewUserService = (data) => {
    return axios.post(`/api/create-user`, data);
}

const deleteUserService = (id) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: id
        }
    })
}

const editUserService = (data) => {
    return axios.put(`/api/edit-user`, data)
}

const getAllKeywordsService = (type) => {
    return axios.get(`/api/get-key?type=${type}`)
}

const getLecturers = (limit) => {
    return axios.get(`/api/get-lecturer-list?limit=${limit}`)
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllKeywordsService,
    getLecturers
};

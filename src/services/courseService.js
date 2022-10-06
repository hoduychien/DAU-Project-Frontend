import axios from '../axios';

const getAllCourses = (id) => {
    return axios.get(`/api/get-all-courses?id=${id}`)
}

const createCourseService = (data) => {
    return axios.post(`/api/create-courses`, data);
}

const deleteCourseService = (id) => {
    return axios.delete(`/api/delete-courses`, {
        data: {
            id: id
        }
    })
}

const editCourseService = (data) => {
    return axios.put(`/api/edit-courses`, data)
}


export {
    getAllCourses,
    createCourseService,
    deleteCourseService,
    editCourseService
};

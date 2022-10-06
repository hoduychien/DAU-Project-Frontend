import axios from '../axios';

const getAllSubject = (id) => {
    return axios.get(`/api/get-all-subject?id=${id}`)
}

const createSubjectService = (data) => {
    return axios.post(`/api/create-subject`, data);
}

const deleteSubjectService = (id) => {
    return axios.delete(`/api/delete-subject`, {
        data: {
            id: id
        }
    })
}


export {
    getAllSubject,
    createSubjectService,
    deleteSubjectService,
};

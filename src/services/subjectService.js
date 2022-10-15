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

const editSubjectService = (data) => {
    return axios.put(`/api/edit-subject`, data);
}

const saveInfoSubject = (data) => {
    return axios.post(`/api/save-info-subject`, data);
}

const getDetailSubject = (id) => {
    return axios.get(`api/get-detail-subject?id=${id}`);
}

const saveSubjectSchedule = (data) => {
    return axios.post(`/api/create-subject-schedule`, data);
}
export {
    getAllSubject,
    createSubjectService,
    deleteSubjectService,
    editSubjectService,
    saveInfoSubject,
    getDetailSubject,
    saveSubjectSchedule
};

import axios from "../axios";

const getAllSubject = (id) => {
  return axios.get(`/api/get-all-subject?id=${id}`);
};

const createSubjectService = (data) => {
  return axios.post(`/api/create-subject`, data);
};

const deleteSubjectService = (id) => {
  return axios.delete(`/api/delete-subject`, {
    data: {
      id: id,
    },
  });
};

const editSubjectService = (data) => {
  return axios.put(`/api/edit-subject`, data);
};

const saveInfoSubject = (data) => {
  return axios.post(`/api/save-info-subject`, data);
};

const getDetailSubject = (id) => {
  return axios.get(`api/get-detail-subject?id=${id}`);
};

const saveSubjectSchedule = (data) => {
  return axios.post(`/api/create-subject-schedule`, data);
};

const getScheduleByMonth = (subjectId, month) => {
  return axios.get(
    `/api/get-subject-schedule-by-month?subjectId=${subjectId}&date=${month}`
  );
};

const getExtraInfoSchedule = (subjectId) => {
  return axios.get(`/api/get-extra-info-subject?subjectId=${subjectId}`);
};

const getDetailSubjectForMoldal = (subjectId) => {
  return axios.get(`/api/get-detail-subject-for-modal?subjectId=${subjectId}`);
};

const postStudentRigister = (data) => {
  return axios.post(`/api/student-register-subject`, data);
};

const postVerifyEmail = (data) => {
  return axios.post(`/api/verify-register-subject`, data);
};

const postSentEmail = (data) => {
  return axios.post(`/api/sent-email-for-student`, data);
};

export {
  getAllSubject,
  createSubjectService,
  deleteSubjectService,
  editSubjectService,
  saveInfoSubject,
  getDetailSubject,
  saveSubjectSchedule,
  getScheduleByMonth,
  getExtraInfoSchedule,
  getDetailSubjectForMoldal,
  postStudentRigister,
  postVerifyEmail,
  postSentEmail,
};

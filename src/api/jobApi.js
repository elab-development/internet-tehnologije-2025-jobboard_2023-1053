import axiosClient from "../axiosClient.js";

export const jobApi = {
    getAll: () => axiosClient.get('/jobs'),

    getByCompany: (companyId) =>
        axiosClient.get(`/jobs/company/${companyId}`),

    search: (name) =>
        axiosClient.get(`/jobs/name?name=${name}`),

    create: (data) =>
        axiosClient.post('/job/add', data),

    update: (id, data) =>
        axiosClient.put(`/job/update/${id}`, data),

    delete: (id) =>
        axiosClient.delete(`/job/delete/${id}`),
};
import axiosClient from "../axiosClient.js";

export const jobApi = {
    getAll: () => axiosClient.get('/jobs'),

    getByCompany: (companyId) =>
        axiosClient.get(`/jobs/company/${companyId}`),
    search: (params) =>
        axiosClient.get('/jobs/search', { params }),

    create: (data) =>
        axiosClient.post('/job/add', data),

    update: (id, data) =>
        axiosClient.put(`/job/update/${id}`, data),

    delete: (id) =>
        axiosClient.delete(`/job/delete/${id}`),
};
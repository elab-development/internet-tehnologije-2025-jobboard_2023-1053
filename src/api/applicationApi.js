import axiosClient from "../axiosClient.js";

export const applicationAPI = {
    create: (data) =>
        axiosClient.post('/application/add', data),

    getByUser: () =>
        axiosClient.get('/application/user'),

    getByJob: (jobId) =>
        axiosClient.get(`/application/jobs/${jobId}`),

    update: (id, data) =>
        axiosClient.put(`/application/update/${id}`, data),

    delete: (id) =>
        axiosClient.delete(`/application/delete/${id}`),
};
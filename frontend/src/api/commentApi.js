import axiosClient from "../axiosClient.js";

export const commentAPI = {
    getByCompany: (companyId) =>
        axiosClient.get(`/comment/${companyId}`),

    getByUser: () =>
        axiosClient.get('/comments/user'),

    create: (data) =>
        axiosClient.post('/comment/add', data),

    update: (id, data) =>
        axiosClient.put(`/comment/update/${id}`, data),

    delete: (id) =>
        axiosClient.delete(`/comments/${id}`),
};
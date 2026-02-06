import axiosClient from "../axiosClient.js";

export const categoryAPI = {
    search: (name) =>
        axiosClient.get(`/category/search?name=${name}`),
    getAll:()=>
        axiosClient.get(`/category`),

    getById: (id) =>
        axiosClient.get(`/category/${id}`),

    create: (data) =>
        axiosClient.post('/category', data),

    update: (data) =>
        axiosClient.put('/category/update', data),

    delete: (id) =>
        axiosClient.delete(`/category/${id}`),
};
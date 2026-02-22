import axiosClient from "../axiosClient.js";

export const companyAPI = {
    search: (name) =>
        axiosClient.get(`/companies/name?name=${name}`),

    update: (id, data) =>
        axiosClient.put(`/company/update/${id}`, data),

    delete: (id) =>
        axiosClient.delete(`/company/delete/${id}`),
};
import axiosClient from "../axiosClient.js";

export const userAPI = {
    getByRole: (role) =>
        axiosClient.get(`/users/${role}/role`),

    delete: (id) =>
        axiosClient.delete(`/user/delete/${id}`),
};
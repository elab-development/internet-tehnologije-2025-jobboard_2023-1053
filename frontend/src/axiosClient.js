import axios from "axios";
const axiosClient = axios.create({
    baseURL: "https://internet-tehnologije-2025-jobboard2023-1053-production-58f6.up.railway.app/api",  // << promenjeno
    headers: {
                "Content-Type": "application/json",

        Accept: "application/json",
    },
    withCredentials: false,
});
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})
axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if (response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
    }
    throw error;
})
export default axiosClient;

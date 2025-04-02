import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5001/api/"
})
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token"); // Or get from Redux, Context, etc.

    // Exclude token for login and register
    if (!config.url.includes("auth/login") && !config.url.includes("auth/register")) {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
}, error => Promise.reject(error));


export const LoginUser = (user) => {
    return api.post("auth/login", user)
}

export const RegisterUser = (user) => {
    return api.post("auth/register", user)
}

export const getUserPost = () => {
    return api.get("auth/getuserpost");
}

export const deletePostByUser = (id) => {
    return api.delete(`auth/deletepostbyuser/${id}`);
}

export const editProfile = (id, formData) => {
    return api.patch(`auth/edit/${id}`, formData)
}
import axios from "axios";
import { getToken } from "./services/tokenServices";

// Init User who has signed in successfully
export const axiosClient = axios.create({
    baseURL: "https://gym_project.test/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    timeout: 10000
})

// Adding the stored token with every request
axiosClient.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config

}, (error) => {
    return Promise.reject(error)
})

// Handle if the token is not correct and return a meaningful message
axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.status === 401) {
        throw new Error("Unauthenticated")
    } else {
        return Promise.reject(error)
    }
})
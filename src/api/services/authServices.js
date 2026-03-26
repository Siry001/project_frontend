import { axiosClient as axiosPublicClient } from "../axiosPublicClient"
import { axiosClient as axiosPrivateClient } from "../axiosPrivateClient"

export async function login(userData) {
    try {
        const response = await axiosPublicClient.post("/login", userData)
        return response.data
    } catch (error) {
        // Handle if the Email or Password is not correct and return a meaningful message
        if (error.response && error.status === 401) {
            throw new Error("Invalid Credentials")
        } else {
            throw error
        }
    }
}

export async function register(userData) {
    const response = await axiosPublicClient.post("/register", userData)
    return response.data
}

export async function logout() {
    const response = await axiosPrivateClient.post("/logout")
    return response.data
}
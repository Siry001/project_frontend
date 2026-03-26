import axios from "axios";

// Init User who has no account or hasn't signed in yet
export const axiosClient = axios.create({
    baseURL: "https://gym_project.test/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    timeout: 10000
})
import axios from "axios";

// Init User who has no account or hasn't signed in yet
export const axiosClient = axios.create({
    baseURL: "https://projectbackend-production-87ea.up.railway.app/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    timeout: 10000
})
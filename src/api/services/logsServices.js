import { axiosClient } from "../axiosPrivateClient"

export async function createLog(log) {
    const response = await axiosClient.post("/logs", log)
    return response.data
}

export async function getAllLogs() {
    const response = await axiosClient.get("/logs")
    return response.data
}

export async function getLogDetails(id) {
    const response = await axiosClient.get(`/logs/${id}`)
    return response.data
}

export async function deleteLog(id) {
    const response = await axiosClient.delete(`/logs/${id}`)
    return response.data
}
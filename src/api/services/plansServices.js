import { axiosClient } from "../axiosPrivateClient"

export async function createPlan(plan) {
    const response = await axiosClient.post("/plans", plan)
    return response.data
}

export async function getAllPlans() {
    const response = await axiosClient.get("/plans")
    return response.data
}

export async function getPlanDetails(id) {
    const response = await axiosClient.get(`/plans/${id}`)
    return response.data
}

export async function deletePlan(id) {
    const response = await axiosClient.delete(`/plans/${id}`)
    return response.data
}
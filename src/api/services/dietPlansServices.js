import { axiosClient } from "../axiosPrivateClient"

export async function createDietPlan(dietPlan) {
    const response = await axiosClient.post("/diet-plans", dietPlan)
    return response.data
}

export async function getAllDietPlans() {
    const response = await axiosClient.get("/diet-plans")
    return response.data
}

export async function getDietPlanDetails(id) {
    const response = await axiosClient.get(`/diet-plans/${id}`)
    return response.data
}

export async function deleteDietPlan(id) {
    const response = await axiosClient.delete(`/diet-plans/${id}`)
    return response.data
}

export async function editDietPlan(id, dietPlan) {
    const response = await axiosClient.put(`/diet-plans/${id}`, dietPlan)
    return response.data
}
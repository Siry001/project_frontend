import { axiosClient } from "../axiosPrivateClient";

export async function generateAiWorkout(target) {
    const response = await axiosClient.post("/ai/workout", target)
    return response.data
}

export async function generateAiDietPlan(target) {
    const response = await axiosClient.post("/ai/diet", target)
    return response.data
}
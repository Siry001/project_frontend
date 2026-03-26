import { axiosClient } from "../axiosPrivateClient"

export async function CreateWorkout(workout) {
    const response = await axiosClient.post('/workouts', workout)
    return response.data
}

export async function getAllWorkouts() {
    const response = await axiosClient.get("/workouts")
    return response.data
}

export async function getWorkoutDetails(id) {
    const response = await axiosClient.get(`/workouts/${id}/progress`)
    return response.data
}

export async function deleteWorkout(id) {
    const response = await axiosClient.delete(`/workouts/${id}`)
    return response.data
}

export async function editWorkout(id, workout) {
    const response = await axiosClient.put(`/workouts/${id}`, workout)
    return response.data
}
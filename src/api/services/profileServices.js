import { axiosClient } from "../axiosPrivateClient"

export async function getProfile() {
    const response = await axiosClient.get("/profile")
    return response.data
}
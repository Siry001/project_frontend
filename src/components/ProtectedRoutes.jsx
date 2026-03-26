import { useAuth } from "../Contexts/customHooks"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoutes() {
    const { user } = useAuth()
    return user? <Outlet /> : <Navigate to="/sign-in"/>
}
import { useEffect, useState } from "react"
import { AuthContext } from "./customHooks"
import { deleteToken, getToken, setToken } from "../api/services/tokenServices"
import { getProfile } from "../api/services/profileServices"
import { login as loginUser, register as registerUser, logout as logoutUser } from "../api/services/authServices"
import { useNavigate } from "react-router-dom"
import { Loader } from "../components/Loader"

export default function AuthProvider({ children }) {
    const [token, setTokenState] = useState(getToken())
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function verifyUser() {
            if (!token) {
                setLoading(false)
                return
            }

            try {
                const userData = await getProfile()
                setUser(userData)
            } catch (error) {
                if (error.message === "Unauthenticated") {
                    deleteToken()
                    setTokenState(null)
                } else {
                    console.log("Error happend", error.message)
                    return
                }
            } finally {
                setLoading(false)
            }
        }

        verifyUser()
    }, [token])

    async function login(userData) {
        const result = await loginUser(userData)
        setTokenState(result.token)
        setToken(result.token)
        navigate("/")
    }

    async function register(userData) {
        const result = await registerUser(userData)
        setTokenState(result.token)
        setToken(result.token)
        navigate("/")
    }

    async function logout() {
        await logoutUser()
        setTokenState(null)
        deleteToken()
        navigate("/sign-in")
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {loading? <Loader /> : children}
        </AuthContext.Provider>
    )
}
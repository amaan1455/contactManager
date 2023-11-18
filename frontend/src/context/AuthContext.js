import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    useEffect(() => {
        checkUserLoggedIn()
    }, [])
    const checkUserLoggedIn = async () => {
        if (!localStorage.getItem("token")) navigate("/login", { replace: true })
        try {
            const res = await fetch(`http://localhost:5000/api/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            const result = await res.json()
            if (!result.error) {
                setUser(result)
                navigate("/", { replace: true })
            } else {
                navigate("/login", { replace: true })
            }
        } catch (err) {
            console.log(err)
        }
    }
    const loginUser = async (userData) => {
        try {
            const res = await fetch(`http://localhost:5000/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ ...userData }),
            })
            const result = await res.json()
            if (!result.error) {
                localStorage.setItem("token", result.token)
                setUser(result.user)
                navigate("/", { replace: true })
            } else alert(result.error)
        } catch (err) { console.log(err) }
    }
    const registerUser = async (userData) => {
        try {
            const res = await fetch(`http://localhost:5000/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ ...userData }),
            })
            const result = await res.json()
            if (!result.error) {
                navigate("/login", { replace: true })
            } else alert(result.error)
        } catch (err) { console.log(err) }
    }
    return <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>{children}</AuthContext.Provider>
}
export default AuthContext
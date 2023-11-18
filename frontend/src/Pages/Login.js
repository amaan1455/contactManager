import { useState, useContext } from "react"
import AuthContext from "../context/AuthContext"
const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const [info, setInfo] = useState({ email: "", password: "" })
    const handleCh = (event) => {
        const { name, value } = event.target
        setInfo({ ...info, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!info.email || !info.password) {
            alert("Please enter all details")
            return
        }
        loginUser(info)
    }
    return (<>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="emailInput" class="form-label mt-4">Email address</label>
                <input type="email" class="form-control" id="emailInput" value={info.email} onChange={handleCh} name="email" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="passInput" class="form-label mt-4">Password</label>
                <input type="password" class="form-control" id="passInput" value={info.password} onChange={handleCh} placeholder="Password" name="password" autocomplete="off" />
            </div>
            <button type="submit" class="btn btn-primary mt-5">Login</button>
        </form></>)
}
export default Login
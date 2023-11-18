import { useState, useContext } from "react"
import AuthContext from "../context/AuthContext"
const Register = () => {
    const { registerUser } = useContext(AuthContext)
    const [info, setInfo] = useState({ name: "", email: "", password: "" })
    const handleCh = (event) => {
        const { name, value } = event.target
        setInfo({ ...info, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!info.email || !info.password || !info.name) {
            alert("Please enter all details")
            return
        }
        registerUser(info)
    }
    return (<>
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="nameInput" class="form-label mt-4">Name</label>
                <input type="text" class="form-control" id="nameInput" value={info.name || "name1"} onChange={handleCh} name="name" placeholder="Enter name" />
            </div>
            <div class="form-group">
                <label for="emailInput" class="form-label mt-4">Email address</label>
                <input type="email" class="form-control" id="emailInput" value={info.email || "mail1@mail.com"} onChange={handleCh} name="email" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="passInput" class="form-label mt-4">Password</label>
                <input type="password" class="form-control" id="passInput" value={info.password || "password1"} onChange={handleCh} placeholder="Password" name="password" autocomplete="off" />
            </div>
            <button type="submit" class="btn btn-primary mt-5">Register</button>
        </form></>)
}
export default Register
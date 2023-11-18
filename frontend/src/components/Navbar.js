import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
const Navbar = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div class="container-fluid">
                <Link to="/" class="navbar-brand">Contact Manager</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link active" href="https://www.linkedin.com/in/amaan14/">linkedin.com/in/amaan14/
                                <span class="visually-hidden">(current)</span>
                            </a>
                        </li>
                        {user ? <>
                            <Link to="/create">
                                <li class="nav-item nav-link">
                                    Add Contact
                                </li>
                            </Link>
                            <Link to="/mycontacts">
                                <li class="nav-item nav-link">
                                    My Contacts
                                </li>
                            </Link>
                            <li class="nav-item nav-link" onClick={() => { setUser(null); localStorage.clear(); navigate("/login", { replace: true }) }}>
                                Logout
                            </li>
                        </> : <><Link to="/login">
                            <li class="nav-item nav-link">
                                Login
                            </li>
                        </Link>
                            <Link to="/register">
                                <li class="nav-item nav-link">
                                    Register
                                </li>
                            </Link></>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar
import { useNavigate, Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useContext, useEffect } from "react"
import AllContact from "./AllContact"
const Home = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (!user) navigate("/login", { replace: true })
    }, [])
    return <>
        <div className="container">
            <div className="row">
                <div className="col-9">
                    <div className="jumbotron">
                        <h1>Welcome {user ? user.name : null}</h1>
                        <hr className="my-4" />
                        <Link to="/create" className="btn btn-info">Add Contact</Link>
                    </div><br /><AllContact /></div>
                <div className="col-3">
                    <h3>Messages</h3>
                    {user ? user.message.map((message) => {
                        return (<div class="card text-white bg-primary mb-3 mt-5 mw">
                            <div class="card-header">{message.name}</div>
                            <div class="card-body">
                                <p class="card-text">{message.message}</p>
                            </div>
                        </div>)
                    }) : <></>}
                </div>
            </div></div></>
}
export default Home
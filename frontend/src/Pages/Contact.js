import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
const Contact = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [info, setInfo] = useState({ name: "", email: "", phone: "", id: "" })
    const handleCh = (event) => {
        const { name, value } = event.target
        setInfo({ ...info, [name]: value })
    }
    const handleSend = async () => {
        const res = await fetch(`http://localhost:5000/api/message`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ text: document.getElementById("text").value, email: info.email })
        })
        const result = res.json
        if (!result.error) {
            alert("Message sent")
        } else {
            alert(result.error)
        }
    }
    useEffect(() => {
        async function fun() {
            try {
                const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const result = await res.json()
                setInfo({
                    name: result.contact.name,
                    email: result.contact.email,
                    phone: result.contact.phone,
                    id: result.contact._id
                })
            } catch (err) { console.log(err) }
        } fun()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!info.name || !info.email || !info.phone || !info.id) {
            alert("Please enter all details")
            return
        }
        try {
            const res = await fetch(`http://localhost:5000/api/contact`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ ...info })
            })
            const result = res.json()
            if (!result.error) {
                alert("Contact updated")
            } else {
                alert(result.error)
            }
        } catch (err) { console.log(err) }
    }
    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            const result = await res.json()
            if (!result.error) {
                alert("Contact deleted")
                navigate("/mycontacts", { replace: true })
            } else {
                alert(result.error)
            }
        } catch (err) { console.log(err) }
    }
    const handleExport = async () => {
        alert(JSON.stringify({ name: info.name, email: info.email, phone: info.phone }))
    }
    return (<>
        <h2>Update your contact</h2>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="nameInput" class="form-label mt-4">Name</label>
                <input type="text" class="form-control" id="nameInput" value={info.name || "name"} onChange={handleCh} name="name" placeholder="Enter name" />
            </div>
            <div class="form-group">
                <label for="emailInput" class="form-label mt-4">Email address</label>
                <input type="email" class="form-control" id="emailInput" value={info.email || "mail1@mail.com"} onChange={handleCh} name="email" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="phoneInput" class="form-label mt-4">Phone</label>
                <input type="text" class="form-control" id="phoneInput" value={info.phone || "123456789"} onChange={handleCh} name="phone" placeholder="Enter phone" />
            </div>
            <button type="submit" class="btn btn-primary mt-5">Update</button>
            <button type="button" class="btn btn-danger mt-5" onClick={handleDelete}>Delete</button>
            <button type="button" class="btn btn-primary mt-5" onClick={handleExport}>Share and Export</button>
            <div class="form-group">
                <h3 className="mt-5">Send Message</h3>
                <textarea class="form-control" id="text" name="text" rows="3"></textarea>
                <button type="button" class="btn btn-primary mt-1" onClick={handleSend}>Send</button>
            </div>
        </form></>)
}
export default Contact
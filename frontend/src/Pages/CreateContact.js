import { useState } from "react"
const CreateContact = () => {
    const [info, setInfo] = useState({ name: "", email: "", phone: "" })
    const handleCh = (event) => {
        const { name, value } = event.target
        setInfo({ ...info, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!info.name || !info.email || !info.phone) {
            alert("Please enter all details")
            return
        }
        const res = await fetch(`http://localhost:5000/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ ...info })
        })
        const result = res.json
        if (!result.error) {
            alert("Contact created")
            setInfo({ name: "", email: "", phone: "" })
        } else {
            alert(result.error)
        }
    }
    const handleImport = () => {
        setInfo(JSON.parse(document.getElementById("import").value))
    }
    return (<>
        <h2>Create your contact</h2>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="nameInput" class="form-label mt-4">Name</label>
                <input type="text" class="form-control" id="nameInput" value={info.name} onChange={handleCh} name="name" placeholder="Enter name" />
            </div>
            <div class="form-group">
                <label for="emailInput" class="form-label mt-4">Email address</label>
                <input type="email" class="form-control" id="emailInput" value={info.email} onChange={handleCh} name="email" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="phoneInput" class="form-label mt-4">Phone</label>
                <input type="text" class="form-control" id="phoneInput" value={info.phone} onChange={handleCh} name="phone" placeholder="Enter phone" />
            </div>
            <button type="submit" class="btn btn-primary mt-5">Add</button>
            <div class="form-group">
                <label for="import" class="form-label mt-4">Enter Import String</label>
                <input type="text" class="form-control" id="import" />
            </div>
            <button type="button" class="btn btn-primary mt-5" onClick={handleImport}>Import</button>
        </form></>)
}
export default CreateContact
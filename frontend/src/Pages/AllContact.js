import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
const AllContact = () => {
    const [contacts, setContacts] = useState([])
    const [allContacts, setAllContacts] = useState([])
    useEffect(() => {
        async function fun() {
            try {
                const res = await fetch(`http://localhost:5000/api/mycontacts`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const result = await res.json()
                if (!result.error) {
                    setContacts(result.contacts)
                    setAllContacts(result.contacts)
                } else { console.log(result.error) }
            } catch (err) { console.log(err) }
        } fun()
    }, [])
    const handleSubmit = (e) => {
        const newContacts = allContacts.filter((contact) => contact.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setContacts(newContacts)
    }
    return <>
        <div>
            <h1>All Contacts</h1>
            <hr className="my-4" />
            <form class="d-flex">
                <input class="form-control me-sm-2" type="search" placeholder="Search" name="searchInput" id="searchInput" onChange={handleSubmit} />
            </form>
            <table class="table table-hover mt-5">
                <thead>
                    <tr class="table-dark">
                        <th scope="row">Name</th>
                        <td>E-mail</td>
                        <td>Phone</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => {
                        return (<tr key={contact._id}>
                            <th scope="row">{contact.name}</th>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td><Link to={`/contact/${contact._id}`}><button type="button" class="btn btn-primary">View</button></Link></td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div></>
}
export default AllContact
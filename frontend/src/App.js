import Layout from "./components/Layout"
import { Routes as Switch, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import AllContact from "./Pages/AllContact"
import Contact from "./Pages/Contact"
import { AuthContextProvider } from "./context/AuthContext"
import CreateContact from "./Pages/CreateContact"
function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateContact />} />
          <Route path="/mycontacts" element={<AllContact />} />
          <Route path="/contact/:id" element={<Contact />} />
        </Switch>
      </Layout>
    </AuthContextProvider>
  );
}
export default App;
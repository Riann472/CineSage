import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Admin from "./Pages/Admin.jsx"
import Users from "./Pages/Users.jsx"
import Categorias from "./Pages/Categorias.jsx"
import Profile from './Pages/Profile.jsx'
import { AuthContext } from "./helpers/AuthContext.js"
import { useEffect, useState } from "react"
import axios from "axios"
import AddCategoria from "./Pages/AddCategorias.jsx"
import AddFilme from "./Pages/AddFilme.jsx"
import Filme from "./Pages/Filme.jsx"

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    user: "",
    cargo: "",
    logged: false
  })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.get(`${import.meta.env.VITE_API_URL}/user`, { headers: { token: localStorage.getItem('token') } })
        .then(res => setAuthState({
          id: res.data.id,
          user: res.data.user,
          cargo: res.data.cargo,
          logged: true
        }))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/categorias" element={<Categorias />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/addfilme" element={<AddFilme />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/filme/:id" element={<Filme />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/addcategoria" element={<AddCategoria />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App

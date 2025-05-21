import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Home from "./Pages/Home.jsx"
import { AuthContext } from "./helpers/AuthContext.js"
import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    user: "",
    logged: false
  })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.get(`${import.meta.env.VITE_API_URL}/user`, { headers: { token: localStorage.getItem('token') } })
        .then(res => setAuthState({
          id: res.data.id,
          user: res.data.user,
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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Home from "./Pages/Home.jsx"
import { AuthContext } from "./helpers/AuthContext.js"
import { useState } from "react"

function App() {
  const [authState, setAuthState] = useState(false)
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

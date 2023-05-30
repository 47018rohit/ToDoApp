import { BrowserRouter, Routes, Route } from "react-router-dom"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { server } from "./main"
import { Context } from "./Context/IsAuthContext"
import Navbar from "./components/Navbar"

function App() {
  const { setUser, setIsAuth } = useContext(Context)

  

  useEffect(() => {
    // Fetch User Data
    axios.get(`${server}/user/me`, {
      withCredentials: true
    }).then(res => {
      setUser(res.data.user);
      setIsAuth(true)
    }).catch(() => {
      setIsAuth(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </BrowserRouter>
  )
}

export default App

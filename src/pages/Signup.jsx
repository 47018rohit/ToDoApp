import { useState, useContext } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { SvgIcon } from "@mui/material"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { server } from '../main'
import { toast } from "react-hot-toast"
import { Context } from "../Context/IsAuthContext"

const Signup = () => {
  const { loading, setLoading } = useContext(Context)
  const [toggleShow, setToggleShow] = useState(false)
  const [navigate, setNavigate] = useState(false)
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' })

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleShowPassword = () => {
    setToggleShow(!toggleShow)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { name, email, password } = credentials
    try {
      const { data } = await axios.post(`${server}/user/new `, {
        name, email, password
      },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )
      toast.success(data.message)
      setLoading(false)
      setNavigate(true)
    }
    catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }
  if (navigate) return <Navigate to={'/login'} />
  return (
    <main className="form-container" >
      <h1>Be a member..</h1>
      <form className="form" onSubmit={handleSubmit}  >
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={onchange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          required
          onChange={onchange}
        />
        <div className="password-container">
          <input
            type={toggleShow ? 'text' : 'password'}
            name="password"
            placeholder={`Password `}
            onChange={onchange}
            required
          />
          <SvgIcon
            sx={{ color: '#c2c2c2' }}
            className="eye"
            component={toggleShow ? Visibility : VisibilityOff}
            onClick={handleShowPassword}
          />
        </div>
        <button className='link' type="submit" disabled={loading} >Sign Up</button>
      </form>
      <div>
        <p>Already a member ?  </p>
        <Link to={'/login'} className='link'>Login</Link>
      </div>
    </main>
  )
}

export default Signup

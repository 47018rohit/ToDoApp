import { useContext, useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { SvgIcon } from "@mui/material"
import { Link, Navigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import axios from "axios"
import { server } from "../main"
import { Context } from "../Context/IsAuthContext"


const Login = () => {
  const { isAuth , setIsAuth ,loading, setLoading } =useContext(Context)
  const [toggleShow, setToggleShow] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () => {
    setToggleShow(!toggleShow)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { email, password } = credentials

    try {
      const { data } = await axios.post(`${server}/user/login`, {
        email, password
      },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )
      toast.success(data.message)
        setIsAuth(!isAuth)
        setLoading(false)
    }
    catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }
  if (isAuth) return <Navigate to={'/'} />

  return (
    <main className="form-container" >
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit} >
        <input type="email"
          name="email"
          placeholder="E-mail"
          onChange={onchange}
          required
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
            className="eye"
            sx={{ color: '#c2c2c2' }}
            component={toggleShow ? VisibilityOff : Visibility}
            onClick={handleShowPassword}
          />
        </div>
        <button type="submit" disabled={loading} >Log in</button>
      </form>
      <div>
        <p>Not a member ?  </p>
        <Link to={'/signup'} className='link'>Sign up</Link>
      </div>
    </main>
  )
}

export default Login

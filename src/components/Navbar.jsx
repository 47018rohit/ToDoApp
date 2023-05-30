
import { NavLink } from "react-router-dom"
import { Home } from "@mui/icons-material"

const Navbar = () => {

  return (
    <NavLink to={'/'} className='link home-button' >
      <Home
        sx={{ color: '#fff', fontSize: 30 }}
      />
    </NavLink>
  )
}

export default Navbar

import { useContext } from "react"
import { Context } from '../Context/IsAuthContext'

const Profile = () => {
  const { user } = useContext(Context)
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>{user.email}</h3>
    </div>
  )
}

export default Profile

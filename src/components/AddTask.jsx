import { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Context } from '../Context/IsAuthContext'
import axios from 'axios'
import { server } from '../main'

const AddTask = () => {
  const [task, setTask] = useState({ title: '', description: '' })
  const { loading, setLoading , setRefresh } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { title, description } = task
    try {
      let { data } = await axios.post(`${server}/task/new`, { title, description }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      toast.success(data.message)
      setTask({ title: '', description: '' })
      setLoading(false)
      setRefresh(e=> !e)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }

  }
  const onchange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  return (
    <div className='add-task'>
      <h1>Add Task</h1>
      <form className="form" onSubmit={handleSubmit}  >
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={task.title}
          onChange={onchange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={task.description}
          required
          onChange={onchange}
        />
        <button className='link' type="submit" disabled={loading} >Add Task</button>
      </form>
    </div>
  )
}

export default AddTask

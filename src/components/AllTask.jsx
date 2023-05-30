import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/IsAuthContext'
import { server } from '../main'
import { Delete, ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import { toast } from 'react-hot-toast'

const AllTask = () => {
  const [allTask, setAllTask] = useState([])
  const [showAccordian, setShowAccordian] = useState()
  const { refresh, setRefresh } = useContext(Context)

  const fetchAllTask = () => {
    axios.get(`${server}/task/all`, {
      withCredentials: true
    }).then(res => setAllTask(res.data.task))
      .catch(e => console.log(e))
  }

  const handleAccordian = (e) => {
    showAccordian === e ? setShowAccordian() : setShowAccordian(e);
  }
  const handleDelete = async (id) => {
    try {
      const task = await axios.delete(`${server}/task/${id}`, {}, {
        withCredentials: true
      })
      if (task) {
        toast.success('Task Deleted')
        setRefresh(e => !e)
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  const handleUpdate = async (id) => {
    try {
      const task = await axios.put(`${server}/task/${id}`, {}, {
        withCredentials: true
      })
      if (task) {
        toast.success('Updated')
        setRefresh(e => !e)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchAllTask()
  }, [refresh])

  return (
    <div className='all-task'>
      <div className='heading' >
        <h3>Tasks</h3>
      </div>
      {allTask.length === 0 && 'No Task Added yet'}
      <div className="task-accordian">
        {allTask.map((e, index) => {
          return (
            <div className='task-bar' key={index} >
              <div className="on-show">
                <input
                  onChange={() => { handleUpdate(e._id) }}
                  checked={e.isCompleted}
                  type="checkbox"
                  name="complete"
                  id="complete"
                />
                {e.title}
                {showAccordian === index ? <ArrowDropUp className='toggleDescription' onClick={() => handleAccordian(index)} /> : <ArrowDropDown className='toggleDescription' onClick={() => handleAccordian(index)} />}
                <Delete className='delete' onClick={() => { handleDelete(e._id) }} />
              </div>
              <div className={`description ${showAccordian === index ? '' : 'hidden'} `} >{e.description}</div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default AllTask

/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Context } from './Context/IsAuthContext.js'

export const server = 'https://todo-api-7qze.onrender.com/api/v1'

const AppWrapper = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [user, setUser] = useState({})


  return (
    <Context.Provider
      value={{ isAuth, setIsAuth, loading, setLoading, user, setUser, refresh, setRefresh }}
    >
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)

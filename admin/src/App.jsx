import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Login from './pages/Login'
import Orders from './pages/Orders'
import { adminDataContext } from './context/AdminContext'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  let { adminData } = useContext(adminDataContext)  

  if (adminData === null) {
    return <div className="text-white text-center mt-20">Loading...</div>
  }

  return (
    <>
    <ToastContainer />
      {!adminData ? (
        <Login />
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/lists' element={<Lists />} />
          <Route path='/login' element={<Login />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      )}
    </>
  )
}

export default App

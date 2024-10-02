import React from 'react'
import { useAuth } from '../pages/Usercontext/Usercontext'
import './Admindashboard.css'
import Adminmenu from '../components/Adminmenu'

const Admindashboard = () => {
  const [userAuth, setuserAuth] = useAuth()
  return (
    <div className='dashboard'>
      <Adminmenu/>
      <div className='user-detail'>
      <h1>User-details</h1>
      <h3><span>Name:</span>{userAuth?.user?.name}</h3>
      <h3><span>Email:</span>{userAuth?.user?.email}</h3>
      <h3><span>Phone:</span>{userAuth?.user?.phone}</h3>
      <h3><span>Address:</span>{userAuth?.user?.address}</h3>
      </div>

    </div>
  )
}

export default Admindashboard

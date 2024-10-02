import React, { useEffect, useState } from 'react'
import { useAuth } from '../pages/Usercontext/Usercontext'
import axios from 'axios'
import moment from 'moment'
import './Orders.css'
import Usermenu from '../components/Usermenu'

const Orders = () => {
  const [order, setorder] = useState([])
  const [userauth, setuserauth] = useAuth()

  const getorders = async()=>{
    try {
      const {data} = await axios.get("http://localhost:8080/userorders")
      console.log(data)
      setorder(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(userauth?.token)getorders()
  },[userauth?.token])

  return (
    <div className='order'>
      <Usermenu/>
      <h1>All orders</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Buyer</th>
            <th>date</th>
            <th>Payment</th>
            <th>Quantity</th>
          </tr>
        </thead>
        {
          order?.map((o,i)=>(
            <div className='orderdetail'>
              <tbody>
                <tr>
                  <td>{i+1}</td>
                  <td>{o?.status}</td>
                  <td>{o?.buyer?.name}</td>
                  <td>{moment(o?.createdAt).fromNow()}</td>
                  <td>{o?.payment.success ? "success" : "failed"}</td>
                  <td>{o?.products?.length}</td>
                </tr>
              </tbody>
              {o?.products?.map((p,i)=>(
                <div key={p._id}>
                  <div>
                    <img src={`http://localhost:8080/uploads/${p.img}`} width={200}/>
                  </div>
                  <div>
                    <p>{p.name}</p>
                    <p>{p.description}</p>
                    <p>{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        }
      </table>
    </div>
  )
}

export default Orders

import React, { useEffect, useState } from 'react'
import { useAuth } from '../pages/Usercontext/Usercontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Edituser = () => {
    const [userauth, setuserauth] = useAuth()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const navigate = useNavigate()


    const updateuser = async(e)=>{
        e.preventDefault()
        const {data} = await axios.put(`http://localhost:8080/edit`,{
            name,email,phone,address
        })
        if(data){
            setuserauth({...userauth,user:data.updateuser})
            let ls = localStorage.getItem("auth")
            ls = JSON.parse(ls)
            ls.user = data
            localStorage.setItem("auth",JSON.stringify(ls))
            if(userauth?.user?.role===1){
                navigate("/dashboard/admin")
            }else{
                navigate("/dashboard/user")
            }
        }
    }

    useEffect(()=>{
        const {name,email,phone,address}=userauth.user
        setname(name)
        setemail(email)
        setphone(phone)
        setaddress(address)
    },[userauth?.user])

    return (
        <div className="ring">
            <div className="login">
                <form className='login' onSubmit={updateuser}>
                <h2>Update</h2>

                    <div className="inputBx">
                        <input
                            type="text"
                            value={name}
                            placeholder="Username"
                            id='username'
                            onChange={e => setname(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            id='email'
                            disabled
                            onChange={e => setemail(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="number"
                            value={phone}
                            placeholder="Phone no"
                            id='phone'
                            onChange={e => setphone(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            id='address'
                            onChange={e => setaddress(e.target.value)}
                        />
                    </div>

                    <div className="inputBx">
                        <input type="submit" value="Update"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edituser

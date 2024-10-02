import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Register.css'

const Register = () => {
    const [name, setname ] = useState("")
    const [email, setemail ] = useState("")
    const [password, setpassword ] = useState("")
    const [phone, setphone ] = useState("")
    const [address, setaddress ] = useState("")
    const [secretanswer, setsecretanswer ] = useState("")
    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault()
        const response = await axios.post("http://localhost:8080/register", {
            name, email, phone, password, address, secretanswer
        })
        if (response.status === 200) {
            navigate("/login")
        } else {
            alert("registration failed")
        }
    }

    return (
        <div className="ring">
            <div className="login">
                <form onSubmit={register} className='login'>
                <h2>Signup</h2>

                    <div className="inputBx">
                        <input
                            type="text"
                            placeholder="Username"
                            id='username'
                            onChange={e => setname(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="email"
                            placeholder="Email"
                            id='email'
                            onChange={e => setemail(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="password"
                            placeholder="Password"
                            id='password'
                            onChange={e => setpassword(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="number"
                            placeholder="Phone no"
                            id='phone'
                            onChange={e => setphone(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="text"
                            placeholder="Address"
                            id='address'
                            onChange={e => setaddress(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="text"
                            placeholder="Secret answer"
                            id='secret answer'
                            onChange={e => setsecretanswer(e.target.value)}
                        />
                    </div>

                    <div className="inputBx">
                        <input type="submit" value="Sign up"/>
                    </div>
                </form>
                <div className="links">
                    <p>already have a account?</p>
                    <a><Link to='/login'>Login</Link></a>
                </div>
            </div>
        </div>
    )
}

export default Register


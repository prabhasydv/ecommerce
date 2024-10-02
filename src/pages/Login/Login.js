import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import { useAuth } from '../Usercontext/Usercontext'

const Login = () => {
    const [email, setemail ] = useState("")
    const [password, setpassword ] = useState("")
    const navigate = useNavigate()
    const [userauth, setuserauth]=useAuth()

    
    const login = async (e) => {
        e.preventDefault()
        const response = await axios.post("http://localhost:8080/login", {
            email, password
        })
        if (response.status === 200) {
            setuserauth({...userauth,user:response.data.user,token:response.data.token})
            localStorage.setItem("auth",JSON.stringify(response.data))
            navigate("/")
        } else {
            alert("login failed")
        }
    }

    return (
        <div className="ring">
            <div className="login">
                <form onSubmit={login} className='login'>
                <h2>Login</h2>
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
                        <input type="submit" value="Log in"/>
                    </div>
                    <NavLink to={"/forgotpassword"} className="Navlink"> Forgot password</NavLink>
                </form>
                <div className="links">
                    <p>already have a account?</p>
                    <a><Link to='/register'>Signup</Link></a>
                </div>
            </div>
        </div>
    )
}

export default Login


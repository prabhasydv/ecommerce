import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Forgotpassword.css'

const Forgotpassword = () => {
    const [email, setemail ] = useState("")
    const [newpassword, setnewpassword ] = useState("")
    const [secretanswer, setsecretanswer ] = useState("")

    const navigate = useNavigate()

    
    const passwordreset = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/forgotpassword", {
                email, newpassword, secretanswer
            })
            if (response.status === 200) {
                navigate("/login")
            } else {
                alert("Password update failed")
            }
        } catch (error) {
            alert("Password update failed")
            console.error(error)
        }
    }

    return (
        <div className="ring">
            <div className="login">
                <form onSubmit={passwordreset} className='login'>
                <h2>Forgot Password</h2>
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
                            type="text"
                            placeholder="Entet your secret answer"
                            id='email'
                            onChange={e => setsecretanswer(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="password"
                            placeholder="Password"
                            id='password'
                            onChange={e => setnewpassword(e.target.value)}
                        />
                    </div>

                    <div className="inputBx">
                        <input type="submit" value="update password"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Forgotpassword





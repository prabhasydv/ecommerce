import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../pages/Usercontext/Usercontext'
import { useCart } from '../pages/Cartcontext/Cartcontext'

const Navbar = () => {
  const [userauth, setuserauth] = useAuth()
  const [cart, setcart] = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  function logout() {
    setuserauth({ ...userauth, user: null, token: "" })
    localStorage.removeItem("auth")
    navigate('/')
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header>
      <nav className='main-nav'>
        <div className='nav-brand'>
          <NavLink to="/">Ecommerce-web</NavLink>
          <button className='mobile-menu-button' onClick={toggleMobileMenu}>
            &#9776;
          </button>
        </div>
        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {userauth?.user ? (
            <>
              <li>
                <NavLink to={`/dashboard/${userauth?.user?.role === 1 ? "admin" : "user"}`}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={logout} className="logout-button">Logout</button>
              </li>
              <li>
                <NavLink to="/cart">Cart ({cart?.length})</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/register">Signup</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Cart({cart?.length})</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar

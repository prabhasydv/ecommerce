import React, { useEffect, useState } from 'react'
import { useAuth } from '../Usercontext/Usercontext'
import { useCart } from '../Cartcontext/Cartcontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropIn from 'braintree-web-drop-in-react'
import './Cartpage.css'

const Cartpage = () => {
  const [userauth, setuserauth] = useAuth()
  const [cart, setcart] = useCart()
  const [clienttoken, setclienttoken] = useState('')
  const [instance, setinstance] = useState(null)
  const navigate = useNavigate()

  const removecartitem = (pid) => {
    let mycart = [...cart]
    let index = mycart.findIndex((item) => item._id === pid)
    mycart.splice(index, 1)
    setcart(mycart)
    localStorage.setItem('cart', JSON.stringify(mycart))
  }

  const totalprice = () => {
    try {
      let total = 0
      cart.forEach((item) => {
        total = total + item.price
      })
      return total
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  const gettoken = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/braintree/token')
      setclienttoken(data.clientToken)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    gettoken()
  }, [userauth?.token])

  const handlepayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod()
      const { data } = await axios.post('http://localhost:8080/braintree/payment', {
        nonce,
        cart
      })
      localStorage.removeItem('cart')
      setcart([])
      alert('Payment successful')
      navigate('/dashboard/user/orders')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='cartpage'>
      <h2>{!userauth?.user ? 'Hello Guest' : `Hello ${userauth?.user.name}`}
      <p>
        {cart?.length ? `You have ${cart.length} items in your cart. ${userauth?.token ? '' : 'Please login to checkout.'}` : 'Your cart is empty.'}
      </p>
      </h2>
      <div className='parent-cart'>
        <div className='container'>
          {cart?.map((p) => (
            <div key={p._id} className='first'>
              <img src={`http://localhost:8080/uploads/${p.img}`} alt={p.name} width={200} />
              <div>
                <p><span>Product:</span>{p.name}</p>
                <p><span>Description:</span>{p.description}</p>
                <p><span>Price:</span>{p.price}</p>
                <button onClick={() => removecartitem(p._id)}>Remove item</button>
              </div>
            </div>
          ))}
        </div>
        <div className='second'>
          <h2>Cart Summary</h2>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total: {totalprice()}</h4>

          {userauth?.user?.address ? (
            <>
              <div>
                <h3>Current Address</h3>
                <h5>{userauth?.user?.address}</h5>
                <button onClick={() => navigate('/dashboard/user/edit')}>Update Address</button>
              </div>
            </>
          ) : (
            <div>
              {userauth?.token ? (
                <button onClick={() => navigate('/dashboard/user/edit')}>Update Address</button>
              ) : (
                <button onClick={() => navigate('/login')}>Please login to Checkout</button>
              )}
            </div>
          )}
          <div>
            {(!clienttoken || !userauth?.token || !cart?.length) ? (
              ''
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clienttoken,
                    paypal: {
                      flow: 'vault'
                    }
                  }}
                  onInstance={(instance) => setinstance(instance)}
                />
                <button disabled={!userauth?.user?.address || !instance} onClick={handlepayment}>
                  Make payment
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cartpage

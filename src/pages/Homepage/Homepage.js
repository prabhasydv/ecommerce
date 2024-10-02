import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './Homepage.css'
import { useCart } from '../Cartcontext/Cartcontext'

const Homepage = () => {
  const [product,setproduct] =useState([])
  const navigate = useNavigate()
  const [cart, setcart] = useCart()
  console.log(product)

      function addtocart(val){
        setcart([...cart,val])
        localStorage.setItem("cart",JSON.stringify([...cart,val]))
        alert("item added to cart")
      }

  async function allproduct(){
    const response = await axios.get("http://localhost:8080/allproduct")
    if(response.status===200){
      console.log(response)
      setproduct(response.data.products)
    }
  }

  useEffect(()=>{
    allproduct()
  },[])

  return (
    <div className='parent'>
        {
          product.map((val)=>(
            <>
            <div className='child'>
              <img onClick={()=>navigate(`/product/${val._id}`)} alt='product' src={`http://localhost:8080/uploads/${val.img}`}/>
              <p>{val.name}</p>
              <h3><span>Price:</span>{val.price}</h3>
              <button onClick={()=>navigate(`/product/${val._id}`)}>More detail</button>
              <button onClick={()=>addtocart(val)}>ADDTOCART</button>
            </div>
            </>
          ))
        }
    </div>
//     <div className="p-1 flex flex-wrap items-center justify-center">
//   {product.map((val) => (
//     <div key={val._id} className="flex-shrink-0 m-6 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg">
//       <div className="relative pt-10 px-10 flex items-center justify-center">
//         <div
//           className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
//           style={{
//             background: "radial-gradient(black, transparent 60%)",
//             transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
//             opacity: 0.2,
//           }}
//         ></div>
//         <img
//           onClick={() => navigate(`/product/${val._id}`)}
//           className="relative w-40 cursor-pointer"
//           alt="product"
//           src={`http://localhost:8080/uploads/${val.img}`}
//         />
//       </div>
//       <div className="relative text-white px-6 pb-6 mt-6">
//         <span className="block opacity-75 -mb-1">{val.category}</span>
//         <div className="flex justify-between">
//           <span className="block font-semibold text-xl">{val.name}</span>
//           <span className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
//             ${val.price}
//           </span>
//         </div>
//       </div>
//       <div className="flex justify-between px-6 pb-6 d-flex">
//       <button
//           className="bg-white text-orange-500 rounded-full px-3 py-2 cursor-pointer"
//           onClick={() => navigate(`/product/${val._id}`)}
//         >
//           More detail
//         </button>
//         <button
//           className="bg-white text-orange-500 rounded-full px-3 py-2 cursor-pointer"
//           onClick={() => addtocart(val)}
//         >
//           <FontAwesomeIcon icon={faCartShopping} />
//         </button>
//       </div>
//     </div>
//   ))}
// </div>


  )
}

export default Homepage

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Navbar';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Forgotpassword from './pages/Forgotpassword/Forgotpassword';
import Userdashboard from './user/Userdashboard';
import Adminroute from './route/Adminroute';
import Admindashboard from './Admin/Admindashboard';
import Priroute from './route/Priroute';
import Edituser from './user/Edituser';
import Addproduct from './Admin/Addproduct';
import Products from './Admin/Products';
import Editproduct from './Admin/Editproduct';
import Productdetail from './pages/Productdetail/Productdetail';
import Cartpage from './pages/Cartpage/Cartpage';
import Orders from './user/Orders';
import Adminorders from './Admin/Adminorders';


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgotpassword" element={<Forgotpassword/>} />
        <Route path="/product/:id" element={<Productdetail/>} />
        <Route path="/cart" element={<Cartpage/>} />

        
        {/* private routes */}

        <Route path='/dashboard' element={<Priroute/>}>
          <Route path='user' element={<Userdashboard/>}/>
          <Route path='user/edit' element={<Edituser/>}/>
          <Route path='user/orders' element={<Orders/>}/>

        </Route>
        <Route path='/dashboard' element={<Adminroute/>}>
          <Route path='admin' element={<Admindashboard/>}/>
          <Route path='admin/addproduct' element={<Addproduct/>}/>
          <Route path='admin/products' element={<Products/>}/>
          <Route path='admin/editproduct/:id' element={<Editproduct/>}/>
          <Route path='admin/orders' element={<Adminorders/>}/>
        </Route>


      </Routes>
    </div>
  );
}

export default App;

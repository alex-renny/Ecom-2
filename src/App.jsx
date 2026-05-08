import React from 'react'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'

import CommonNav from './CommonNav'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import AdminHome from './pages/AdminHome'
import UserProduct from './pages/UserProduct'
import AdminNav from './pages/AdminNav'
import UserNav from './pages/UserNav'
import UsersTable from './pages/UsersTable'
import AdminProduct from './pages/AdminProduct'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MyOrder from './pages/MyOrder'
import AdminOrder from './pages/AdminOrder'

function App() {

      let role=localStorage.getItem('Role')

  return (
    <div>

      <BrowserRouter>{

            role==='Admin' ? <AdminNav/> : role==='User' ? <UserNav/> : <CommonNav/>

      }

          <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='/Register' element={<Register/>}/>
              <Route path='/Login' element={<Login/>}/>
              <Route path='/AdminHome' element={<AdminHome/>}/>
              <Route path='/UserProduct' element={<UserProduct/>}/>
              <Route path='/UserTable' element={<UsersTable/>}/>
              <Route path='/AdminProduct' element={<AdminProduct/>}/>
              <Route path='/ProductList' element={<ProductList/>}/>
              <Route path='/Cart' element={<Cart/>}/>
              <Route path='/Checkout' element={<Checkout/>}/>
              <Route path='/MyOrder' element={<MyOrder/>}/>
              <Route path='/AdminOrder' element={<AdminOrder/>}/>
                       
          </Routes>
      
      </BrowserRouter>

    </div>
  )
}

export default App
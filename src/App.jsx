import React from 'react'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'

import CommonNav from './CommonNav'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import AdminHome from './pages/AdminHome'
import UserHome from './pages/UserHome'
import AdminNav from './pages/AdminNav'
import UserNav from './pages/UserNav'
import UsersTable from './pages/UsersTable'

function App() {

      let role=localStorage.getItem('Role')

  return (
    <div>

      <BrowserRouter>{

            role==='Admin' ? <AdminNav/> : role==='User' ? <UserNav/> : <CommonNav/>

      }

          <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='Register' element={<Register/>}/>
              <Route path='Login' element={<Login/>}/>
              <Route path='AdminHome' element={<AdminHome/>}/>
              <Route path='UserHome' element={<UserHome/>}/>
              <Route path='UserTable' element={<UsersTable/>}/>
                       
          </Routes>
      
      </BrowserRouter>

    </div>
  )
}

export default App
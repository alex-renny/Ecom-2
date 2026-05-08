import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminNav(){

    const navigate=useNavigate()

    const handlelogout=()=>{
            localStorage.removeItem('Role')
            navigate('/Login')
            window.location.reload()
    }
return (
    <div>

        <nav>
            <a href="/AdminHome">Home</a>
            <a href="/AdminProduct">Products</a>
            <a href="/UserTable">Users</a>
            <a href="/ProductList">Pro-List</a>
            <a href="">Orders</a>
            <button onClick={handlelogout}>Logout</button>
        </nav>

    </div>
  )
}

export default AdminNav

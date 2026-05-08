import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserNav() {

    const navigate=useNavigate()

    const handlelogout=()=>{
        localStorage.removeItem('Role')
        localStorage.removeItem('Loggeduser')
        navigate('/Login')
        window.location.reload()
    }
  return (
    <div>

        <nav>

            <a href="/UserProduct">Home</a>
            <a href="/Cart">Cart</a>
            <a href="">MyOrders</a>
            <button onClick={handlelogout}>Logout</button>

        </nav>

    </div>
  )
}

export default UserNav
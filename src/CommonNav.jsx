import React from 'react'
import { Link } from 'react-router-dom'
import './commonnav.css'

function CommonNav() {
  return (

    <nav className="C-navbar">

      <div className="logo">
    ZIVARA
      </div>

      <div className="C-nav-links">

        <Link to='/'>Home</Link>

        <Link to='/Register'>Register</Link>

        <Link to='/Login'>Login</Link>

      </div>

    </nav>

  )
}

export default CommonNav
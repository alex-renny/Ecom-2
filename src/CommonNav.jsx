import React from 'react'
import { Link } from 'react-router-dom'

function CommonNav() {
  return (
    <div>

        <nav>

            <Link to='/'>Home</Link>

            <Link to='/Register'>Register</Link>

            <Link to='/Login'>Login</Link>

        </nav>

    </div>
  )
}

export default CommonNav
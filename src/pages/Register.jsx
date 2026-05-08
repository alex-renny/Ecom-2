import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'

function Register() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    Username: '',
    Email: '',
    Password: '',
    Phone: ''
  })

  const handlechange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handlesubmit = () => {

    if (
      !user.Username ||
      !user.Email ||
      !user.Password ||
      !user.Phone
    ) {
      alert('All fields are required')
      return
    }

    let userDetails =
      JSON.parse(localStorage.getItem('User')) || []

    const exist = userDetails.find(
      (i) => i.Email === user.Email
    )

    if (exist) {
      alert('User Already Exists with the same Email')
      return
    }

    userDetails.push(user)

    localStorage.setItem(
      'User',
      JSON.stringify(userDetails)
    )

    alert('Registration Successful')

    navigate('/Login')
  }

  return (
    <div className="register-container">

      <div className="register-card">

        <h2>Create Account</h2>

        <p className="register-subtitle">
          Join us and explore premium footwear collections
        </p>

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            name="Username"
            onChange={handlechange}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="Email"
            onChange={handlechange}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="Password"
            onChange={handlechange}
          />
        </div>

        <div className="input-group">
          <label>Phone</label>
          <input
            type="text"
            placeholder="Enter phone number"
            name="Phone"
            onChange={handlechange}
          />
        </div>

        <button onClick={handlesubmit}>
          Register
        </button>

      </div>

    </div>
  )
}

export default Register
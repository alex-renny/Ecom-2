import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Login() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    Email: '',
    Password: ''
  })

  const handledata = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handlelogin = () => {

    const AdminMail = 'admin@gmail.com'
    const AdminPw = '1234'

    if (!user.Email || !user.Password) {
      alert('Both Fields are Required')
      return
    }

    // ADMIN LOGIN

    if (
      user.Email === AdminMail &&
      user.Password === AdminPw
    ) {

      localStorage.setItem('Role', 'Admin')

      alert('Admin Logged Successfully')

      navigate('/AdminHome')

      window.location.reload()

      return
    }

    // USER LOGIN

    let userDetails =
      JSON.parse(localStorage.getItem('User')) || []

    const exist = userDetails.find(
      (i) =>
        i.Email === user.Email &&
        i.Password === user.Password
    )

    if (exist) {

      localStorage.setItem(
        'Loggeduser',
        JSON.stringify(user)
      )

      localStorage.setItem('Role', 'User')

      alert('Login Successful')

      navigate('/UserProduct')

      window.location.reload()

    } else {

      alert('Account Not Found')

      navigate('/Register')
    }
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Welcome Back</h2>

        <p className="login-subtitle">
          Login to continue your shopping experience
        </p>

        <div className="input-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            name="Email"
            onChange={handledata}
          />

        </div>

        <div className="input-group">

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            name="Password"
            onChange={handledata}
          />

        </div>

        <button className='login-btn' onClick={handlelogin}>
          Login
        </button>

      </div>

    </div>
  )
}

export default Login
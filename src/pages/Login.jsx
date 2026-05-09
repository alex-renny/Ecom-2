import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Login() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    Email: '',
    Password: ''
  })

  const [focused, setFocused] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handledata = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleFocus = (name) => {
    setFocused({ ...focused, [name]: true })
  }

  const handleBlur = (name) => {
    if (!user[name]) {
      setFocused({ ...focused, [name]: false })
    }
  }

  const handlelogin = () => {
    const AdminMail = 'admin@gmail.com'
    const AdminPw = '1234'

    if (!user.Email || !user.Password) {
      alert('Both Fields are Required')
      return
    }

    // ADMIN LOGIN
    if (user.Email === AdminMail && user.Password === AdminPw) {
      localStorage.setItem('Role', 'Admin')
      alert('Admin Logged Successfully')
      navigate('/AdminHome')
      window.location.reload()
      return
    }

    // USER LOGIN
    let userDetails = JSON.parse(localStorage.getItem('User')) || []

    const exist = userDetails.find(
      (i) => i.Email === user.Email && i.Password === user.Password
    )

    if (exist) {
      localStorage.setItem('Loggeduser', JSON.stringify(user))
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
      <div className="decor-circle decor-1"></div>
      <div className="decor-circle decor-2"></div>
      <div className="decor-circle decor-3"></div>
      <div className="decor-line decor-line-1"></div>
      <div className="decor-line decor-line-2"></div>

      <div className="login-card">
        <div className="card-header">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to continue your premium shopping experience
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handlelogin(); }}>
          <div className="input-group">
            <label>
              <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="john@example.com"
                name="Email"
                value={user.Email}
                onChange={handledata}
                onFocus={() => handleFocus('Email')}
                onBlur={() => handleBlur('Email')}
              />
              <span className="input-border"></span>
            </div>
          </div>

          <div className="input-group">
            <label>
              <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                <path d="M17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Password
            </label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="Password"
                value={user.Password}
                onChange={handledata}
                onFocus={() => handleFocus('Password')}
                onBlur={() => handleBlur('Password')}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94C16.23 19.24 14.18 20 12 20C5 20 1 12 1 12C1 12 2.73 8.08 6.06 5.06M9.9 4.24C10.58 4.08 11.28 4 12 4C19 4 23 12 23 12C23 12 21.27 15.92 17.94 18.94" stroke="currentColor" strokeWidth="2"/>
                    <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2"/>
                    <path d="M14.12 14.12C13.56 14.68 12.8 15 12 15C10.34 15 9 13.66 9 12C9 11.2 9.32 10.44 9.88 9.88" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
              <span className="input-border"></span>
            </div>
          </div>

          <div className="remember-forgot">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="remember-text">Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            <span>Sign In</span>
            <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>
          <button className="social-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </button>
          <button className="social-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>
        </div>

        <p className="register-link">
          Don't have an account? <a href="/Register">Create one</a>
        </p>
      </div>
    </div>
  )
}

export default Login
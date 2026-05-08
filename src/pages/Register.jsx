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

  const [focused, setFocused] = useState({})

  const handlechange = (e) => {
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

  const handlesubmit = () => {
    if (!user.Username || !user.Email || !user.Password || !user.Phone) {
      alert('All fields are required')
      return
    }

    let userDetails = JSON.parse(localStorage.getItem('User')) || []
    const exist = userDetails.find((i) => i.Email === user.Email)

    if (exist) {
      alert('User Already Exists with the same Email')
      return
    }

    userDetails.push(user)
    localStorage.setItem('User', JSON.stringify(userDetails))
    alert('Registration Successful')
    navigate('/Login')
  }

  return (
    <div className="register-container">
      <div className="decor-circle decor-1"></div>
      <div className="decor-circle decor-2"></div>
      <div className="decor-circle decor-3"></div>

      <div className="register-card">
        <div className="card-header">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Create Account</h1>
          <p className="register-subtitle">
            Step into style with our premium collection
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handlesubmit(); }}>
          <div className="input-group">
            <label>
              <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Username
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="John Doe"
                name="Username"
                value={user.Username}
                onChange={handlechange}
                onFocus={() => handleFocus('Username')}
                onBlur={() => handleBlur('Username')}
              />
              <span className="input-border"></span>
            </div>
          </div>

          <div className="input-group">
            <label>
              <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Email
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="john@example.com"
                name="Email"
                value={user.Email}
                onChange={handlechange}
                onFocus={() => handleFocus('Email')}
                onBlur={() => handleBlur('Email')}
              />
              <span className="input-border"></span>
            </div>
          </div>

          <div className="input-group">
            <label>
              <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Password
            </label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="••••••••"
                name="Password"
                value={user.Password}
                onChange={handlechange}
                onFocus={() => handleFocus('Password')}
                onBlur={() => handleBlur('Password')}
              />
              <span className="input-border"></span>
            </div>
          </div>

          <div className="input-group">
            <label>
              <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V5C2 3.9 2.9 3 4 3H20C21.1 3 22 3.9 22 5V7.08C22 8.11 21.36 9.05 20.41 9.32C19.6 9.56 19 10.27 19 11.12V12.88C19 13.73 19.6 14.44 20.41 14.68C21.36 14.95 22 15.89 22 16.92Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 12H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Phone
            </label>
            <div className="input-wrapper">
              <input
                type="tel"
                placeholder="+91 0000000000"
                name="Phone"
                value={user.Phone}
                onChange={handlechange}
                onFocus={() => handleFocus('Phone')}
                onBlur={() => handleBlur('Phone')}
              />
              <span className="input-border"></span>
            </div>
          </div>

          <div className="terms-section">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              <span className="terms-text">
                I agree to the <a href="#">Terms</a> & <a href="#">Privacy Policy</a>
              </span>
            </label>
          </div>

          <button type="submit" className="submit-btn">
            <span>Create Account</span>
            <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/Login">Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default Register
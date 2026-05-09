import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './usernav.css'

function UserNav() {
    const navigate = useNavigate()
    const location = useLocation()

    const handlelogout = () => {
        localStorage.removeItem('Role')
        localStorage.removeItem('Loggeduser')
        navigate('/Login')
        window.location.reload()
    }

    // Get current user info for welcome message
    const loggedUser = JSON.parse(localStorage.getItem('Loggeduser') || '{}')
    const userName = loggedUser.Name || loggedUser.Email?.split('@')[0] || 'User'

    // Check if link is active
    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <nav className="user-nav">
            <div className="nav-container">
                <div className="nav-brand">
                    <div className="brand-logo">
                        <span className="logo-icon">🥿</span>
                        <span className="brand-name">ZIVARA</span>
                    </div>
                    <div className="welcome-message">
                        <span className="welcome-text">Welcome,</span>
                        <span className="user-name">{userName}</span>
                    </div>
                </div>

                <div className="nav-links">
                    <a 
                        href="/UserProduct" 
                        className={`nav-link ${isActive('/UserProduct') ? 'active' : ''}`}
                    >
                        <span className="nav-icon">🏠</span>
                        <span>Home</span>
                    </a>
                    
                    <a 
                        href="/Cart" 
                        className={`nav-link ${isActive('/Cart') ? 'active' : ''}`}
                    >
                        <span className="nav-icon">🛒</span>
                        <span>Cart</span>
                        <span className="cart-badge">0</span>
                    </a>
                    
                    <a 
                        href="/MyOrder" 
                        className={`nav-link ${isActive('/MyOrder') ? 'active' : ''}`}
                    >
                        <span className="nav-icon">📦</span>
                        <span>My Orders</span>
                    </a>
                    
                    <button onClick={handlelogout} className="logout-btn">
                        <span className="nav-icon">🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default UserNav
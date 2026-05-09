import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './UserNav.css'

function UserNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const updateCartCount = () => {
            const user = JSON.parse(localStorage.getItem('Loggeduser') || '{}')
            const cart = JSON.parse(localStorage.getItem('Cart') || '[]')
            const userCartItems = cart.filter(item => item.user === user.Email)
            setCartCount(userCartItems.length)
        }

        updateCartCount()
        
        // Listen for storage changes
        window.addEventListener('storage', updateCartCount)
        
        return () => {
            window.removeEventListener('storage', updateCartCount)
        }
    }, [])

    const handlelogout = () => {
        localStorage.removeItem('Role')
        localStorage.removeItem('Loggeduser')
        navigate('/Login')
        window.location.reload()
    }

    const loggedUser = JSON.parse(localStorage.getItem('Loggeduser') || '{}')
    const userName = loggedUser.Name || loggedUser.Email?.split('@')[0] || 'User'

    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <nav className="user-nav">
            <div className="nav-container">
                <div className="nav-brand">
                    <div className="brand-logo">
                        <span className="logo-icon">⌚</span>
                        <span className="brand-name">WatchLux</span>
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
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
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
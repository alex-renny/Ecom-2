import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './userNav.css'

function UserNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const [cartCount, setCartCount] = useState(0)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        
        // Custom event for cart updates
        window.addEventListener('cartUpdated', updateCartCount)
        
        return () => {
            window.removeEventListener('storage', updateCartCount)
            window.removeEventListener('cartUpdated', updateCartCount)
        }
    }, [])

    const handlelogout = () => {
        localStorage.removeItem('Role')
        localStorage.removeItem('Loggeduser')
        navigate('/Login')
        window.location.reload()
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const loggedUser = JSON.parse(localStorage.getItem('Loggeduser') || '{}')
    const userName = loggedUser.Username || loggedUser.Email?.split('@')[0] || 'User'

    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <nav className="user-nav">
            <div className="nav-container">
                <div className="nav-brand">
                    <div className="brand-logo" onClick={() => navigate('/UserProduct')}>
                        {/* <span className="logo-icon">👟</span> */}
                        <span className="brand-name">ZIVARA</span>
                    </div>
                    <div className="welcome-message">
                        <span className="welcome-text">Welcome,</span>
                        <span className="user-name">{userName}</span>
                    </div>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button 
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Navigation Links */}
                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <a 
                        href="/UserProduct" 
                        className={`nav-link ${isActive('/UserProduct') ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                    >
                        <span className="nav-icon">🏠</span>
                        <span>Home</span>
                    </a>
                    
                    <a 
                        href="/Cart" 
                        className={`nav-link cart-link ${isActive('/Cart') ? 'active' : ''}`}
                        onClick={closeMobileMenu}
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
                        onClick={closeMobileMenu}
                    >
                        <span className="nav-icon">📦</span>
                        <span>My Orders</span>
                    </a>
                    
                    <button 
                        onClick={() => {
                            closeMobileMenu()
                            handlelogout()
                        }} 
                        className="U-logout-btn"
                    >
                        <span className="nav-icon">🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="mobile-overlay" onClick={closeMobileMenu}></div>
            )}
        </nav>
    )
}

export default UserNav
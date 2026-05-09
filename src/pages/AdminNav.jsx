import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  FiHome, 
  FiPackage, 
  FiUsers, 
  FiList, 
  FiShoppingBag, 
  FiLogOut, 
  FiMenu, 
  FiX
} from "react-icons/fi"
import './AdminNav.css'

function AdminNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handlelogout = () => {
        localStorage.removeItem('Role')
        navigate('/Login')
        window.location.reload()
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const isActive = (path) => {
        return location.pathname === path ? 'active' : ''
    }

    return (
        <div className="admin-nav-container">
            <nav className="admin-nav">
                {/* Brand/Logo */}
                <a href="/AdminHome" className="nav-brand" onClick={closeMobileMenu}>
                    <div className="nav-brand-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 3H7C8.06087 3 9.07828 3.42143 9.82843 4.17157C10.5786 4.92172 11 5.93913 11 7V21C11 20.2044 10.6839 19.4413 10.1213 18.8787C9.55871 18.3161 8.79565 18 8 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 3H17C15.9391 3 14.9217 3.42143 14.1716 4.17157C13.4214 4.92172 13 5.93913 13 7V21C13 20.2044 13.3161 19.4413 13.8787 18.8787C14.4413 18.3161 15.2044 18 16 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="nav-brand-text">
                        TREXO
                    </div>
                </a>

                {/* Mobile Menu Toggle */}
                <button className="mobile-toggle" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Navigation Links */}
                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li>
                        <a 
                            href="/AdminHome" 
                            className={`nav-link ${isActive('/AdminHome')}`}
                            onClick={closeMobileMenu}
                        >
                            <FiHome className="nav-icon" />
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/AdminProduct" 
                            className={`nav-link ${isActive('/AdminProduct')}`}
                            onClick={closeMobileMenu}
                        >
                            <FiPackage className="nav-icon" />
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/UserTable" 
                            className={`nav-link ${isActive('/UserTable')}`}
                            onClick={closeMobileMenu}
                        >
                            <FiUsers className="nav-icon" />
                            <span>Users</span>
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/ProductList" 
                            className={`nav-link ${isActive('/ProductList')}`}
                            onClick={closeMobileMenu}
                        >
                            <FiList className="nav-icon" />
                            <span>Pro-List</span>
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/AdminOrder" 
                            className={`nav-link ${isActive('/AdminOrder')}`}
                            onClick={closeMobileMenu}
                        >
                            <FiShoppingBag className="nav-icon" />
                            <span>Orders</span>
                        </a>
                    </li>
                </ul>

                {/* Logout Button */}
                <div className="nav-actions">
                    <button onClick={handlelogout} className="logout-btn">
                        <FiLogOut className="logout-icon" />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default AdminNav
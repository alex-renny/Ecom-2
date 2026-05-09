import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './cart.css'

function Cart() {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCart()
    }, [])

    const loadCart = () => {
        setLoading(true)
        let user = JSON.parse(localStorage.getItem('Loggeduser'))
        
        if (!user) {
            setCart([])
            setLoading(false)
            return
        }
        
        let data = JSON.parse(localStorage.getItem('Cart')) || []
        let usercart = data.filter(item => item.user === user?.Email)
        setCart(usercart)
        setLoading(false)
    }

    const removeitem = (index, itemName) => {
        let updatedcart = [...cart]
        updatedcart.splice(index, 1)
        
        // Update localStorage with the new cart
        let user = JSON.parse(localStorage.getItem('Loggeduser'))
        let allCart = JSON.parse(localStorage.getItem('Cart')) || []
        let filteredCart = allCart.filter(item => item.user !== user?.Email)
        let newCart = [...filteredCart, ...updatedcart]
        
        setCart(updatedcart)
        localStorage.setItem('Cart', JSON.stringify(newCart))
        
        // Show sweet alert style notification
        showNotification(`${itemName} removed from cart`, 'success')
    }

    const showNotification = (message, type) => {
        const notification = document.createElement('div')
        notification.className = `notification ${type}`
        notification.textContent = message
        document.body.appendChild(notification)
        
        setTimeout(() => {
            notification.classList.add('show')
        }, 100)
        
        setTimeout(() => {
            notification.classList.remove('show')
            setTimeout(() => notification.remove(), 300)
        }, 2000)
    }

    const updateQuantity = (index, change) => {
        let updatedcart = [...cart]
        const newQuantity = (updatedcart[index].quantity || 1) + change
        
        if (newQuantity < 1) return
        
        updatedcart[index].quantity = newQuantity
        setCart(updatedcart)
        
        // Update localStorage
        let user = JSON.parse(localStorage.getItem('Loggeduser'))
        let allCart = JSON.parse(localStorage.getItem('Cart')) || []
        let otherItems = allCart.filter(item => item.user !== user?.Email)
        let updatedItems = updatedcart.map(item => ({ ...item, user: user?.Email }))
        let newCart = [...otherItems, ...updatedItems]
        localStorage.setItem('Cart', JSON.stringify(newCart))
    }

    const total = cart.reduce((sum, item) => {
        const price = Number(item.price)
        const quantity = item.quantity || 1
        return sum + (price * quantity)
    }, 0)

    const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

    if (loading) {
        return (
            <div className="cart-loading">
                <div className="loading-spinner"></div>
                <p>Loading your cart...</p>
            </div>
        )
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>My Shopping Cart</h1>
                <p className="cart-subtitle">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
            </div>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any items yet</p>
                    <Link to="/UserProduct" className="continue-shopping-btn">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="cart-content">
                        <div className="cart-items">
                            {cart.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <div className="item-price">₹{Number(item.price).toLocaleString()}</div>
                                        <div className="item-quantity">
                                            <button 
                                                className="qty-btn"
                                                onClick={() => updateQuantity(index, -1)}
                                            >
                                                −
                                            </button>
                                            <span className="qty-value">{item.quantity || 1}</span>
                                            <button 
                                                className="qty-btn"
                                                onClick={() => updateQuantity(index, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="item-total">
                                        <div className="item-total-label">Total</div>
                                        <div className="item-total-price">
                                            ₹{((item.quantity || 1) * Number(item.price)).toLocaleString()}
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="remove-item-btn"
                                        onClick={() => removeitem(index, item.name)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="summary-header">
                                <h3>Order Summary</h3>
                            </div>
                            
                            <div className="summary-details">
                                <div className="summary-row">
                                    <span>Subtotal ({itemCount} items)</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span className="free-ship">FREE</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax (GST)</span>
                                    <span>₹{(total * 0.18).toLocaleString()}</span>
                                </div>
                                <div className="summary-divider"></div>
                                <div className="summary-row total-row">
                                    <span>Total Amount</span>
                                    <span>₹{(total + (total * 0.18)).toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <Link to="/Checkout" className="checkout-btn">
                                Proceed to Checkout →
                            </Link>
                            
                            <Link to="/UserProduct" className="continue-shop-link">
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart
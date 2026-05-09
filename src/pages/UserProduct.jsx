import React, { useState, useEffect } from 'react'
import './userproduct.css' // Import the CSS file

function UserProduct() {
    const [product, setProduct] = useState([])
    const [addedToCart, setAddedToCart] = useState({})

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('Products'))

        // DEFAULT PRODUCTS
        if (!data || data.length === 0) {
            const defaultproducts = [
                    {
                        name: 'Urban Comfort Slides',
                        price: 999,
                        image: 'https://i.pinimg.com/1200x/bb/89/4e/bb894e1691e05a976a07f75d5bcdf5a5.jpg'
                    },
                    {
                        name: 'Classic Brown Slippers',
                        price: 2999,
                        image: 'https://i.pinimg.com/736x/0d/d6/6c/0dd66cf8025912507d5d92fb314f3296.jpg'
                    },
                    {
                        name: 'Premium Leather Slides',
                        price: 1299,
                        image: 'https://i.pinimg.com/1200x/7e/4d/9c/7e4d9cb65a4e2ca8db7a396c8018804b.jpg'
                    },
                    {
                        name: 'Casual Home Slippers',
                        price: 599,
                        image: 'https://i.pinimg.com/1200x/ac/0b/8d/ac0b8df8bb360671b6b061c8de7354d1.jpg'
                    },
                    {
                        name: 'Soft Walk Sandals',
                        price: 1499,
                        image: 'https://i.pinimg.com/736x/49/68/a8/4968a82f3d3bdbe58d2a2220fea1f247.jpg'
                    },
                    {
                        name: 'Elite Fashion Slides',
                        price: 2499,
                        image: 'https://i.pinimg.com/736x/84/57/2e/84572e33229ebb999e3b4d3239e86f70.jpg'
                    },
                    {
                        name: 'Luxury Comfort Slippers',
                        price: 2199,
                        image: 'https://i.pinimg.com/1200x/78/d7/6b/78d76b652f293e6be8d5caf6271a5720.jpg'
                    },
                    {
                        name: 'Daily Wear Sandals',
                        price: 1799,
                        image: 'https://i.pinimg.com/736x/84/57/2e/84572e33229ebb999e3b4d3239e86f70.jpg'
                    },
                ]

            localStorage.setItem('Products', JSON.stringify(defaultproducts))
            setProduct(defaultproducts)
        } else {
            setProduct(data)
        }
    }, [])

    const addtocart = (product, index) => {
        let user = JSON.parse(localStorage.getItem('Loggeduser'))
        
        // Check if user is logged in
        if (!user || !user.Email) {
            alert('Please login first to add items to cart')
            return
        }
        
        let cart = JSON.parse(localStorage.getItem('Cart')) || []
        
        let exist = cart.find(
            item => item.name === product.name && item.user === user.Email
        )
        
        if (exist) {
            alert('Product Already in the Cart')
            return
        }
        
        let newitem = {
            ...product,
            user: user.Email,
            addedAt: new Date().toISOString()
        }
        
        cart.push(newitem)
        localStorage.setItem('Cart', JSON.stringify(cart))
        
        // Show success animation
        setAddedToCart({ [index]: true })
        setTimeout(() => {
            setAddedToCart({})
        }, 1000)
        
        alert('Product Added to Cart')
    }

    return (
        <div className="products-container">
            <div className="products-header">
                <h1>Our Collection</h1>
                <p>Discover premium footwears crafted for your lifestyle</p>
            </div>

            {product.length === 0 ? (
                <div className="no-products">
                    <div className="no-products-icon">🕐</div>
                    <p>No Products Found</p>
                    <p className="no-products-subtitle">Check back later for new arrivals</p>
                </div>
            ) : (
                <div className="products-grid">
                    {product.map((item, index) => (
                        <div key={index} className="product-card">
                            <div className="product-image-container">
                                <img src={item.image} alt={item.name} />
                                <div className="product-overlay">
                                    <span className="product-badge">New</span>
                                </div>
                            </div>
                            <div className="product-info">
                                <h2>{item.name}</h2>
                                <div className="product-rating">
                                    <span className="stars">★★★★★</span>
                                    <span className="rating-count">(128 reviews)</span>
                                </div>
                                <p className="product-price">₹{item.price.toLocaleString()}</p>
                                <div className="product-actions">
                                    <button 
                                        className={`add-to-cart-btn ${addedToCart[index] ? 'added' : ''}`}
                                        onClick={() => addtocart(item, index)}
                                    >
                                        {addedToCart[index] ? '✓ Added!' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserProduct
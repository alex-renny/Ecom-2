import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MyOrder.css'

function MyOrder() {
    const [myorders, setMyorders] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState('all')

    const user = JSON.parse(localStorage.getItem('Loggeduser'))

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = () => {
        setLoading(true)
        const storedorders = JSON.parse(localStorage.getItem('Orders')) || []
        const filteredorders = storedorders.filter(
            item => item.user === user?.Email
        )
        
        // Sort orders by date (newest first)
        const sortedOrders = filteredorders.sort((a, b) => 
            new Date(b.orderDate) - new Date(a.orderDate)
        )
        
        setMyorders(sortedOrders)
        setLoading(false)
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'Delivered':
                return 'status-delivered'
            case 'Shipped':
                return 'status-shipped'
            case 'Processing':
                return 'status-processing'
            case 'Cancelled':
                return 'status-cancelled'
            default:
                return 'status-pending'
        }
    }

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Delivered':
                return '✓'
            case 'Shipped':
                return '🚚'
            case 'Processing':
                return '⚙️'
            case 'Cancelled':
                return '✗'
            default:
                return '⏳'
        }
    }

    const filteredOrders = myorders.filter(order => {
        if (filterStatus === 'all') return true
        return order.status?.toLowerCase() === filterStatus.toLowerCase()
    })

    const orderStats = {
        total: myorders.length,
        delivered: myorders.filter(o => o.status === 'Delivered').length,
        processing: myorders.filter(o => o.status === 'Processing').length,
        shipped: myorders.filter(o => o.status === 'Shipped').length,
        totalSpent: myorders.reduce((sum, order) => sum + (order.total || order.price), 0)
    }

    if (loading) {
        return (
            <div className="orders-loading">
                <div className="loading-spinner"></div>
                <p>Loading your orders...</p>
            </div>
        )
    }

    return (
        <div className="orders-container">
            <div className="orders-header">
                <h1>My Orders</h1>
                <p>Track and manage your orders</p>
            </div>

            {/* Order Statistics Cards */}
            {myorders.length > 0 && (
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-icon">📦</div>
                        <div className="stat-info">
                            <h3>{orderStats.total}</h3>
                            <p>Total Orders</p>
                        </div>
                    </div>
                    {/* <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-info">
                            <h3>{orderStats.delivered}</h3>
                            <p>Delivered</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🚚</div>
                        <div className="stat-info">
                            <h3>{orderStats.shipped + orderStats.processing}</h3>
                            <p>In Transit</p>
                        </div>
                    </div> */}
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-info">
                            <h3>₹{orderStats.totalSpent.toLocaleString()}</h3>
                            <p>Total Spent</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Tabs */}
            {myorders.length > 0 && (
                <div className="order-filters">
                    <button 
                        className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('all')}
                    >
                        All Orders
                    </button>
                    {/* <button 
                        className={`filter-btn ${filterStatus === 'processing' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('processing')}
                    >
                        Processing
                    </button>
                    <button 
                        className={`filter-btn ${filterStatus === 'shipped' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('shipped')}
                    >
                        Shipped
                    </button>
                    <button 
                        className={`filter-btn ${filterStatus === 'delivered' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('delivered')}
                    >
                        Delivered
                    </button> */}
                </div>
            )}

            {myorders.length === 0 ? (
                <div className="no-orders">
                    <div className="no-orders-icon">📭</div>
                    <h2>No Orders Yet</h2>
                    <p>Looks like you haven't placed any orders yet</p>
                    <Link to="/UserProduct" className="start-shopping-btn">
                        Start Shopping
                    </Link>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="no-filtered-orders">
                    <p>No orders found with status: {filterStatus}</p>
                    <button onClick={() => setFilterStatus('all')} className="clear-filter-btn">
                        View All Orders
                    </button>
                </div>
            ) : (
                <div className="orders-list">
                    {filteredOrders.map((order, index) => (
                        <div key={order.id || index} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <span className="order-id">Order #{order.id || `ORD${String(index + 1).padStart(4, '0')}`}</span>
                                    <span className="order-date">
                                        {new Date(order.orderDate || Date.now()).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className={`order-status ${getStatusColor(order.status || 'Processing')}`}>
                                    <span className="status-icon">{getStatusIcon(order.status || 'Processing')}</span>
                                    <span>{order.status || 'Processing'}</span>
                                </div>
                            </div>

                            <div className="order-body">
                                <div className="order-product">
                                    {order.image && (
                                        <div className="product-image">
                                            <img src={order.image} alt={order.name} />
                                        </div>
                                    )}
                                    <div className="product-details">
                                        <h3>{order.name}</h3>
                                        {order.description && <p>{order.description}</p>}
                                        <div className="product-meta">
                                            <span className="product-price">₹{Number(order.price || order.total).toLocaleString()}</span>
                                            {order.quantity && (
                                                <span className="product-quantity">Qty: {order.quantity}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {order.items && order.items.length > 0 && (
                                    <div className="order-items-list">
                                        <h4>Items in this order:</h4>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="order-item-mini">
                                                <span>{item.name}</span>
                                                <span>Qty: {item.quantity}</span>
                                                <span>₹{Number(item.price).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="order-footer">
                                <div className="order-total">
                                    <span>Total Amount:</span>
                                    <strong>₹{(order.total || order.price || 0).toLocaleString()}</strong>
                                </div>
                                <div className="order-actions">
                                    <button className="track-order-btn">
                                        Track Order
                                    </button>
                                    <button className="reorder-btn">
                                        Buy Again
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

export default MyOrder
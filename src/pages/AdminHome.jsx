import React, { useState, useEffect } from 'react'
import { 
  FiUser, 
  FiShoppingBag, 
  FiPackage, 
  FiTrendingUp, 
  FiDollarSign, 
  FiUsers, 
  FiClock, 
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
  FiBarChart2,
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw
} from "react-icons/fi"
import './AdminHome.css'

function AdminHome() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [timeFilter, setTimeFilter] = useState('all')

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = () => {
    setLoading(true)
    
    // Load all data from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('Orders')) || []
    const storedProducts = JSON.parse(localStorage.getItem('Products')) || []
    const storedUsers = JSON.parse(localStorage.getItem('User')) || []
    const storedCart = JSON.parse(localStorage.getItem('Cart')) || []

    setOrders(storedOrders)
    setProducts(storedProducts)
    setUsers(storedUsers)
    setCart(storedCart)

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  // Calculate real statistics
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.price || 0), 0)
  const totalOrders = orders.length
  const totalCustomers = users.length
  const totalProducts = products.length

  // Get recent orders (last 5)
  const recentOrders = orders.slice(-5).reverse()

  // Get top products by order count
  const getTopProducts = () => {
    const productCount = {}
    orders.forEach(order => {
      if (order.name) {
        productCount[order.name] = (productCount[order.name] || 0) + 1
      }
    })
    
    return Object.entries(productCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count], index) => ({
        name,
        orders: count,
        revenue: orders
          .filter(o => o.name === name)
          .reduce((sum, o) => sum + Number(o.price || 0), 0)
      }))
  }

  const topProducts = getTopProducts()

  // Get order status distribution
  const getOrderStats = () => {
    const completed = orders.filter(o => o.status === 'Completed' || !o.status).length
    const processing = orders.filter(o => o.status === 'Processing').length
    const pending = orders.filter(o => o.status === 'Pending').length
    
    return { completed, processing, pending, total: orders.length }
  }

  const orderStats = getOrderStats()

  // Calculate growth (comparing with previous period)
  const calculateGrowth = () => {
    const midPoint = Math.floor(orders.length / 2)
    const recentOrders = orders.slice(midPoint)
    const oldOrders = orders.slice(0, midPoint)
    
    const recentRevenue = recentOrders.reduce((sum, o) => sum + Number(o.price || 0), 0)
    const oldRevenue = oldOrders.reduce((sum, o) => sum + Number(o.price || 0), 0)
    
    if (oldRevenue === 0) return 100
    return ((recentRevenue - oldRevenue) / oldRevenue * 100).toFixed(1)
  }

  const revenueGrowth = calculateGrowth()

  // Filter orders based on search
  const filteredOrders = recentOrders.filter(order => {
    if (!searchTerm) return true
    return (
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Stats cards data
  const stats = [
    {
      id: 1,
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: <FiDollarSign />,
      change: `${revenueGrowth}%`,
      isPositive: parseFloat(revenueGrowth) >= 0,
      color: '#8B6914',
      bgColor: '#FFF8E1'
    },
    {
      id: 2,
      title: 'Total Orders',
      value: totalOrders,
      icon: <FiShoppingBag />,
      change: `+${orderStats.processing} active`,
      isPositive: true,
      color: '#D4A853',
      bgColor: '#FFFBEB'
    },
    {
      id: 3,
      title: 'Total Customers',
      value: totalCustomers,
      icon: <FiUsers />,
      change: `${users.length} registered`,
      isPositive: true,
      color: '#8B6914',
      bgColor: '#FFF8E1'
    },
    {
      id: 4,
      title: 'Total Products',
      value: totalProducts,
      icon: <FiPackage />,
      change: `${cart.length} in carts`,
      isPositive: true,
      color: '#D4A853',
      bgColor: '#FFFBEB'
    }
  ]

  // Order status summary
  const orderSummary = [
    { label: 'Completed', count: orderStats.completed, color: '#10B981', icon: <FiCheckCircle /> },
    { label: 'Processing', count: orderStats.processing, color: '#D4A853', icon: <FiRefreshCw /> },
    { label: 'Pending', count: orderStats.pending, color: '#EF4444', icon: <FiAlertCircle /> }
  ]

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="admin-container">
      {/* Header Section */}
      <div className="admin-header">
        <div className="header-left">
          <h1>Dashboard Overview</h1>
          {/* <p>Welcome back! Here's what's happening with your store today.</p> */}
        </div>
        <div className="header-right">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search orders, products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <button className="refresh-btn" onClick={loadAllData}>
            <FiRefreshCw className={loading ? 'spinning' : ''} />
            Refresh
          </button> */}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className="stat-card" 
            style={{ borderTopColor: stat.color }}
          >
            <div className="stat-content">
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
                <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                  {stat.isPositive ? <FiArrowUp /> : <FiArrowDown />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div 
                className="stat-icon" 
                style={{ 
                  backgroundColor: stat.bgColor, 
                  color: stat.color 
                }}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-grid">
        {/* Revenue Overview Section */}
        <div className="chart-section">
          <div className="section-header">
            <h2>Revenue Overview</h2>
            <select 
              className="time-select"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          {/* Order Status Summary */}
          <div className="order-summary">
            {orderSummary.map((item, index) => (
              <div key={index} className="summary-item">
                <div className="summary-icon" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div className="summary-info">
                  <span className="summary-count">{item.count}</span>
                  <span className="summary-label">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Revenue Chart */}
          <div className="chart-placeholder">
            <div className="chart-header">
              <span className="chart-title">Revenue Trend</span>
              <span className="chart-total">Total: ${totalRevenue.toFixed(2)}</span>
            </div>
            <div className="chart-bars">
              {orders.length > 0 ? (
                orders.slice(-7).map((order, index) => (
                  <div key={index} className="chart-bar-container">
                    <div 
                      className="chart-bar" 
                      style={{ 
                        height: `${(Number(order.price) / totalRevenue) * 100 + 20}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <span className="bar-value">${order.price}</span>
                    </div>
                    <span className="bar-label">
                      {order.user ? order.user.substring(0, 4) : `Day ${index + 1}`}
                    </span>
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <FiBarChart2 />
                  <p>No revenue data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="recent-orders-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <span className="order-count">{totalOrders} total</span>
          </div>
          <div className="orders-list">
            {filteredOrders.length > 0 ? (
              filteredOrders.slice(0, 5).map((order, index) => (
                <div key={index} className="order-item">
                  <div className="order-info">
                    <div className="order-avatar">
                      <FiUser />
                    </div>
                    <div className="order-details">
                      <p className="customer-name">{order.user || 'Anonymous'}</p>
                      <p className="product-name">{order.name}</p>
                    </div>
                  </div>
                  <div className="order-meta">
                    <span className="order-amount">${order.price}</span>
                    <span className={`order-status status-${(order.status || 'completed').toLowerCase()}`}>
                      {order.status || 'Completed'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-orders">
                <FiShoppingBag />
                <p>No recent orders found</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products Section */}
        <div className="top-products-section">
          <div className="section-header">
            <h2>Top Products</h2>
            <span className="product-count">{products.length} total</span>
          </div>
          <div className="products-list">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <div className="product-stats">
                      <span className="product-orders">{product.orders} orders</span>
                      <span className="product-revenue">${product.revenue.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className={`product-trend ${parseFloat(revenueGrowth) >= 0 ? 'up' : 'down'}`}>
                    {parseFloat(revenueGrowth) >= 0 ? <FiTrendingUp /> : <FiArrowDown />}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <FiPackage />
                <p>No products sold yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="quick-stats-section">
          <div className="section-header">
            <h2>Store Overview</h2>
          </div>
          <div className="quick-stats-grid">
            <div className="quick-stat-item">
              <div className="quick-stat-icon" style={{ backgroundColor: '#FEF3C7' }}>
                <FiShoppingBag style={{ color: '#D4A853' }} />
              </div>
              <div className="quick-stat-info">
                <span className="quick-stat-value">{cart.length}</span>
                <span className="quick-stat-label">Items in Cart</span>
              </div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-icon" style={{ backgroundColor: '#D1FAE5' }}>
                <FiCheckCircle style={{ color: '#10B981' }} />
              </div>
              <div className="quick-stat-info">
                <span className="quick-stat-value">{orderStats.completed}</span>
                <span className="quick-stat-label">Completed Orders</span>
              </div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-icon" style={{ backgroundColor: '#FFF8E1' }}>
                <FiUsers style={{ color: '#8B6914' }} />
              </div>
              <div className="quick-stat-info">
                <span className="quick-stat-value">{users.length}</span>
                <span className="quick-stat-label">Registered Users</span>
              </div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-icon" style={{ backgroundColor: '#FEE2E2' }}>
                <FiAlertCircle style={{ color: '#EF4444' }} />
              </div>
              <div className="quick-stat-info">
                <span className="quick-stat-value">{orderStats.pending}</span>
                <span className="quick-stat-label">Pending Orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="admin-footer">
        <div className="footer-stat">
          <FiClock />
          <span>Last updated: {new Date().toLocaleString()}</span>
        </div>
        <div className="footer-stat">
          <FiUsers />
          <span>Active users: {users.length}</span>
        </div>
        <div className="footer-stat">
          <FiPackage />
          <span>Products in stock: {products.length}</span>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
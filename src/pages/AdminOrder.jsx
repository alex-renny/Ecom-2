import React,{useState,useEffect} from 'react'
import './AdminOrder.css'

function AdminOrder() {

    const[orders,setOrders]=useState([])

    useEffect(()=>{

        const storedorders=JSON.parse(localStorage.getItem('Orders')) || []
        setOrders(storedorders)

    },[])

  return (
    <div className="admin-orders-container">
        
        {/* Decorative Elements */}
        <div className="dot-pattern"></div>
        <div className="bag-decoration">🛍️</div>

        <div className="orders-header">
            <h2>All Orders</h2>
            <div className="order-count-badge">
                {orders.length} Orders
            </div>
        </div>

        {
            orders.length===0 ? (
                <div className="empty-orders">
                    <span className="empty-icon">📭</span>
                    <p>No Orders Found</p>
                    <span className="empty-subtext">New orders will appear here</span>
                </div>
            ):(
                <div className="orders-grid">

                    {
                        orders.map((item,index)=>(
                            <div key={index} className="order-card">

                                    <span className="order-number">#{index + 1}</span>
                                    
                                    <div className="order-content">
                                        <h3>{item.name}</h3>
                                        
                                        <div className="order-details">
                                            <div className="order-detail-item">
                                                <span className="detail-icon user-icon">👤</span>
                                                <div>
                                                    <span className="detail-label">Customer</span>
                                                    <p className="detail-value">{item.user}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="order-detail-item">
                                                <span className="detail-icon price-icon">💰</span>
                                                <div>
                                                    <span className="detail-label">Price</span>
                                                    <p className="price-value">{item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                            </div>
                        ))
                    }

                </div>
            )
        }

        <div className="orders-footer">
            <div className="total-orders-info">
                <span className="total-orders-label">Total Orders:</span>
                <span className="total-orders-count">{orders.length}</span>
            </div>
        </div>

    </div>
  )
}

export default AdminOrder
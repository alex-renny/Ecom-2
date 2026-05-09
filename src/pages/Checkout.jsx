import React, { useState, useEffect } from 'react';
import './checkout.css'; // We'll create this CSS file

function Checkout() {
  const [cartitems, setCartitems] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem('Loggeduser'));

  useEffect(() => {
    const storedproducts = JSON.parse(localStorage.getItem('Cart')) || [];
    setCartitems(storedproducts);
  }, []);

  const mycart = cartitems.filter(item => item.user === user?.Email);
  const total = mycart.reduce((sum, item) => {
    return sum + Number(item.price);
  }, 0);

  const handlepayment = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      let allcarts = JSON.parse(localStorage.getItem('Cart')) || [];
      let allorders = JSON.parse(localStorage.getItem('Orders')) || [];

      const usercart = allcarts.filter(item => item.user === user?.Email);
      const remainingcart = allcarts.filter(item => item.user !== user?.Email);

      const updatedorders = [...allorders, ...usercart.map(order => ({
        ...order,
        orderDate: new Date().toISOString(),
        orderId: Math.random().toString(36).substr(2, 9)
      }))];
      
      localStorage.setItem('Orders', JSON.stringify(updatedorders));
      localStorage.setItem('Cart', JSON.stringify(remainingcart));

      setPaymentSuccess(true);
      setProcessing(false);
      setCartitems([]);

      // Redirect or show success message
      setTimeout(() => {
        alert('Payment Successful! 🎉');
        setPaymentSuccess(false);
      }, 1000);
    }, 1500);
  };

  if (!user) {
    return (
      <div className="checkout-container">
        <div className="error-message">
          <h2>Please login to checkout</h2>
          <p>You need to be logged in to complete your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <h2 className="checkout-title">Checkout</h2>
        
        {paymentSuccess && (
          <div className="success-alert">
            Payment processed successfully! Redirecting...
          </div>
        )}

        <div className="checkout-content">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            {mycart.length === 0 ? (
              <div className="empty-cart">
                <svg className="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p>No products found in your cart</p>
                <button className="continue-shopping-btn" onClick={() => window.location.href = '/shop'}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {mycart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div className="item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className="image-placeholder">📦</div>
                        )}
                      </div>
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        {item.description && (
                          <p className="item-description">{item.description}</p>
                        )}
                        <div className="item-meta">
                          <span className="item-price">${Number(item.price).toFixed(2)}</span>
                          {item.quantity && <span className="item-quantity">Qty: {item.quantity}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="price-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Tax (10%)</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Total</span>
                    <span>${(total + 5 + total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Button */}
                <button 
                  className="payment-button" 
                  onClick={handlepayment}
                  disabled={processing || mycart.length === 0}
                >
                  {processing ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    `Pay $${(total + 5 + total * 0.1).toFixed(2)}`
                  )}
                </button>
              </>
            )}
          </div>

          {/* Payment Methods
          {mycart.length > 0 && (
            <div className="payment-methods">
              <h3>We Accept</h3>
              <div className="payment-icons">
                <span className="payment-icon">💳 Visa</span>
                <span className="payment-icon">💳 Mastercard</span>
                <span className="payment-icon">🟦 PayPal</span>
                <span className="payment-icon">🍎 Apple Pay</span>
              </div>
              <div className="secure-checkout">
                <span className="lock-icon">🔒</span>
                <p>Secure Checkout</p>
                <small>Your payment information is encrypted and secure</small>
              </div>
            </div> */}
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
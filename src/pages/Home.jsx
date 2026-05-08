import React from 'react'
import './home.css'

function Home() {
  return (
    <div className="home-container">

      <div className="hero-section">

        {/* LEFT CONTENT */}

        <div className="hero-text">

          <div className="hero-tag">
            <span></span>
            New Gen Premium Sneakers
          </div>

          <h1>
            Move With <br />
            Pure Style
          </h1>

          <p>
            Discover futuristic footwear crafted with premium
            comfort, luxury aesthetics, and lightweight design
            built for everyday confidence.
          </p>

          <div className="hero-buttons">

            <button className="buy-btn">
              Shop Now
            </button>

            <button className="view-btn">
              Explore More
            </button>

          </div>

          {/* STATS */}

          <div className="hero-stats">

            <div className="stat">
              <h2>10K+</h2>
              <p>Happy Customers</p>
            </div>

            <div className="stat">
              <h2>250+</h2>
              <p>Premium Products</p>
            </div>

            <div className="stat">
              <h2>4.9</h2>
              <p>Top Rating</p>
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="hero-image">

          <div className="shoe-card">

            <img
              src="https://i.pinimg.com/1200x/97/bb/5a/97bb5adcf58aa89c3ec98209c549d8b6.jpg"
              alt="premium shoe"
            />

          </div>

          {/* FLOATING CARDS */}

          <div className="floating-card card-1">
            <h3>Premium</h3>
            <p>Luxury Quality</p>
          </div>

          <div className="floating-card card-2">
            <h3>Ultra Light</h3>
            <p>All Day Comfort</p>
          </div>

          {/* SIDE TEXT */}

          <div className="vertical-text">
            TREXO PREMIUM
          </div>

        </div>

      </div>

    </div>
  )
}

export default Home
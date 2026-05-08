import React from 'react'
import './home.css'

function Home() {
  return (
    <div className="home-container">

      <section className="hero-section">

        <div className="hero-left">

          <span className="hero-tag">
            Comfort Meets Style
          </span>

          <h1>
            Step Into <br />
            Modern Style
          </h1>

          <p>
            Discover premium footwear designed for comfort,
            fashion, and everyday confidence.
          </p>

          <div className="hero-buttons">
            <button className="shop-btn">Shop Now</button>
            <button className="explore-btn">Explore</button>
          </div>

        </div>

        <div className="hero-right">

          <img
            src="https://i.pinimg.com/1200x/a2/af/9e/a2af9e36fecdad2bb8f487a6bc255a35.jpg"
            alt="shoe"
          />

        </div>

      </section>

    </div>
  )
}

export default Home
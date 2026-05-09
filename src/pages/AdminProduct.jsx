import React,{useState,useEffect} from 'react'
import './AdminProduct.css'

function AdminProduct() {

    const[product,setProduct]=useState({name:'',price:'',image:''
    })

    const handleproduct=(e)=>{
        setProduct({
            ...product,[e.target.name]:e.target.value
        })
    }

    const handleadd=()=>{
        if(!product.name && !product.price){
            alert('All fields Required')
            return
        }

        let ProductDetails=JSON.parse(localStorage.getItem('Products')) || []

        const exist=ProductDetails.find(i=>i.name===product.name)

        if(exist){
            alert('Already in the List')
            return
        }
        ProductDetails.push(product)
        localStorage.setItem('Products',JSON.stringify(ProductDetails))
        alert('Product Added')
        window.location.reload()
    }

  return (
  <div className='admin-product-page'>

    {/* Background Decorative Elements */}
    <div className="bg-pattern"></div>
    
    <div className="decor-shape-1"></div>
    <div className="decor-shape-2"></div>
    <div className="decor-shape-3"></div>
    
    <div className="shoe-decor">👟</div>
    
    <div className="particles-container">
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
    </div>

    <div className='admin-product-card'>

      <h2>Add Products</h2>

      <p className='admin-subtitle'>
        Add premium products to your collection
      </p>

      <div className='form-group'>
        <label>Product Name</label>

        <input
          type="text"
          placeholder='Enter product name'
          name='name'
          onChange={handleproduct}
        />
      </div>

      <div className='form-group'>
        <label>Product Price</label>

        <input
          type="text"
          placeholder='Enter product price'
          name='price'
          onChange={handleproduct}
        />
      </div>

      <div className='form-group'>
        <label>Product Image</label>

        <input
          type="text"
          placeholder='Paste image link'
          name='image'
          onChange={handleproduct}
        />
      </div>

      <button
        className='add-btn'
        onClick={handleadd}
      >
        Add Product
      </button>

    </div>

  </div>
)
}

export default AdminProduct
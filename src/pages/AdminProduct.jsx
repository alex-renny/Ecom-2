import React,{useState,useEffect} from 'react'

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
    <div>

        <h2>Add Products</h2>

        <input type="text" placeholder='Enter product Name' name='name' onChange={handleproduct}/>
        <br />
        <input type="text" placeholder='Enter Price' name='price' onChange={handleproduct}/>
        <br />
        <input type="text" placeholder='Enter Image Link' name='image' onChange={handleproduct}/>
        <br />
        <button onClick={handleadd}>Add</button>

    </div>
  )
}

export default AdminProduct
import React,{useState,useEffect} from 'react'
import { Navigate,Link} from 'react-router-dom'

function Cart() {

    const[cart,setCart]=useState([])

    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem('Loggeduser'))
        let data=JSON.parse(localStorage.getItem('Cart'))

        let usercart=data.filter(item=>item.user===user?.Email)
        setCart(usercart)
    },[])

    const removeitem=(index)=>{
            let updatedcart=[...cart]
            updatedcart.splice(index,1)

            setCart(updatedcart)
            localStorage.setItem('Cart',JSON.stringify(updatedcart))
            alert('Product Removed from Cart')
    }

    const total=cart.reduce((sum,item)=>{
        return sum+Number(item.price)
    },0)

  return (
    <>
    <div>
        
        <h1>My Cart</h1>
        <h3>Total Price : $ {total}</h3>

        { 
            cart.map((item,index)=>(

                <div key={index}>

                    <img src={item.image} alt="Product Image" />
                    <h2>{item.name}</h2>
                    <p>{item.price}</p>

                    <button onClick={removeitem}>Remove</button>

                </div>
            ))
        }
        <div>

            <h3>Total : $ {total}</h3>

            <Link to='/Checkout'>
                <button>Checkout</button>
            </Link>

        </div>

    </div>
    </>
  )
}

export default Cart
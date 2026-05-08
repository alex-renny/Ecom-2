import React,{useState,useEffect} from 'react'

function Checkout() {

    const[cartitems,setCartitems]=useState([])

    const user=JSON.parse(localStorage.getItem('Loggeduser'))

    useEffect(()=>{
            const storedproducts=JSON.parse(localStorage.getItem('Cart')) || []
            setCartitems(storedproducts)
    },[])

    const mycart=cartitems.filter(item=>item.user===user.Email)
    const total=mycart.reduce((sum,item)=>{

        return sum+Number(item.price)

    },0)

    const handlepayment=()=>{

            let allcarts=JSON.parse(localStorage.getItem('Cart')) || []
            let allorders=JSON.parse(localStorage.getItem('Orders')) || []

            const usercart=allcarts.filter(item=>item.user===user.Email)
            const banancecart=allcarts.filter(item=>item.user!==user.Email)

            const updatedorders=[...allorders,...usercart]
            localStorage.setItem('Orders',JSON.stringify(updatedorders))
            localStorage.setItem('Cart',JSON.stringify(banancecart))

            alert('Payment Successful')
            setCartitems([])


    }

  return (
    <div>

        <h2>Checkout</h2>

        {
            mycart.length===0 ? (
                <p>No Products Found</p>
            ):(
                <div>

                    {
                        mycart.map((item,index)=>(
                            <div key={index}>

                                <h3>{item.name}</h3>
                                <p>{item.price}</p>

                            </div>
                        ))
                    }

                </div>
            )
        }
        <div>

            <p>Total : ${total.toFixed(2)}</p>
            <button onClick={handlepayment}>Pay</button>

        </div>

    </div>
  )
}

export default Checkout
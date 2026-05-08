import React,{useState,useEffect} from 'react'

function AdminOrder() {

    const[orders,setOrders]=useState([])

    useEffect(()=>{

        const storedorders=JSON.parse(localStorage.getItem('Orders')) || []
        setOrders(storedorders)

    },[])

  return (
    <div>
        
        <h2>All Orders</h2>

        {
            orders.length===0 ? (
                <p>No Orders Found</p>
            ):(
                <div>

                    {
                        orders.map((item,index)=>(
                            <div key={index}>

                                    <h3>{item.name}</h3>
                                    <p>{item.user}</p>
                                    <p>{item.price}</p>

                            </div>
                        ))
                    }

                </div>
            )
        }

    </div>
  )
}

export default AdminOrder
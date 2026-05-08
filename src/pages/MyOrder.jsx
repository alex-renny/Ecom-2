import React,{useState,useEffect} from 'react'

function MyOrder() {

    const[myorders,setMyorders]=useState([])

    const user=JSON.parse(localStorage.getItem('Loggeduser'))

    useEffect(()=>{

        const storedorders=JSON.parse(localStorage.getItem('Orders')) || []
        const filteredorders=storedorders.filter(
            item=>item.user===user.Email
        )

        setMyorders(filteredorders)

    },[])

  return (
    <div>
        
        <h2>MyOrder</h2>

        {
            myorders.length===0 ? (
                <p>No Orders Found</p>
            ):(
                <div>

                    {
                        myorders.map((item,index)=>(
                            <div key={index}>

                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>

                            </div>
                        ))
                    }

                </div>
            )
        }

    </div>
  )
}

export default MyOrder
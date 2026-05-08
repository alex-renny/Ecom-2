import React,{useState,useEffect} from 'react'

function ProductList() {

    const[items,setItems]=useState([])

    useEffect(()=>{
        let data=JSON.parse(localStorage.getItem('Products')) || []
        setItems(data)
    },[])


  return (
    <div>

        <h2>Product-List</h2>

        <table border='2' cellPadding='10'>

            <thead>

                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                </tr>

            </thead>
            <tbody>
                {
                    length.items===0 ? (
                <tr>
                    <td>
                        No Products Found
                    </td>
                </tr>
                ):(
                    items.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))
                )
            }

            </tbody>

        </table>

    </div>
  )
}

export default ProductList
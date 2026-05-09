import React,{useState,useEffect} from 'react'
import './ProductList.css'

function ProductList() {

    const[items,setItems]=useState([])

    useEffect(()=>{
        let data=JSON.parse(localStorage.getItem('Products')) || []
        setItems(data)
    },[])

  return (
    <div className="product-list-container">

        {/* Decorative Elements */}
        <div className="dot-pattern"></div>
        <div className="shoe-decoration">👞</div>

        <div className="product-list-header">
            <h2>Product-List</h2>
            <div className="product-count-badge">
                {items.length} Products
            </div>
        </div>

        <div className="table-wrapper">
            <table className="product-table" cellPadding='10'>

                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        items.length===0 ? (
                            <tr className="empty-row">
                                <td colSpan="2">
                                    <div className="empty-state">
                                        <span className="empty-icon">📦</span>
                                        <span className="empty-text">No Products Found</span>
                                        <span className="empty-subtext">Add products to see them here</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
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

        <div className="product-list-footer">
            <div className="total-products">
                <span className="total-label">Total Products:</span>
                <span className="total-count">{items.length}</span>
            </div>
        </div>

    </div>
  )
}

export default ProductList
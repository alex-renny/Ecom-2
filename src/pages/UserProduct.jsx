import React,{useState,useEffect} from 'react'

function UserProduct() {

    const[product,setProduct]=useState([])

    useEffect(()=>{

        let data= JSON.parse(localStorage.getItem('Products'))

        // DEFAULT PRODUCTS

        if(!data || data.length===0){

            const defaultproducts=[
                    {
                        name:'Smart Watch',
                        price:3000,
                        image:'https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/d/c/u/42-gen-9-smart-watch-for-girls-and-smart-watch-for-women-android-original-imahbh2c597z2f2q.jpeg?q=90'
                    },
                    {
                        name:'Smart Watch',
                        price:3000,
                        image:'https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/d/c/u/42-gen-9-smart-watch-for-girls-and-smart-watch-for-women-android-original-imahbh2c597z2f2q.jpeg?q=90'
                    },
                    {
                        name:'Smart Watch',
                        price:3000,
                        image:'https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/d/c/u/42-gen-9-smart-watch-for-girls-and-smart-watch-for-women-android-original-imahbh2c597z2f2q.jpeg?q=90'
                    },
                    {
                        name:'Smart Watch',
                        price:3000,
                        image:'https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/d/c/u/42-gen-9-smart-watch-for-girls-and-smart-watch-for-women-android-original-imahbh2c597z2f2q.jpeg?q=90'
                    },
                    {
                        name:'Smart Watch',
                        price:3000,
                        image:'https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/d/c/u/42-gen-9-smart-watch-for-girls-and-smart-watch-for-women-android-original-imahbh2c597z2f2q.jpeg?q=90'
                    },
                    {
                        name:'Smart Watch',
                        price:3000,
                        image:'https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/d/c/u/42-gen-9-smart-watch-for-girls-and-smart-watch-for-women-android-original-imahbh2c597z2f2q.jpeg?q=90'
                    },
                    {
                        name:'Smart Watch',
                        price:3000,
                        image:'https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/d/c/u/42-gen-9-smart-watch-for-girls-and-smart-watch-for-women-android-original-imahbh2c597z2f2q.jpeg?q=90'
                    },
                    {
                        name:'Smart Watch',
                        price:3000,
                        image:'https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/d/c/u/42-gen-9-smart-watch-for-girls-and-smart-watch-for-women-android-original-imahbh2c597z2f2q.jpeg?q=90'
                    },

            ]

            localStorage.setItem('Products',JSON.stringify(defaultproducts))

            setProduct(defaultproducts)
        }else{

            setProduct(data)
        }
    },[])

    const addtocart=(product)=>{
                let user=JSON.parse(localStorage.getItem('Loggeduser'))
                let cart=JSON.parse(localStorage.getItem('Cart')) || []

                let exist=cart.find(

                        item=>item.name===product.name && item.user===user.Email

                )

                if(exist){

                    alert('Product Already in the Cart')
                    return

                }
                let newitem={

                    ...product,user:user.Email
                }

                cart.push(newitem)
                localStorage.setItem('Cart',JSON.stringify(cart))
                alert('Product Added to Cart')


    }
  return (
    <div>

        {

            product.length===0 ? (
                <p>No Product Found</p>
            ):(
                product.map((item,index)=>(
                    <div key={index}>

                        <img src={item.image} alt="Product Image" />

                        <h2>{item.name}</h2>

                        <p>{item.price}</p>

                        <button onClick={()=>addtocart(item)}>Add to Cart</button>

                    </div>
                ))
            )
        }

    </div>
  )
}

export default UserProduct
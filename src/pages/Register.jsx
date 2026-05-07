import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


function Register() {

    const navigate=useNavigate()

    const[user,setUser]=useState({Username:'',Email:'',Password:'',Phone:''})

    const handlechange=(e)=>{
        setUser({
            ...user,[e.target.name]:e.target.value
        })
    }

    const handlesubmit=()=>{
        if(!user.Username && !user.Email && !user.Password && !user.Phone){
            alert('All fields are required')
            return
        }
        let userDetails=JSON.parse(localStorage.getItem('User')) || []

        const exist=userDetails.find(i=>i.Email===user.Email)
        if (exist){
            alert("User Already Exist with the same Email")
            return
        }else{
            userDetails.push(user)
            localStorage.setItem('User',JSON.stringify(userDetails))
            alert('Registration Successfull')
            navigate('/Login')

        }
    }
  return (
    <div>
        <h2>Registration</h2>

        UserName: <input type="text" placeholder='Enter the Username' name='Username' onChange={handlechange} /><br />

        Email: <input type="email" placeholder='Enter Email' name='Email' onChange={handlechange} /><br />

        Password: <input type="password" placeholder='Enter your Password' name='Password' onChange={handlechange} /><br />

        Phone: <input type="number" placeholder='Enter Phone' name='Phone' onChange={handlechange} /><br />

        <button onClick={handlesubmit}>Submit</button>

    </div>
  )
}

export default Register
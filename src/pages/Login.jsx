import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate=useNavigate(localStorage.getItem('User'))

    const[user,setUser]=useState({Email:'',Password:''})

    const handledata=(e)=>{
        setUser({
            ...user,[e.target.name]:e.target.value
        })
    }

    const handlelogin=()=>{
        const AdminMail='admin@gmail.com'
        const AdminPw='1234'

        if(!user.Email && !user.Password){
            alert('Both Fields are Required')
            return
        }

        if(user.Email===AdminMail && user.Password===AdminPw){
            localStorage.setItem('Role','Admin')
            alert('Admin logged Successfully')
            navigate('/AdminHome')
            window.location.reload()
            return
        }

        let userDetails=JSON.parse(localStorage.getItem('User'))

        const exist=userDetails.find(i=>i.Email===user.Email && i.Password===user.Password)
        if(exist){
            localStorage.setItem('Loggeduser',JSON.stringify(user))
            localStorage.setItem('Role','User')
            alert('Login Successful')
            navigate('/UserHome')
            window.location.reload()
            return
        }
        else{
            alert('Account Not Found')
            navigate('/Register')
        }

    }
  return (
    <div>
        <h2>Login</h2>

        Email: <input type="text" placeholder='Enter your Email' name='Email' onChange={handledata} /><br />

        Password: <input type="password" placeholder='Enter the password' name='Password' onChange={handledata}/><br />

        <button onClick={handlelogin}>Login</button>
    </div>
  )
}

export default Login
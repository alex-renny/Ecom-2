import React,{useState,useEffect} from 'react'

function UsersTable() {

  const[user,setUser]=useState([])
  
  useEffect(()=>{
    let userdata=JSON.parse(localStorage.getItem('User')) || []
    setUser(userdata)
  },[])

  return (
    <div>

        <h2>Users List</h2>

        <table border="2" cellPadding="10">

          <thead>
            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>

            </tr>
          </thead>

          <tbody>

              {
                user.length===0 ? (
                  <tr>
                    <td colSpan="5">No users Found</td>
                  </tr>
                ) : (
                  user.map((item,index)=>(
                    <tr key={index}>

                        <td data-label='Name'>{item.Username}</td>
                        <td data-label='Password'>{item.Password}</td>
                        <td data-label='Email'>{item.Email}</td>
                        <td data-label='Phone'>{item.Phone}</td>

                    </tr>
                  ))
                )
              }

          </tbody>

        </table>

    </div>
  )
}

export default UsersTable
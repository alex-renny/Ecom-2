import React,{useState,useEffect} from 'react'
import './UserTable.css'

function UsersTable() {

  const[user,setUser]=useState([])
  
  useEffect(()=>{
    let userdata=JSON.parse(localStorage.getItem('User')) || []
    setUser(userdata)
  },[])

  return (
    <div className="users-table-container">

        <div className="table-header">
          <h2>Users List</h2>
        </div>

        <div className="table-wrapper">
          <table className="user-table" cellPadding="10">

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
                  <tr className="empty-row">
                    <td colSpan="4">
                      <div className="empty-state">
                        <span className="empty-icon">👥</span>
                        <span className="empty-text">No users found</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  user.map((item,index)=>(
                    <tr key={index}>
                      <td data-label='Name'>{item.Username}</td>
                      <td data-label='Email'>{item.Email}</td>
                      <td data-label='Password'>{item.Password}</td>
                      <td data-label='Phone'>{item.Phone}</td>
                    </tr>
                  ))
                )
              }
            </tbody>

          </table>
        </div>

        <div className="table-footer">
          <div className="user-count">
            <span>Total Users:</span>
            <span className="count-number">{user.length}</span>
          </div>
        </div>

    </div>
  )
}

export default UsersTable
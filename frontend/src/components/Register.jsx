import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import {  toast } from 'react-toastify';

const Register = () => {

  const URL="https://authentication-wvf0.onrender.com/register"
  
    

    const {storeTokenInLS}=useAuth()

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username:"",
        email:"",
        phone:"",
        password:""
    })

    const handleChange=(e)=>{
        let name=e.target.name
        let value=e.target.value

        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit= async(e)=>{
       e.preventDefault()
       try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
  
        const res_data = await response.json();
        
        if (response.ok) {
          // stored the token in localhost
          storeTokenInLS(res_data.token);
          setUser({ username: "", email: "", phone: "", password: "" });
         toast.success("Registration successful");
          navigate("/login");
        } else {
           toast.error("user not registered");
        }
      } catch (error) {
        console.log("register ", error);
      }
    
    }
  return (

    <div className="container mt-5">
     <h2 className='text-center'>Registration Form</h2>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="username" className="form-label">Username</label>
    <input type="text" className="form-control" id="username" name='username' value={user.username} onChange={handleChange} minLength={3} required aria-describedby="emailHelp"/>
   </div>

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name='email' value={user.email} onChange={handleChange} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="phone" className="form-label">Phone</label>
    <input type="tel" className="form-control" id="phone" name='phone' value={user.phone} onChange={handleChange} minLength={10} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={handleChange} minLength={3} required/>
  </div>

 <div className="text-center">

  <button type="submit" className="btn btn-primary">Register</button>
 </div>
</form>
    </div>
  )
}

export default Register

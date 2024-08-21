import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import {  toast } from 'react-toastify';

const Login = () => {

  
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
    
      const navigate = useNavigate();

      const  {storeTokenInLS} = useAuth();
     const URL="https://authentication-wvf0.onrender.com/login"
     
    
      const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
    
        setUser({
          ...user,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
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
           
            storeTokenInLS(res_data.token);
    
            setUser({ email: "", password: "" });
            toast.success("Login successful");
            navigate("/");
          } else {
             toast.error("error while login");
            console.log("invalid credential");
          }
        } catch (error) {
          console.log(error);
        }
      };
    
  return (
    <div className="container mt-5">
    <h2 className='text-center'>Login Form</h2>
   <form onSubmit={handleSubmit}>
 

 <div className="mb-3">
   <label htmlFor="email" className="form-label">Email</label>
   <input type="email" className="form-control" id="email" name='email' value={user.email} onChange={handleChange} required/>
 </div>

 <div className="mb-3">
   <label htmlFor="password" className="form-label">Password</label>
   <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={handleChange} required/>
 </div>

<div className="text-center">

 <button type="submit" className="btn btn-primary">Login</button>
</div>
</form>
   </div>
  )
}

export default Login

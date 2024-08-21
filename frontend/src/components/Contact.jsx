import React, { useState } from 'react'
import {  toast } from 'react-toastify';

const Contact = () => {

  
    const [contact, setContact] = useState({
        username:"",
        email:"",
        message:""
    });

    const URL="http://5000/api/auth/contact"
    
  
    // lets tackle our handleInput
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
  
      setContact({
        ...contact,
        [name]: value,
      });
    };
  
    // handle fomr getFormSubmissionInfo
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });
  
        if (response.ok) {
          setContact({ username:"",
            email:"",
            message:""});
          const data = await response.json();
          toast.success("Message send successfully");
        }
      } catch (error) {
        toast.error("Message not send");
        console.log(error);
      }
    };
  return (
    <div className="container mt-5">
    <h2 className='text-center'>Contact Form</h2>
   <form onSubmit={handleSubmit}>

 <div className="mb-3">
   <label htmlFor="username" className="form-label">Username</label>
   <input type="text" className="form-control" id="username" name='username' value={contact.username} onChange={handleChange} required/>
 </div>

 <div className="mb-3">
   <label htmlFor="email" className="form-label">Email</label>
   <input type="email" className="form-control" id="email" name='email' value={contact.email} onChange={handleChange} required/>
 </div>

 
 <div className="mb-3">
  <label htmlFor="message" className="form-label">Message</label>
  <textarea className="form-control" id="message" rows="3" name='message' value={contact.message} onChange={handleChange} required></textarea>
</div>

<div className="text-center">
 <button type="submit" className="btn btn-primary">Send Message</button>
</div>
</form>
   </div>
  )
}

export default Contact
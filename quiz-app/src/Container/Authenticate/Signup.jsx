import React, { useState } from 'react'
import '../../assets/styles/signup.css'
import Think from '../../assets/images/Think.png'
import {ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Login from './Login'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName : '',
    email : '',
    password : '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(formData.firstName && formData.email && formData.password){
      const storeDetails = JSON.parse(localStorage.getItem('userDetail')) || []

      const validStoreDetails = Array.isArray(storeDetails) ? storeDetails : [];

      const userUpdated = [...validStoreDetails, formData]

      localStorage.setItem('userDetail', JSON.stringify(userUpdated))

      toast.success('Signup Successfull')
      setFormData({
        firstName : '',
        email : '', 
        password : '',
      })
    }
    else{
      toast.error("Please fill the form")
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen gap-38 signup-sec max-w">
        <div className="signup-brain p-8 rounded-2xl  w-full max-w-md">
          <img src={Think} className='brain' alt="" />
        </div>
        <div className="signup-form text-start">
          <h1>Signup</h1>
          <p>Sign Up to join</p>
          <form className='signup-form flex flex-col' onSubmit={handleSubmit}>
            <div>
              <div className='flex' id='first-name'>
                <label className='mr-8'>Full Name<span style={{color : 'red'}}>*</span></label>
                <input
                  className='leading-normal border'
                  type="text"
                  placeholder='Full Name'
                  name='firstName'
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </div>
              <div className='flex' id='email'>
                <label className='mr-8'>Email<span style={{color : 'red'}}>*</span></label>
                <input
                  className='leading-normal border'
                  type="email"
                  name='email'
                  placeholder='xyz@gmail.com'
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className='flex' id='password'>
                <label className='mr-8'>Password<span style={{color : 'red'}}>*</span></label>
                <input
                  className='leading-normal border '
                  type="password"
                  name='password'
                  placeholder='Password'
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>
            <button className='signup-btn leading-normal mt-8 w-full'>Signup</button>
            <p>Already have a account? <Link to="/login">Log in</Link></p>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default Signup

import React from 'react'
import '../../assets/styles/login.css'
import Think from '../../assets/images/Think.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email : '',
        password : '',
      })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.email && formData.password){
            console.log("Success")
            toast.success("Logged in successfully!")
            navigate('/quizquestion');
        }
        else{
            toast.error("please enter and password")
        }
    }
   
    return (
        <>
            <div className="flex justify-center items-center min-h-screen gap-38 signup max-w">
                <div className="signup-brain p-8 rounded-2xl  w-full max-w-md">
                    <img src={Think} className='brain' alt="" />
                </div>
                <div className="login-form text-start">
                    <h1>Login</h1>
                    <form className='flex flex-col' onSubmit={handleSubmit} >
                        <div>
                            <div className='flex' id='email'>
                                <label className='mr-8'>Email</label>
                                <input
                                    className='leading-normal border'
                                    onChange={handleChange}
                                    name='email'
                                    type="text"
                                    value={formData.email}
                                    placeholder='Full Name'
                                />
                            </div>
                            <div className='flex' id='email'>
                                <label className='mr-8'>Password</label>
                                <input
                                    className='leading-normal border'
                                    onChange={handleChange}
                                    name='password'
                                    id='password'
                                    type="password"
                                    value={formData.password}
                                    placeholder='Full Name'
                                />
                            </div>
                        </div>
                        <button className='login-btn leading-normal mt-8 w-full'>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login

import React, { useEffect } from 'react'
import '../../assets/styles/login.css'
import Think from '../../assets/images/Think.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { loginRequest } from '../../store/users/userActions'
import { useDispatch, useSelector } from 'react-redux'
// import { loginUser } from '../../store/action/Action'
import "react-toastify/ReactToastify.css";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.user)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginRequest(formData.email, formData.password))
    };

    // Add this useEffect to your component
    // useEffect(() => {
    //     if (user) { // When login succeeds
    //         toast.success("Logged in successfully");
    //         navigate('/quizQuestion'); // Navigate here
    //     }
    // }, [user, navigate]);

    useEffect(() => {
        console.log("Users state:", user)
    }, [user])

    useEffect(() => {
        if (user) {
            toast.success("Logged in successfully")
            navigate('/quizQuestion');
        }
    }, [user, navigate])

    return (
        <>
            <div className="flex justify-center items-center min-h-screen gap-38 login-sec max-w">
                <div className="signup-brain p-8 rounded-2xl  w-full max-w-md">
                    <img src={Think} className='brain' alt="" />
                </div>
                <div className="login-form text-start">
                    <h1>Login</h1>
                    <form className='flex flex-col' onSubmit={handleSubmit} >
                        <div>
                            <div className='flex' id='email'>
                                <label className='mr-8'>Email<span style={{ color: 'red' }}>*</span></label>
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
                                <label className='mr-8'>Password<span style={{ color: 'red' }}>*</span></label>
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
                        <button className='login-btn leading-normal mt-8 w-full' >
                            {loading ? "Loading in..." : "Login"}</button>
                        <p>New here? <Link to="/">Register here!</Link></p>
                    </form>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login

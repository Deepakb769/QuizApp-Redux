import React from 'react'
import Think from '../../assets/images/Think.png'

const Login = () => {
    // const [name, setName]
    return (
        <>
            <div className="flex justify-center items-center min-h-screen gap-38 signup max-w">
                <div className="signup-brain p-8 rounded-2xl  w-full max-w-md">
                    <img src={Think} className='brain' alt="" />
                </div>
                <div className="signup-form text-start">
                    <h1>Login</h1>
                    <form className='flex flex-col'>
                        <div>
                            <div>
                                <label className='mr-8'>Email</label>
                                <input
                                    className='leading-normal'
                                    type="text"
                                    placeholder='Full Name'
                                />
                            </div>
                            <div>
                                <label className='mr-8'>Password</label>
                                <input
                                    className='leading-normal'
                                    type="text"
                                    placeholder='Full Name'
                                />
                            </div>
                        </div>

                        <button className='leading-normal w-full'>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login

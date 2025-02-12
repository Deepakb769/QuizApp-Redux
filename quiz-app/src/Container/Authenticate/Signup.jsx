import React from 'react'
import '../../assets/styles/signup.css'
import Think from '../../assets/images/Think.png'

const Signup = () => {
  // const [name, setName]
  return (
    <>
      <div className="flex justify-center items-center min-h-screen gap-38 signup max-w">
        <div className="signup-brain p-8 rounded-2xl shadow-lg w-full max-w-md">
          <img src={Think} className='brain' alt="" />
        </div>
        <div className="signup-form text-start">
          <h1>Signup</h1>
          <form className='flex flex-col'>
            <div>
              <div>
                <label className='mr-8'>Full Name</label>
                <input
                  className='leading-normal'
                  type="text"
                  placeholder='Full Name'
                />
              </div>
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

            <button className='leading-normal w-full'>Signup</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default Signup

import React from 'react'
import Think from '../../assets/images/Group.png'

const Signup = () => {
  // const [name, setName]
  return (
    <>
      <div className="flex">
        <div className="signup-brain">
          <img src={Think} alt="" />
        </div>
        <div className="signup-form">
          <form>
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              placeholder='Full Name'
            />
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder='Full Name'
            />
            <label htmlFor="">Password</label>
            <input
              type="text"
              placeholder='Full Name'
            />
            <button>Login</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default Signup

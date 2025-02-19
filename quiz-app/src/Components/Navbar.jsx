import React from 'react'
import Logo from '../assets/images/Vector.png'
import Profile from '../assets/images/Actions.png'

const Navbar = () => {
    return (
        <>
            <div className="quiz-nav flex justify-between" >
                <img src={Logo} alt="" />
                <img src={Profile} alt="" />
            </div>
        </>
    )
}

export default Navbar

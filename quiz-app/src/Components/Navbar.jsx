import React from 'react'
import Logo from '../assets/images/Vector.png'
import Profile from '../assets/images/Actions.png'
import '../assets/styles/navbar.css'

const Navbar = () => {
    return (
        <>
            <div className="quiz-nav flex justify-between items-center" >
                <div className="title-logo">
                    <a href="../Container/Authenticate/QuizQuestion.jsx"><img src={Logo} alt="" /></a>
                </div>
                <div className="profile-logo">
                    <img src={Profile} alt="" />
                </div>
            </div>
            <hr />
        </>
    )
}

export default Navbar

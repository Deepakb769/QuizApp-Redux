import React from 'react'
import Logo from '../assets/images/Vector.png'
import Profile from '../assets/images/Actions.png'
import '../assets/styles/navbar.css'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const email = useSelector((state) => state.user?.email)
    return (
        <>
            <div className="quiz-nav flex justify-between items-center" >
                <div className="title-logo">
                    <a href="../Container/Authenticate/QuizQuestion.jsx"><img src={Logo} alt="" /></a>
                </div>
                <div className="profile-logo">
                    <h3>{email || 'Guest'}</h3>
                    <img src={Profile} alt="" />
                </div>
            </div>
            <hr />
        </>
    )
}

export default Navbar

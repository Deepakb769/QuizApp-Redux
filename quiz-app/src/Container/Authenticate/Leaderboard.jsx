import React from 'react'
import '../../assets/styles/leaderboard.css'
import First from '../../assets/images/Group 6.png'
import Second from '../../assets/images/Group 5.png'
import Third from '../../assets/images/Group 4.png'

const Leaderboard = () => {
    return (
        <div className='leaderboard-container'>
            <div className="toppers-card">
                <h4>Wow You Rank 1st</h4>
                <p>Supporting Text</p>
                <div className="rank-card leading-normal">
                    <div className='leading-normal' id="rank-2">
                        <img src={Second} alt="" />
                        <h4>#2</h4>
                        <h5>Score</h5>
                        <p>844</p>
                    </div>
                    <div id="rank-1">
                        <img src={First} alt="" />
                        <h5>Score</h5>
                        <p>1042</p>
                    </div>
                    <div id="rank-3">
                        <img src={Third} alt="" />
                        <h4>#3</h4>
                        <h5>Score</h5>
                        <p>620</p>
                    </div>
                </div>
            </div>
            <div className="rank-rows">
                <div id="rank-4">
                    <h3>#4</h3>
                    <h5>Name</h5>
                    <h3>400</h3>
                </div>
                <div id="rank-5">
                    <h3>#5</h3>
                    <h5>Name</h5>
                    <p>320</p>
                </div>
                <div id="rank-6">
                    <h3>#6</h3>
                    <h5>Name</h5>
                    <h3>260</h3>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard

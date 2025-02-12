import React from 'react'

const Leaderboard = () => {
    return (
        <div>
            <h1>Wow You Rank 1st</h1>
            <p>Supporting Text</p>
            <div className="rank-card">
                <div id="rank-1">
                    <h4>Score</h4>
                    <p>1042</p>
                </div>
                <div id="rank-2">
                    <h4>Score</h4>
                    <p>844</p>
                </div>
                <div id="rank-3">
                    <h4>Score</h4>
                    <p>620</p>
                </div>
            </div>
            <div className="rank-rows">
                <div id="rank-4">
                    <h3>#4</h3>
                    <h4>Name</h4>
                    <h3>400</h3>
                </div>
                <div id="rank-4">
                    <h3>#5</h3>
                    <h4>Name</h4>
                    <h3>320</h3>
                </div>
                <div id="rank-4">
                    <h3>#6</h3>
                    <h4>Name</h4>
                    <h3>260</h3>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard

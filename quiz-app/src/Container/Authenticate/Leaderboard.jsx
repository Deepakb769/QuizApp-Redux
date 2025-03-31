import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/styles/leaderboard.css';
import First from '../../assets/images/Group 6.png';
import Second from '../../assets/images/Group 5.png';
import Third from '../../assets/images/Group 4.png';
import axios from 'axios';
// import { saveUserScore } from '../../store/questions/questionAction';
import { FETCH_LEADERBOARD_REQUEST, logoutUser, updateUserScore, fetchLeaderboardSuccess, UPDATE_LEADERBOARD } from '../../store/users/userActions';
import { useNavigate } from 'react-router-dom';
import { saveUserScore, resetQuiz, fetchLeaderboardRequest } from '../../store/questions/questionAction';

const Leaderboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { score } = useSelector((state) => state.quiz)
    const { user = {}, leaderboard = [], loading } = useSelector((state) => state.user);
    const [sortedLeaderboard, setSortedLeaderboard] = useState([]);


    // useEffect(() => {
    //     console.log("Current leaderboard data:", leaderboard);
    //     console.log("Current user data:", user);
    //     console.log("Current user obtained:",score)

    //     if(leaderboard.length > 0 ){

    //         const sorted = [...leaderboard].sort((a, b) => {
    //             // Primary sort: score descending
                
    //             if (b.score !== a.score) return b.score - a.score;
                
    //             // Secondary sort: recent updates first
    //             return new Date(b.updatedAt) - new Date(a.updatedAt);
    //         });
            
    //         console.log(sorted);
    //         setSortedLeaderboard(sorted);   
    //         console.log(sortedLeaderboard)
    //     }
    //     }, [leaderboard]);

    
    // const userRank = sortedLeaderboard.findIndex(u => u.email === user?.email);
    // const displayRank = userRank >= 0 ? userRank + 1 : "N/A";
    // console.log(userRank)

    // const rankSuffix = userRank === 1 ? 'st' : userRank === 2 ? 'nd' : userRank === 3 ? 'rd' : 'th'; 

    useEffect(() => {
        dispatch(fetchLeaderboardRequest());
    }, [dispatch]);

    useEffect(() => {
        console.log("Updated leaderboard:", leaderboard);
        console.log("Updated user:", user);
    }, [leaderboard, user]);

    const userRank = leaderboard.findIndex(u => u.email === user?.email);
    const displayRank = userRank >= 0 ? userRank + 1 : "N/A";

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    }

    if (loading) return <p>Loading leaderboard...</p>;

    return (
        <div className='leaderboard-container'>
            <div className="toppers-card">
                {/* <h4>{`Wow! You Rank ${userRank}${userRank === 1 ? 'st' : userRank === 2 ? 'nd' : userRank === 3 ? 'rd' : 'th'}`}</h4>
                <p>Congratulations on your score!</p> */}
                {user && (<h4>{`Wow ${user.firstName}! You Rank ${displayRank}${displayRank === 1 ? 'st' : displayRank === 2 ? 'nd' : displayRank === 3 ? 'rd' : 'th'}`}</h4>)}
                <p>Congratulations on your score of {user?.score || 0}!</p>

                <div className="rank-card leading-normal">
                    {/* Rank 2 */}
                    <div className='leading-normal' id="rank-2">
                        <img src={Second} alt="Second Place" />
                        <h4>#2</h4>
                        <h5>Score</h5>
                        {/* <pre>
                        <p>{JSON.stringify(sortedLeaderboard, null, 2)}</p>
                        </pre> */}
                        <p>{leaderboard[1]?.score || 0}</p> {/* Use sorted array */}
                    </div>

                    {/* Rank 1 */}
                    <div id="rank-1">
                        <img src={First} alt="First Place" />
                        <h5>Score</h5>
                        <p>{leaderboard[0]?.score || 0}</p> {/* Use sorted array */}
                    </div>

                    {/* Rank 3 */}
                    <div id="rank-3">
                        <img src={Third} alt="Third Place" />
                        <h4>#3</h4>
                        <h5>Score</h5>
                        <p>{leaderboard[2]?.score || 0}</p> {/* Use sorted array */}
                    </div>
                </div>

            </div>
            <div className="rank-rows">
            {leaderboard.slice(3).map((userEntry, index) => (
                    <div className="participant" key={userEntry.id}>
                        <span className="rank">#{index + 4}</span>
                        <span className="name">{userEntry.firstName}</span>
                        <span className="score">{userEntry.score || 0}</span>
                    </div>
                ))}
            </div>
            <button type='button' className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Leaderboard;

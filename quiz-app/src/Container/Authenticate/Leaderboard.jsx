import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/styles/leaderboard.css';
import First from '../../assets/images/Group 6.png';
import Second from '../../assets/images/Group 5.png';
import Third from '../../assets/images/Group 4.png';
import { FETCH_LEADERBOARD_REQUEST, LOGIN_REQUEST, logoutUser } from '../../store/users/userActions';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { users, score } = useSelector((state) => state.quiz); // Get user and score from Redux
    const { user, score, leaderboard = [] } = useSelector((state) => state.user);
    // const { user, score, leaderboard = [] } = useSelector((state) => state.user);
    // const currentUser = { name: users?.firstName || "You", score };
    

    // Sample static leaderboard data
    // const leaderboard = [
    //     { name: "User A", score: 1042 },
    //     { name: "User B", score: 844 },
    //     { name: "User C", score: 620 },
    //     { name: "User D", score: 400 },
    //     { name: "User E", score: 320 },
    //     { name: "User F", score: 260 },
    // ];

    // Add the current user’s score dynamically
    // const currentUser = { name: users?.name || "You", score };
    // const updatedLeaderboard = [...leaderboard, currentUser];
    // console.log(currentUser)
    // console.log(updatedLeaderboard)
    const currentUser = { name: user?.name || "You", score };
// Create a new array to avoid mutation
const updatedLeaderboard = [...leaderboard];
// Check if current user already exists in the leaderboard
const userIndex = updatedLeaderboard.findIndex(user => user.name === currentUser.name);
if (userIndex === -1) {
  updatedLeaderboard.push(currentUser); 
} else {
  updatedLeaderboard[userIndex].score = currentUser.score; // Update score if exists
}

    // Sort leaderboard in descending order
    updatedLeaderboard.sort((a, b) => b.score - a.score);
    const userRank = updatedLeaderboard.findIndex((user) => user.name === currentUser.name) + 1;
    console.log(userRank)

    // useEffect(() => {
    //     dispatch({ type : FETCH_LEADERBOARD_REQUEST});
    //   }, [dispatch]);
    
    useEffect(() => {
        dispatch({type : LOGIN_REQUEST})
    }, [dispatch])

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/login')
    }

    return (
        <div className='leaderboard-container'>
            <div className="toppers-card">
                {/* <h4>{`Wow! You Rank ${userRank}${userRank === 1 ? 'st' : userRank === 2 ? 'nd' : userRank === 3 ? 'rd' : 'th'}`}</h4> */}
                <h4>{`Wow! You Rank ${userRank}${userRank === 1 ? 'st' : userRank === 2 ? 'nd' : userRank === 3 ? 'rd' : 'th'}`}</h4>
                <p>Congratulations on your score!</p>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <div className="rank-card leading-normal">
                    <div className='leading-normal' id="rank-2">
                        <img src={Second} alt="Second Place" />
                        <h4>#2</h4>
                        <h5>Score</h5>
                        <p>{updatedLeaderboard[1]?.score || 0}</p>
                    </div>
                    <div id="rank-1">
                        <img src={First} alt="First Place" />
                        <h5>Score</h5>
                        <p>{updatedLeaderboard[0]?.score || 0}</p>
                    </div>
                    <div id="rank-3">
                        <img src={Third} alt="Third Place" />
                        <h4>#3</h4>
                        <h5>Score</h5>
                        <p>{updatedLeaderboard[2]?.score || 0}</p>
                    </div>
                </div>
            </div>
            <div className="rank-rows">
                {updatedLeaderboard.slice(3).map((user, index) => (
                    <div key={index} id={`rank-${index + 4}`}>
                        <h3>#{index + 4}</h3>
                        <h5>{user.name}</h5>
                        <h3>{user.score}</h3>
                    </div>
                ))}
            </div>
           
        </div>
    );
};

export default Leaderboard;

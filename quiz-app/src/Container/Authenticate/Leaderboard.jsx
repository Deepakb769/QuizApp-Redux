import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/styles/leaderboard.css';
import First from '../../assets/images/Group 6.png';
import Second from '../../assets/images/Group 5.png';
import Third from '../../assets/images/Group 4.png';
import { FETCH_LEADERBOARD_REQUEST, logoutUser, updateUserScore } from '../../store/users/userActions';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, score, leaderboard = [] } = useSelector((state) => state.user);
    
    // Get user rank from server data
    const userRank = leaderboard.findIndex(u => u.email === user?.email) + 1;

    useEffect(() => {
        dispatch({ type: FETCH_LEADERBOARD_REQUEST });
    }, [dispatch]);

    // useEffect(() => {
    //     if(user?.email){
    //         dispatch(updateUserScore(user.email, 0))
    //     }
    // },[user?.email, dispatch])

    useEffect(() => {
        if (user?.email && score > 0) {
            dispatch(updateUserScore(user.email, score));
        }
    }, [score, user?.email, dispatch]);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    }

    return (
        <div className='leaderboard-container'>
            <div className="toppers-card">
                <h4>{`Wow! You Rank ${userRank}${userRank === 1 ? 'st' : userRank === 2 ? 'nd' : userRank === 3 ? 'rd' : 'th'}`}</h4>
                <p>Congratulations on your score!</p>
                
                <div className="rank-card leading-normal">
                    <div className='leading-normal' id="rank-2">
                        <img src={Second} alt="Second Place" />
                        <h4>#2</h4>
                        <h5>Score</h5>
                        <p>{leaderboard[1]?.score || 0}</p>
                    </div>
                    <div id="rank-1">
                        <img src={First} alt="First Place" />
                        <h5>Score</h5>
                        <p>{leaderboard[0]?.score || 0}</p>
                    </div>
                    <div id="rank-3">
                        <img src={Third} alt="Third Place" />
                        <h4>#3</h4>
                        <h5>Score</h5>
                        <p>{leaderboard[2]?.score || 0}</p>
                    </div>
                </div>
            </div>
            <div className="rank-rows">
                {leaderboard.slice(7).map((user, index) => (
                    <div key={index} id={`rank-${index + 4}`}>
                        <h3>#{index + 4}</h3>
                        <h5>{user.firstName}</h5>
                        <h3>{user.score}</h3>
                    </div>
                ))}
            </div>
            <button type='button' className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Leaderboard;
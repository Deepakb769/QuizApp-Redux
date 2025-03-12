import axios from "axios";

export const LOGIN_REQUEST  = "LOGIN_REQUEST";
export const LOGIN_SUCCESS  = "LOGIN_SUCCESS";
export const LOGIN_FAILURE  = "LOGIN_FAILURE";
export const UPDATE_SCORE = "UPDATE_SCORE";
export const FETCH_LEADERBOARD_REQUEST = "FETCH_LEADERBOARD_REQUEST";
export const FETCH_LEADERBOARD_SUCCESS = "FETCH_LEADERBOARD_SUCCESS";
export const UPDATE_LEADERBOARD = "UPDATE_LEADERBOARD";
export const LOGOUT_USER = "LOGOUT_USER";
export const SIGNUP_USER_REQUEST  = "SIGNUP_USER_REQUEST"


// export const signupUser = (userData) => ({
//   type : 'SIGNUP_USER_REQUEST',
//   payload : userData
// })

export const loginRequest = (email, password, navigate) => ({
  type: LOGIN_REQUEST,
  payload: {
    email,
    password,
    navigate
  }
});

export const loginSuccess = (users) => ({
  type : LOGIN_SUCCESS,
  payload : users,
})

export const loginFailure = (error) => ({
  type : LOGIN_FAILURE,
  payload : error,
})

export const updateScore = (points) => ({
  type: UPDATE_SCORE,
  payload: points,
});

export const fetchLeaderboardRequest = () => ({
  type: FETCH_LEADERBOARD_REQUEST,
});

export const fetchLeaderboardSuccess = (leaderboard) => ({
  type: FETCH_LEADERBOARD_SUCCESS,
  payload: leaderboard,
});
  
export const updateLeaderboard = (leaderboard) => ({
  type: UPDATE_LEADERBOARD,
});

export const updateUserScore = (email, newScore) => {
  return async (dispatch) => {
    try {
      // Get user by email
      const userResponse = await axios.get(`http://localhost:5000/users?email=${email}`);
      const user = userResponse.data[0];
      
      // Update user score
      await axios.put(`http://localhost:5000/users/${user.id}`, {
        ...user,
        score: newScore
      });

      // Refresh leaderboard and user data
      dispatch({ type: FETCH_LEADERBOARD_REQUEST });
      dispatch({ type: LOGIN_REQUEST }); // Refresh current user data

    } catch (error) {
      console.error("Score update failed:", error);
    }
  };
};

// export const updateUserScore = (email, newScore) => async (dispatch, getState) => {
//   try {
//       // const { user } = getState().user;
//       // const prevScore = user?.score || 0
//       // const updatedScore = prevScore + newScore;

//       const userResponse = await axios.patch(`http://localhost:3000/users/${email}`);
//       const user = userResponse.data[0];

//       if (!user) {
//         console.error("User not found");
//         return;
//       }

//       const updatedScore = (user.score || 0) + newScore;

//       await axios.patch(`http://localhost:5000/users/${user.id}`,{
//         score : updatedScore
//       })

//       dispatch({
//           type: UPDATE_SCORE,
//           payload: updatedScore, // Yeh reducer me total score update karega
//       });

//       // dispatch(fetchLeaderboardRequest());
//       const leaderboardResponse = await axios.get(`http://localhost:5000/users?_sort=score&_order=desc`)
//       dispatch(fetchLeaderboardSuccess(leaderboardResponse.data))
//   } catch (error) {
//       console.error("Error updating score:", error);
//   }
// };


export const logoutUser = () => {
  return {
      type: LOGOUT_USER,
  };
};
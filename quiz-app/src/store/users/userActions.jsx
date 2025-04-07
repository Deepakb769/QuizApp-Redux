import axios from "axios";

export const SIGNUP_USER_REQUEST = "SIGNUP_USER_REQUEST";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAILURE = "SIGNUP_USER_FAILURE";
export const LOGIN_REQUEST  = "LOGIN_REQUEST";
export const LOGIN_SUCCESS  = "LOGIN_SUCCESS";
export const LOGIN_FAILURE  = "LOGIN_FAILURE";
export const UPDATE_SCORE = "UPDATE_SCORE";
export const FETCH_LEADERBOARD_REQUEST = "FETCH_LEADERBOARD_REQUEST";
export const FETCH_LEADERBOARD_SUCCESS = "FETCH_LEADERBOARD_SUCCESS";
export const UPDATE_USER_SCORE = 'UPDATE_USER_SCORE'
export const UPDATE_USER_SCORE_SUCCESS = 'UPDATE_USER_SCORE_SUCCESS';
export const UPDATE_LEADERBOARD = "UPDATE_LEADERBOARD";
export const LOGOUT_USER = "LOGOUT_USER";



export const signupUserRequest = (userData) => ({
  type: SIGNUP_USER_REQUEST,
  payload: userData,
});

export const signupUserSuccess = (user) => ({
  type: SIGNUP_USER_SUCCESS,
  payload: user,
});

export const signupUserFailure = (error) => ({
  type: SIGNUP_USER_FAILURE,
  payload: error,
});

export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: {
    email,
    password,
    // navigate
  }
});

export const loginSuccess = (user) => ({
  type : LOGIN_SUCCESS,
  payload : user,
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
  
// export const updateLeaderboard = (leaderboard) => ({
//   type: UPDATE_LEADERBOARD,
//   payload: leaderboard,
// });

// export const updateUserScore = (email, newScore) => {
//   return async (dispatch) => {
//     try {
//       // Get user by email
//       const userResponse = await axios.get(`http://localhost:5000/users?email=${email}`);
//       const user = userResponse.data[0];
      
//       // Update user score
//       await axios.put(`http://localhost:5000/users/${user.id}`, {
//         ...user,
//         score: newScore
//       });

//       // Refresh leaderboard and user data
//       dispatch({ type: FETCH_LEADERBOARD_REQUEST });
//       dispatch({ type: LOGIN_REQUEST }); // Refresh current user data

//     } catch (error) {
//       console.error("Score update failed:", error);
//     }
//   };
// };

export const updateUserScore = (email, score) => ({
  type: UPDATE_USER_SCORE,
  payload: { email, score },
});

export const updateUserScoreSuccess = (user) => ({
  type: UPDATE_USER_SCORE_SUCCESS,
  payload: user,
})

export const logoutUser = () => {
  return {
      type: LOGOUT_USER,
  };
};
export const LOGIN_REQUEST  = "LOGIN_REQUEST";
export const LOGIN_SUCCESS  = "LOGIN_SUCCESS";
export const LOGIN_FAILURE  = "LOGIN_FAILURE";
export const UPDATE_SCORE = "UPDATE_SCORE";
export const FETCH_LEADERBOARD_REQUEST = "FETCH_LEADERBOARD_REQUEST";
export const UPDATE_LEADERBOARD = "UPDATE_LEADERBOARD";
export const LOGOUT_USER = "LOGOUT_USER";


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
  
export const updateLeaderboard = (leaderboard) => ({
  type: UPDATE_LEADERBOARD,
  // payload: leaderboard,
});

export const logoutUser = () => {
  return {
      type: LOGOUT_USER,
  };
};
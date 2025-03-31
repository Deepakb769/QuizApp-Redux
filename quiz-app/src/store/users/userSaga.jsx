import { takeLatest, call, put } from "redux-saga/effects";
import { LOGIN_REQUEST, FETCH_LEADERBOARD_REQUEST, SIGNUP_USER_REQUEST, UPDATE_USER_SCORE, signupUserRequest, UPDATE_LEADERBOARD, signupUserSuccess, signupUserFailure, loginSuccess, loginFailure, fetchLeaderboardSuccess } from "./userActions";
import axios from "axios";



function* signupUserSaga(action) {
  try {
    const response = yield call(axios.post, `http://localhost:5000/users`, action.payload);
    yield put(signupUserSuccess(response.data));
  } catch (error) {
    yield put(signupUserFailure(error.message));
  }
}

function* loginUserSaga(action){
    console.log(action)
    try{
        const { email, password } = action.payload || {};
        const response = yield call(() => 
            axios.get(`http://localhost:5000/users?email=${email}`)
        );
        // ?email=${action.payload.email}
        const users = response.data;
        const user = users.find(u => u.email === email)

        // console.log(users)
        

        // if(user.length > 0 && user[0].password === password){
        if(user && user.password === password){
            yield put(loginSuccess(user)) // dispatchs success action
            // navigate('/QuizQuestion')
        } else {
            yield put(loginFailure("Invalid email or password"))
        }
    }
    catch(error){
        console.log(error)
        yield put(loginFailure("Error while logging in"))
    }
}

// userSaga.js
// function* fetchLeaderboardSaga() {
//     try {
//       const response = yield call(axios.get, "http://localhost:5000/users");
//       const sortedData = response.data.sort((a, b) => b.score - a.score);
//       yield put({ type: "FETCH_LEADERBOARD_SUCCESS", payload: sortedData });
//     } catch (error) {
//       console.log("Failed to fetch leaderboard:", error);
//     }
//   }

function* fetchLeaderboardSaga() {
  try {
    const response = yield call(axios.get, "http://localhost:5000/users");
    const sortedData = response.data.sort((a, b) => {
      // Primary sort: score descending
      if (b.score !== a.score) return b.score - a.score;
      // Secondary sort: recent updates first
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    yield put(fetchLeaderboardSuccess(sortedData));
    // yield put({ type: UPDATE_LEADERBOARD, payload: sortedData });
  } catch (error) {
    console.log("Failed to fetch leaderboard:", error);
  }
}

function* updateUserScoreSaga(action) {
  try {
      const { email, score } = action.payload;
      const response = yield call(axios.get, `http://localhost:5000/users?email=${email}`);
      const user = response.data[0];
      
      if (user) {
        const updatedScore = user.score ? user.score + score : score
          const updatedUser = { ...user, score: updatedScore };

          yield call(axios.put, `http://localhost:5000/users/${user.id}`, updatedUser);

          const leaderboardResponse = yield call(axios.get, "http://localhost:5000/users")
          console.log(leaderboardResponse)
          // const sortedLeaderboard = leaderboardResponse.data.sort

          // yield put({ type: FETCH_LEADERBOARD_REQUEST }); // Refresh leaderboard
      }
  } catch (error) {
      console.error("Score update failed:", error);
  }
}

export function* watchLogin(){
    yield takeLatest(LOGIN_REQUEST, loginUserSaga)
    yield takeLatest(FETCH_LEADERBOARD_REQUEST, fetchLeaderboardSaga)
    yield takeLatest(SIGNUP_USER_REQUEST, signupUserSaga);
    yield takeLatest(UPDATE_USER_SCORE, updateUserScoreSaga);
}


import { takeLatest, call, put } from "redux-saga/effects";
import { LOGIN_REQUEST, FETCH_LEADERBOARD_REQUEST, FETCH_LEADERBOARD_SUCCESS ,UPDATE_LEADERBOARD, loginSuccess, loginFailure } from "./userActions";
import axios from "axios";

function* loginUserSaga(action){
    console.log(action)
    try{
        const { email, password, navigate } = action.payload || {};
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
            navigate('/QuizQuestion')
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
function* fetchLeaderboardSaga() {
    try {
      const response = yield call(axios.get, "http://localhost:5000/users");
      const sortedLeaderboard = response.data.sort((a, b) => b.score - a.score);
      yield put({ type: "FETCH_LEADERBOARD_SUCCESS", payload: sortedLeaderboard });
    } catch (error) {
      console.log("Failed to fetch leaderboard:", error);
    }
  }

export function* watchLogin(){
    yield takeLatest(LOGIN_REQUEST, loginUserSaga)
    yield takeLatest(FETCH_LEADERBOARD_REQUEST, fetchLeaderboardSaga)
}


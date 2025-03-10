import { takeLatest, call, put } from "redux-saga/effects";
import { LOGIN_REQUEST, FETCH_LEADERBOARD_REQUEST, UPDATE_LEADERBOARD, loginSuccess, loginFailure } from "./userActions";
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

function* fetchLeaderboardSaga() {
    try {
      const response = yield call(axios.get, "http://localhost:5000/leaderboard");
      yield put({ type: UPDATE_LEADERBOARD, payload: response.data });
    } catch (error) {
      console.log("Failed to fetch leaderboard:", error);
    }
  }


// function* loginUserSaga(action) {
//     try {
//         const response = yield call(() => axios.get(`http://localhost:5000/users?email=${action.payload.email}`));
//         const users = response.data;

//         // Manually find the user by email
//         const user = users.find(u => u.email === action.payload.email);

//         if (user && user.password === action.payload.password) {
//             yield put(loginSuccess(user)); // dispatch success action
//         } else {
//             yield put(loginFailure("Invalid email or password"));
//         }
//     } catch (error) {
//         console.log(error);
//         yield put(loginFailure("Error while logging in"));
//     }
// }


export function* watchLogin(){
    yield takeLatest(LOGIN_REQUEST, loginUserSaga)
    yield takeLatest(FETCH_LEADERBOARD_REQUEST, fetchLeaderboardSaga)
}


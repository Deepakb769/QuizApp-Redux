import { takeLatest, call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_QUESTIONS_REQUEST, fetchQuestionsSuccess, fetchLeaderboardRequest, fetchQuestionsFailure, SAVE_USER_SCORE } from './questionAction';

function* fetchQuestionsSaga() {
    try {
        console.log("Fetching questions...");
        const response = yield call(axios.get, 'http://localhost:5000/questions');
        yield put(fetchQuestionsSuccess(response.data)); // Dispatch success action
    } catch (error) {
        console.error("Fetch Error:", error);
        yield put(fetchQuestionsFailure("Failed to load questions"));
    }
}

// function saveUserScoreSaga(action){
//     try{
//         const {user, score} = action.payload;
//         yield call( 
//             axios.post, 
//             `http://localhost:5000/users/${user.id}`,
//             {score : score}
//         );
//         yield put(fetchLeaderboardRequest())
//     }
//     catch(error){
//         console.log("Failed to save:", error)
//     }
// }

function* saveUserScoreSaga(action) {
    try {
        const { user, score } = action.payload;

        // Get the user from the JSON server
        const { data: existingUser } = yield call(axios.get, `http://localhost:5000/users?email=${user.email}`);

        if (existingUser.length > 0) {
            const userId = existingUser[0].id;

            // Update user score on the server
            yield call(axios.patch, `http://localhost:5000/users/${userId}`, { score });

            // Fetch updated leaderboard
            yield put(fetchLeaderboardRequest());
        }
    } catch (error) {
        console.error("Failed to save user score:", error);
    }
}

export function* watchSaveScore(){
    yield takeLatest(SAVE_USER_SCORE, saveUserScoreSaga)
}

export function* watchQuestionsSaga() {
    yield takeLatest(FETCH_QUESTIONS_REQUEST, fetchQuestionsSaga);
}

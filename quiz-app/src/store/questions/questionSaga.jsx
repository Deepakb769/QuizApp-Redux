  import { takeLatest, call, put } from 'redux-saga/effects';
  import axios from 'axios';
  import {
    FETCH_QUESTIONS_REQUEST,
    SAVE_USER_SCORE,
    fetchQuestionsSuccess,
    fetchQuestionsFailure,
    fetchLeaderboardRequest
  } from './questionAction';

  // API endpoints
  // const QUESTIONS_API = 'http://localhost:5000/questions';
  // const USERS_API = 'http://localhost:5000/users';

  // Utility function for artificial delay
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  function* handleFetchQuestions() {
    try {
      console.log("Initiating questions fetch...");
      const response = yield call(axios.get, 'http://localhost:5000/questions');
      yield put(fetchQuestionsSuccess(response.data));
    } catch (error) {
      console.error("Questions fetch failed:", error);
      yield put(fetchQuestionsFailure("Failed to load questions"));
    }
  }

  function* handleSaveUserScore(action) {
    try {
      const { user, score } = action.payload;
      console.log("Checking user email:", user);

      // 1. Fetch current user data
      const { data: users } = yield call(
        axios.get,
        `http://localhost:5000/users?email=${user.email}`
      );

      if (users.length) {
        const currentUser = users[0];
        const newTotalScore = currentUser.score + score; // Calculate new total score

        // 2. Update user score on server
        yield call(
          axios.patch,
          `http://localhost:5000/users/${currentUser.id}`,
          {
            score : newTotalScore,
            updatedAt: new Date().toISOString()
          }
        );
        console.log(score);
      }

      // 3. Refresh leaderboard data
      yield put(fetchLeaderboardRequest());
      

      // 4. Update local user state
      yield put({
        type: "USER_SCORE_REQUEST",  //Define the action of 
        payload: {
          email: user.email,
          score : newTotalScore
        }
      });
      yield put(fetchLeaderboardRequest())
      yield put({ type: "FETCH_LEADERBOARD_REQUEST" });
      
      yield put({ type: "USER_SCORE_SUCCESS" });

    } catch (error) {
      yield put({ type: "USER_SCORE_FAILURE", error });
      console.error("Score update operation failed:", error);
    }
  }


  export function* watchQuestionRequests() {
    yield takeLatest(FETCH_QUESTIONS_REQUEST, handleFetchQuestions);
  }

  export function* watchUserScoreSaves() {
    yield takeLatest(SAVE_USER_SCORE, handleSaveUserScore);
  }
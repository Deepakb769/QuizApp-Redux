// import { takeLatest, call, put } from "redux-saga/effects";
// import axios from "axios";
// import { 
//     FETCH_QUESTIONS_REQUEST,
//     fetchQuestionsSuccess,
//     fetchQuestionsFailure,
// } from "./questionAction";

// // function* fetchQuestionsSaga(){
// //     try{    
// //         console.log("Fetching questions...")
// //         // const response = yield call(axios.get, `http://localhost:5000/questions?questions`);
// //         const res = yield call(axios.get, "http://localhost:5000/questions")
// //         const data = res.data
// //         console.log(data)
// //         yield put(fetchQuestionsSuccess(data));
// //     }
// //     catch(error){
// //         console.log(error)
// //         yield put(fetchQuestionsFailure("Error while fetching questions"))
// //     }
// // }

// // function* fetchQuestionsSaga() {
// //     try {    
// //         console.log("Fetching questions...");
// //         // Correct the call syntax: pass function and arguments separately
// //         const res = yield call(axios.get, "http://localhost:5000/questions");
// //         // Directly access the array from response data
// //         const questions = res.data;
// //         console.log("Received questions:", questions);
// //         yield put(fetchQuestionsSuccess(questions));
// //     } catch (error) {
// //         console.error("Fetch error:", error);
// //         yield put(fetchQuestionsFailure(error.message));
// //     }
// // }

// function* fetchQuestionsSaga() {
//     try {
//         console.log("Fetching questions...");
//         const response = yield call(axios.get, "http://localhost:5000/questions");
        
//         // If the response is an object containing the questions array
//         const questions = response.data.questions; // Key fix here
        
//         console.log("Received questions:", questions);
//         yield put(fetchQuestionsSuccess(questions));
//     } catch (error) {
//         console.error("Fetch error:", error);
//         yield put(fetchQuestionsFailure(error.message));
//     }
// }

// export function* watchQuestionsSaga() {
//     yield takeLatest(FETCH_QUESTIONS_REQUEST, fetchQuestionsSaga);
// }

import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_QUESTIONS_REQUEST, fetchQuestionsSuccess, fetchQuestionsFailure } from './questionAction';

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

export function* watchQuestionsSaga() {
    yield takeLatest(FETCH_QUESTIONS_REQUEST, fetchQuestionsSaga);
}

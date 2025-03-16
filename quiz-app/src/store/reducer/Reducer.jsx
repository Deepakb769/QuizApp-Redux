// import {
//     SET_QUESTIONS,
//     SET_CURRENT_QUEST_INDEX,
//     SET_SELECTED_OPTION,
//     RESET_QUIZ,
//     loadQuestions,
//     UPDATE_SCORE,
//     loadCurrentQuestIndex,
//     SIGNUP_USER,
//     LOGIN_REQUEST,
//     LOGIN_SUCCESS,
//     LOGIN_FAILURE,
//     // LOGIN_USER,
//     // LOGOUT_USER,
// } from '../action/Action'

// const initialState = {
//     questions: [],
//     currentQuestIndex: loadCurrentQuestIndex(),
//     selectedOption: null,
//     score: 0,
//     email: null,
//     loading: false,
//     error: null,
// }

// const quizReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SIGNUP_USER:
//             return {
//                 ...state,
//                 users: [...state.users, action.payload]
//             }
//         case LOGIN_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//             };
//         case LOGIN_SUCCESS: 
//             return {
//                 ...state,
//                 loading: false,
//                 email : action.payload,
//             };
//         case LOGIN_FAILURE:
//             return {
//                 ...state,
//                 loading : false,
//                 error : action.payload,
//             }
//         case SET_QUESTIONS:
//             return {
//                 ...state,
//                 questions: action.payload
//             };
//         case SET_CURRENT_QUEST_INDEX:
//             return {
//                 ...state,
//                 currentQuestIndex: action.payload
//             }
//         case SET_SELECTED_OPTION:
//             return {
//                 ...state,
//                 selectedOption: action.payload
//             }
//         case RESET_QUIZ:
//             return {
//                 initialState,
//                 questions: state.questions,
//                 score: 0,
//                 // ...state,
//                 // currentQuestIndex : 0

//             }
//         case UPDATE_SCORE:
//             return {
//                 ...state,
//                 score: state.score + action.payload
//             }
//         case LOGOUT_USER:
//             return {
//                 ...state,
//                 currentUser: null
//             };
//         default:
//             return state
//     }
// }

// export default quizReducer
// export const SIGNUP_AUTH = 'quiz/signupAuth'
// export const SET_QUESTIONS = 'quiz/setQuestions'
// export const SET_CURRENT_QUEST_INDEX = 'quiz/setCurrentQuestIndex'
// export const SET_SELECTED_OPTION = 'quiz/setSelectedOption'
// export const RESET_QUIZ = 'quiz/resetQuiz'
// export const UPDATE_SCORE = 'quiz/updateScore'
// // export const SIGNUP_USER = "quiz/signupUser";
// // export const LOGIN_REQUEST  = "quiz/loginRequest";
// // export const LOGIN_SUCCESS  = "quiz/loginSuccess";
// // export const LOGIN_FAILURE  = "quiz/loginFailure";
// export const LOGOUT_USER = "quiz/logoutUser";

// export const signupUser = (userData) => async (dispatch) => {
//   try {
//       const response = await axios.post("http://localhost:5000/users", userData);
//       dispatch({ type: SIGNUP_USER, payload: response.data });
//   } catch (error) {
//       console.error("Signup failed:", error);
//   }
// };

// // export const loginUser = (userData) => async (dispatch) => {
// //   try {
// //       const response = await axios.get(`${"http://localhost:5000/users"}?email=${userData.email}&password=${userData.password}`);
// //       if (response.data.length > 0) {
// //           dispatch({ type: LOGIN_USER, payload: response.data[0] });
// //       } else {
// //           console.error("Invalid email or password");
// //       }
// //   } catch (error) {
// //       console.error("Login failed:", error);
// //   }
// // };

// // export const loginRequest = (email, password) => ({
// //   type : LOGIN_REQUEST,
// //   payload : {email , password}
// // })

// // export const loginSuccess = (email) => ({
// //   type : LOGIN_SUCCESS,
// //   payload : email,
// // })

// // export const loginFailure = (error) => ({
// //   type : LOGIN_FAILURE,
// //   payload : error,
// // })

// export const logoutUser = () => {
//   return { type: LOGOUT_USER };
// };

// export const loadQuestions = () => {
//     return async (dispatch) => {
//       try {
//         const response = await fetch("http://localhost:5000/questions");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log("Fetching",data)
//         dispatch({ type: SET_QUESTIONS, payload: data });
//       } catch (error) {
//         console.error("Failed to fetch questions:", error);
//         // Dispatch an error state if needed
//       }
//     };
//   };

// export const saveQuestions = (questions) => {
//     localStorage.setItem('questionText', JSON.stringify(questions))
// }

// export const loadCurrentQuestIndex = () => {
//     return parseInt(localStorage.getItem('currentQuestIndex')) || 0;
// }

// export const setQuestions = (questions) => {
//     saveQuestions(questions)
//     return { type: SET_QUESTIONS, payload: questions };
// }

// export const setCurrentQuestIndex = (index) => {
//     localStorage.setItem("currentQuestIndex", index.toString())
//     return { type: SET_CURRENT_QUEST_INDEX, payload: index }
// }

// export const setSelectedOption = (option) => {
//     return { type: SET_SELECTED_OPTION, payload: option }
// }

// export const resetQuiz = () => {
//     localStorage.removeItem('currentQuestIndex')
//     return { type: RESET_QUIZ }
// }

// export const updateScore = (points) => {
//   return { type : UPDATE_SCORE, payload : points }
// }

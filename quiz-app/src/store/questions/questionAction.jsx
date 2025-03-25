  import axios from "axios";

  export const FETCH_QUESTIONS_REQUEST = "FETCH_QUESTIONS_REQUEST";
  export const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";
  export const FETCH_QUESTIONS_FAILURE = "FETCH_QUESTIONS_FAILURE";
  export const SET_CURRENT_QUEST_INDEX = "SET_CURRENT_QUEST_INDEX";
  export const SET_SELECTED_OPTION = "SET_SELECTED_OPTION";
  export const RESET_QUIZ = "RESET_QUIZ";
  export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';
  export const USER_SCORE_REQUEST = 'USER_SCORE_REQUEST';
  export const USER_SCORE_SUCCESS = 'USER_SCORE_SUCCESS';
  export const USER_SCORE_FAILED = 'USER_SCORE_FAILED';
  export const UPDATE_SCORE = 'UPDATE_SCORE';
  export const FETCH_LEADERBOARD_REQUEST = "FETCH_LEADERBOARD_REQUEST";
  export const SAVE_USER_SCORE = "SAVE_USER_SCORE";

  export const fetchQuestionsRequest = () => ({
    type: FETCH_QUESTIONS_REQUEST
  });

  export const fetchQuestionsSuccess = (questions) => ({
    type: FETCH_QUESTIONS_SUCCESS,
    payload: questions
  });

  export const fetchQuestionsFailure = (error) => ({
    type: FETCH_QUESTIONS_FAILURE,
    payload: error
  });

  export const setCurrentQuestIndex = (index) => ({
    type: SET_CURRENT_QUEST_INDEX,
    payload: index
  });

  export const setSelectedOption = (optionIndex) => ({
    type: SET_SELECTED_OPTION,
    payload: optionIndex
  });

  export const resetQuiz = () => ({
    type: RESET_QUIZ
  });

  export const setLoggedInUser = (user) => ({
      type: SET_LOGGED_IN_USER,
      payload: user
  });

  export const updateScore = (points) => ({
      type: UPDATE_SCORE,
      payload: points
  });


  // Async Action to Fetch Questions
  export const fetchQuestions = () => async (dispatch) => {
    dispatch(fetchQuestionsRequest());
    try {
      const response = await axios.get("http://localhost:5000/questions");
      dispatch(fetchQuestionsSuccess(response.data));
    } catch (error) {
      dispatch(fetchQuestionsFailure("Failed to load questions"));
    }
  };

  export const fetchLeaderboardRequest = () => ({
    type: FETCH_LEADERBOARD_REQUEST,
  });

  export const saveUserScore = (user, score) => {
    return {
        type: "SAVE_USER_SCORE",
        payload: { user, score }
    };
  };

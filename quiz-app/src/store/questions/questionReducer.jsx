import { act } from "react";
import {
    FETCH_QUESTIONS_REQUEST,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILURE,
    SET_CURRENT_QUEST_INDEX,
    SET_SELECTED_OPTION,
    USER_SCORE_REQUEST,
    USER_SCORE_SUCCESS,
    USER_SCORE_FAILED,
    RESET_QUIZ,
    SET_LOGGED_IN_USER,
    UPDATE_SCORE,
    SAVE_USER_SCORE
} from "./questionAction";

const initialState = {
    questions: [],
    currentQuestIndex: 0,
    selectedOption: null,
    score: 0,
    loggedInUser: null,
    loading: false,
    error: null,
    users : null,
    scoreSaveCompleted: false
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUESTIONS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_QUESTIONS_SUCCESS:
            return { ...state, loading: false, questions: action.payload };
        case FETCH_QUESTIONS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SET_CURRENT_QUEST_INDEX:
            return { ...state, currentQuestIndex: action.payload, selectedOption: null };
        case SET_SELECTED_OPTION:
            return { ...state, selectedOption: action.payload};
        case USER_SCORE_REQUEST:
            return { ...state, loading: true, error: null };
        case USER_SCORE_SUCCESS:
            return { ...state, score : action.payload.score, scoreSaveCompleted: true }
        case USER_SCORE_FAILED:
            return {...state, loading: false, error: action.payload, scoreSaveCompleted: false }
        case UPDATE_SCORE:
            return { ...state, score: state.score + action.payload };
        case SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.payload };
        case RESET_QUIZ:
            return { ...state, score : 0, currentQuestIndex: 0, selectedOption: null };
            case "SAVE_USER_SCORE_COMPLETED":
                return {
                  ...state,
                  scoreSaveCompleted: true
                };
              
              case "SAVE_USER_SCORE_FAILED":
                return {
                  ...state,
                  scoreSaveCompleted: false,
                  error: action.error
                };
        case SAVE_USER_SCORE:
            return{
                ...state,
                users : action.payload.user,
                score : action.payload.score
            }
        default:
            return state;
    }
};

export default questionReducer;

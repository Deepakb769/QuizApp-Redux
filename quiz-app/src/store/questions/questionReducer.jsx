import { act } from "react";
import {
    FETCH_QUESTIONS_REQUEST,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILURE,
    SET_CURRENT_QUEST_INDEX,
    SET_SELECTED_OPTION,
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
    users : null
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
            return { ...state, selectedOption: action.payload };
        case UPDATE_SCORE:
            return { ...state, score: state.score + action.payload };
        case SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.payload };
        case RESET_QUIZ:
            return { ...state, score : 0, currentQuestIndex: 0, selectedOption: null };
            case SAVE_USER_SCORE:
                return {
                    ...state,
                    users: state.users.map(u =>
                        u.email === action.payload.user.email
                            ? { ...u, score: action.payload.score }
                            : u
                    ),
                };
        default:
            return state;
    }
};

export default questionReducer;

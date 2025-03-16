import {
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    UPDATE_SCORE,
    UPDATE_LEADERBOARD,
    FETCH_LEADERBOARD_SUCCESS,
    LOGOUT_USER
} from './userActions'

const initialState = {
    user: null,
    loading: false,
    error: null,
    score: 0,
    leaderboard: [],
    isAuthenticated: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP_USER_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'SIGNUP_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null
            };
        case 'SIGNUP_USER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload || {},
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case "UPDATE_SCORE":
            return {
                ...state,
                user: {
                    ...state.user,
                    score: action.payload
                }
            };
        case "UPDATE_LEADERBOARD":
            return {
                ...state,
                leaderboard: action.payload
            };
        case FETCH_LEADERBOARD_SUCCESS:
            return {
                ...state,
                leaderboard: action.payload, // Store sorted leaderboard data
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                leaderboard: [],
                isAuthenticated: false,
            };
        default:
            return state
    }
}

export default userReducer;
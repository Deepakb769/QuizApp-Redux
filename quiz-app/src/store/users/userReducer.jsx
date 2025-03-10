import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    UPDATE_SCORE,
    UPDATE_LEADERBOARD,
    LOGOUT_USER
} from './userActions'

const initialState = {
    users: null,
    loading: false,
    error: null,
    score: 0,
    leaderboard: [],
    isAuthenticated: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
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
                user: action.payload,
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
                score: state.score + action.payload
            };
        case "UPDATE_LEADERBOARD":
            return {
                ...state,
                leaderboard: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                leaderboard : [],
                isAuthenticated: false,
            };
        default:
            return state
    }
}

export default userReducer;
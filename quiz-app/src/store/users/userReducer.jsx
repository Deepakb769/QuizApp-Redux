import {
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    UPDATE_SCORE,
    UPDATE_USER_SCORE,
    UPDATE_USER_SCORE_SUCCESS,
    UPDATE_LEADERBOARD,
    FETCH_LEADERBOARD_REQUEST,
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
    console.log(action.type)
    switch (action.type) {
        case SIGNUP_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null
            };
        case SIGNUP_USER_FAILURE:
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
                user: action.payload,
                isAuthenticated: true
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case UPDATE_USER_SCORE: {
            const updatedLeaderboard = state.leaderboard.map(user =>
                user.email === action.payload.email
                    ? { ...user, score: action.payload.score }
                    : user
            );
            return {
                ...state,
                user: {
                    ...state.user,
                    score: action.payload.score //  Update the user's score in the state
                },
                leaderboard: updatedLeaderboard,
            };
            console.log(UPDATE_USER_SCORE)
        }

        case UPDATE_USER_SCORE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    score: action.payload.score
                }
            };


        case UPDATE_SCORE:
            return {
                ...state,
                score: action.payload
            };
        case UPDATE_LEADERBOARD:
            return {
                ...state,
                leaderboard: action.payload
            };
        // case UPDATE_LEADERBOARD: {
        //     const sortedLeaderboard = [...action.payload].sort((a, b) => {
        //         if (b.score !== a.score) return b.score - a.score;
        //         return new Date(b.updatedAt) - new Date(a.updatedAt);
        //     });
        //     console.log(sortedLeaderboard)
        //     return { ...state, leaderboard: sortedLeaderboard };
        // }

        case FETCH_LEADERBOARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_LEADERBOARD_SUCCESS:
            return {
                ...state,
                leaderboard: action.payload,
                // user: action.payload.find(u => u.email === state.user?.email) || state.user,
                loading: false
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
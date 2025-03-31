import {
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    UPDATE_SCORE,
    UPDATE_USER_SCORE,
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
                isAuthenticated: true
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        // Current reducer code
        // case "UPDATE_USER_SCORE":
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             score: action.payload.score
        //         },
        //         leaderboard: state.leaderboard.map(user =>
        //             user.email === action.payload.email
        //                 ? { ...user, score: action.payload.score }
        //                 : user
        //         )
        //     };

        case UPDATE_USER_SCORE: {
            const updatedLeaderboard = state.leaderboard.map(user =>
                user.email === action.payload.email
                    ? { ...user, score: action.payload.score }
                    : user
            );
            return {
                 ...state,
                 user :  {
                    ...state.user,
                    score: action.payload.score
                 },
                leaderboard: updatedLeaderboard,
            };
        }

        case UPDATE_SCORE:
            return {
                ...state,
                score: action.payload
            };
        // case UPDATE_LEADERBOARD:
        //     return {
        //         ...state,
        //         leaderboard: action.payload
        //     };
        // case UPDATE_LEADERBOARD: {
        //     const sortedLeaderboard = [...action.payload].sort((a, b) => {
        //         if (b.score !== a.score) return b.score - a.score;
        //         return new Date(b.updatedAt) - new Date(a.updatedAt);
        //     });
        //     console.log(sortedLeaderboard)
        //     return { ...state, leaderboard: sortedLeaderboard };
        // }
        case FETCH_LEADERBOARD_SUCCESS:
            const currentUserEmail = state.user?.email;
            let updatedUser = state.user;

            if(currentUserEmail){
                const leaderboardUser = action.payload.find(user => user.email === currentUserEmail);
                if(leaderboardUser){
                    updatedUser = {...state.user ,...leaderboardUser}
                }
            }
            
            return {
                ...state,
                leaderboard: action.payload,
                user: updatedUser,
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
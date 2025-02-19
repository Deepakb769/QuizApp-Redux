import {
    SET_QUESTIONS,
    SET_CURRENT_QUEST_INDEX,
    SET_SELECTED_OPTION,
    RESET_QUIZ,
    loadQuestions,
    loadCurrentQuestIndex,
} from '../action/Action'

const initialState = {
    questions : loadQuestions(),
    currentQuestIndex : loadCurrentQuestIndex(),
    selectedOption : null,
}

const quizReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_QUESTIONS :
            return {
                ...state,
                questions : action.payload
            };
        case SET_CURRENT_QUEST_INDEX :
            return{
                ...state,
                currentQuestIndex : action.payload
            }
        case SET_SELECTED_OPTION :
            return{
                ...state,
                selectedOption : action.payload
            }
        case RESET_QUIZ :
            return{
                ...state,
                currentQuestIndex : 0
            }
        default :
            return state
    }
}

export default quizReducer
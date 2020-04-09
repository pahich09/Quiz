import {ADD_QUESTION, CREATE_QUIZ} from "../actions/actionTypes";

const initState = { quiz: []}

export const createReducer = (state = initState, action)=>{
switch (action.type) {
    case ADD_QUESTION:
        return {
            ...state, quiz: [...state.quiz, action.quiz]
        }
    case CREATE_QUIZ:
        return {
            ...state, quiz: []
        }
    default:
        return state
}
}
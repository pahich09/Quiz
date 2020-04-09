import {
    CHECK_ANSWER,
    FETCH_ERROR,
    FETCH_QUIZ,
    FETCH_START,
    FETCH_SUCCESS, FINISH_QUIZ, RETRY_QUIZ, SET_ACTIVE_QUESTION
} from "../actions/actionTypes";

const initState = {
    quizList: [],
    isLoading: true,
    error: null,
    activeQuestion: 0,
    answerResult: null,
    isFinished: false,
    quizResults: [],
    quiz: [],
}
export const quizReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state, isLoading: true
            }
        case FETCH_SUCCESS:
            return {
                ...state, isLoading: false, quizList: action.quizList
            }
        case FETCH_ERROR:
            return {
                ...state, isLoading: false, error: action.error
            }
        case FETCH_QUIZ:
            return {
                ...state, quiz: action.quiz, isLoading: false,
            }
        case CHECK_ANSWER:
            return {
                ...state, answerResult: {
                    id: action.id, result: action.result
                },
                quizResults: [...state.quizResults, {
                    questionId: state.activeQuestion,
                    questionRes: action.result
                }]
            }
        case SET_ACTIVE_QUESTION:
            return {
                ...state, activeQuestion: action.activeQuestion, answerResult: null
            }
        case FINISH_QUIZ:
            return {
                ...state, isFinished: true
            }
        case RETRY_QUIZ:
            return {
                ...state, activeQuestion: 0,
                answerResult: null,
                isFinished: false,
                quizResults: []
            }

        default:
            return state
    }
}
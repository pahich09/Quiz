import {axiosInstance} from '../../services/axiois/axios'
import {
    CHECK_ANSWER,
    FETCH_ERROR,
    FETCH_QUIZ,
    FETCH_START,
    FETCH_SUCCESS,
    FINISH_QUIZ, RETRY_QUIZ, SET_ACTIVE_QUESTION
} from "./actionTypes";

const fetchStart = () => (
    {
        type: FETCH_START,
    }
)
const fetchSuccess = data => (
    {
        type: FETCH_SUCCESS,
        quizList: data,
    }
)
const fetchError = e => (
    {
        type: FETCH_ERROR,
        error: e,
    }
)
const fetchQuiz = data => ({
    type: FETCH_QUIZ,
    quiz: data
})
const checkAnswer = (answerId, result) => ({
    type: CHECK_ANSWER,
    id: answerId,
    result
})
const setActiveQueston = activeQuestion => ({
    type: SET_ACTIVE_QUESTION,
    activeQuestion
})
const finishQuiz = () => ({
    type: FINISH_QUIZ
})
export const retryQuiz = () => ({
    type: RETRY_QUIZ
})

export const fetchDataThunk = () => async dispatch => {
    try {
        dispatch(fetchStart())
        const {data} = await axiosInstance.get('quizez.json');
        const quizList = [];
        Object.keys(data).forEach((el, i) => {
            quizList.push({
                testId: el,
                name: `Test #${i + 1}`
            })
        })
        dispatch(fetchSuccess(quizList))
    } catch (e) {
        console.log(e)
        dispatch(fetchError(e))
    }
}



export const fetchQuizThunk = id => async dispatch => {
    try {
        dispatch(fetchStart())
        const {data} = await axiosInstance.get(`quizez/${id}.json`)
        dispatch(fetchQuiz(data))
    } catch (e) {
        console.log(e)
        dispatch(fetchError(e))
    }
}

export const checkAnswerThunk = answerId => (dispatch, getState) => {
    if (!getState().quiz.answerResult) {
        answerId === getState().quiz.quiz[getState().quiz.activeQuestion].rightAnswerId
            ?
            dispatch(checkAnswer(answerId, 'success'))
            :
            dispatch(checkAnswer(answerId, 'error'))
        const timeOut = setTimeout(() => {
            if (getState().quiz.activeQuestion === getState().quiz.quiz.length - 1) {
                dispatch(finishQuiz());
            } else {
                let activeQuestion = getState().quiz.activeQuestion + 1;
                dispatch(setActiveQueston(activeQuestion))
            }
            clearTimeout(timeOut);
        }, 800);
    }
}


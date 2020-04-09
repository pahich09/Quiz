import {ADD_QUESTION, CREATE_QUIZ} from "./actionTypes";
import {axiosInstance} from "../../services/axiois/axios";


export const addQuestion = questionData =>({
    type: ADD_QUESTION,
    quiz: questionData
})
export const createQuiz = () => async (dispatch, getState) =>{
    try {
        await axiosInstance.post('quizez.json', getState().create.quiz)

          dispatch({
              type: CREATE_QUIZ
          })
    }
    catch (e){
        console.log(e.message)
    }
}

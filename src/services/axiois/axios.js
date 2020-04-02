import Axios from "axios";

export const axiosInstance  = Axios.create({
    baseURL: 'https://react-quiz-42795.firebaseio.com/'
})
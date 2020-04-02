import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import styles from './QuizList.module.css'
import {axiosInstance} from "../../services/axiois/axios";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component{
    state = {
        quizList: [],
        isLoading: true,
    }
    renderList = ()=>{
    return this.state.quizList.map(item=>(
        <li key={item.testId}>
            <NavLink to={`/quiz/${item.testId}`}>
               {item.name}
            </NavLink>
        </li>
    ))
    }
    async componentDidMount() {
       try{
       const {data} =  await axiosInstance.get('quizez.json');
       const quizList = [];
       Object.keys(data).forEach((el, i)=>{
           quizList.push({
               testId: el,
               name: `Test #${i+1}`
           })
       })
        this.setState({
            quizList,
            isLoading: false
        })
        }catch (e) {
            console.log(e)
        }
    }

    render() {
        return <div className={styles.QuizList}>
           <h1>Список тестов</h1>
            {this.state.isLoading
                ?
                <Loader/>
                :
                <ul>
                    {this.renderList()}
                </ul>
            }

        </div>
    }
}
export default QuizList
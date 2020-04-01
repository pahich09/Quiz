import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import styles from './QuizList.module.css'

class QuizList extends Component{
    renderList = ()=>{
    return [1,2,3].map(item=>(
        <li key={item}>
            <NavLink to={`/quiz/${item}`}>
                Test #{item}
            </NavLink>
        </li>
    ))
    }


    render() {
        return <div className={styles.QuizList}>
           <h1>Список тестов</h1>
            <ul>
                {this.renderList()}
            </ul>
        </div>
    }
}
export default QuizList
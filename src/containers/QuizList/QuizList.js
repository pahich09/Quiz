import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import styles from './QuizList.module.css'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchDataThunk} from "../../store/actions/quiz";

const QuizList = props => {
    let quizList = props.quiz.quizList;
    const renderList = () => {
        return quizList.map(item => (
            <li key={item.testId}>
                <NavLink to={`/quiz/${item.testId}`}>
                    {item.name}
                </NavLink>
            </li>
        ))
    }
    useEffect(() => {
        props.fetchDataThunk()
    }, [])

    return (
        <div className={styles.QuizList}>
            <h1>Список тестов</h1>
            {props.quiz.isLoading
                ?
                <Loader/>
                :
                quizList.length === 0
                    ?
                        <p>Нет доступных тестов</p>
                    :
                    <ul>
                        {renderList()}
                    </ul>
            }
        </div>
    )
}
const mapStateToProps = ({quiz}) => ({quiz})

export default connect(mapStateToProps, {fetchDataThunk})(QuizList)
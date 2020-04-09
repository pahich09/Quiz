import React from "react";
import styles from "./style.module.css";
import ResultItem from "../ResultItem";
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const QuizResult = props => {
    // debugger
  let rightRes = props.results.reduce((res, el) => {
    return el.questionRes === "success" ? ++res : res;
  }, 0);
  return (
    <div className={styles.QuizResult}>
      <h2>Results</h2>
      <ul className={styles.ResList}>
        {props.results.map(res => (
          <li key={res.questionId}>
            <ResultItem
              {...res}
              question={props.questionState[res.questionId].question}
            />
          </li>
        ))}
      </ul>
      <p>
        Right answers {rightRes} from {props.questionState.length}
      </p>
        <Button onClick={props.onResetProgress}
        type={'primary'}
        >Повторить</Button>
        <Link to={'/'}>
        <Button
        type={'success'}
        >Перейти в список тестов</Button>
        </Link>
    </div>
  );
};

export default QuizResult;

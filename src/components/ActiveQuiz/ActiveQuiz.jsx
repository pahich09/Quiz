import React from "react";
import styles from "./ActiveQuiz.module.css";
import AnswersList from "../AnswersList/AnswersList";

const ActiveQuiz = props => {
  return (
    <div className={styles.ActiveQuiz}>
      <p className={styles.Question}>
        <span style={{width: '90%'}}>
          <strong>{props.activeQuestion}.</strong>&nbsp;
          {props.question.question}
        </span>
        <span>
          {props.activeQuestion} из {props.questionsLength}
        </span>
      </p>
      <AnswersList
        answers={props.question.answers}
        onAnswerClick={props.onAnswerClick}
        answerRes={props.answerRes}
      />
    </div>
  );
};
export default ActiveQuiz;

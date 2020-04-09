import React from "react";
import styles from "./style.module.css";
import AnswersList from "../AnswersList";

const ActiveQuiz = props => {
  return (
    <div className={styles.ActiveQuiz}>
      <p className={styles.Question}>
        <span>
          <strong>{props.activeQuestion}.</strong>&nbsp;
          {props.question.question}
        </span>
        <span>
          {props.activeQuestion} of {props.questionsLength}
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

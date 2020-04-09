import React from "react";
import styles from "./AnswersList.module.css";
import AnswerItem from "../AnswerItem/AnswerItem";

const AnswersList = props => {
  return (
    <ul className={styles.AnswersList}>
      {props.answers.map(el => {
        return (
          <li key={Math.random()}>
            <AnswerItem
              answerRes={props.answerRes}
              answer={el}
              onAnswerClick={props.onAnswerClick}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default AnswersList;

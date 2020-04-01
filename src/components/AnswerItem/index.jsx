import React from "react";
import styles from "./style.module.css";

const AnswerItem = props => {
  const cls = [styles.AnswerItem];
  if (props.answerRes && props.answer.id === props.answerRes.id) {
    cls.push(styles[props.answerRes.result]);
  }
  return (
    <span
      className={cls.join(" ")}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </span>
  );
};
export default AnswerItem;

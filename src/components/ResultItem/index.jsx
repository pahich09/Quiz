import React from "react";
import styles from "./style.module.css";

const ResultItem = props => {
  let cls = ["fa"];
  cls.push(styles[props.questionRes]);
  if (props.questionRes === "error") {
    cls.push("fa-times");
  } else cls.push("fa-check");
  return (
    <div>
      <span>{props.questionId + 1}.</span>&nbsp;
      <span>{props.question}</span>
      <i className={cls.join(" ")} />
    </div>
  );
};
export default ResultItem;

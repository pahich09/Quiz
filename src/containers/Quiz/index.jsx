import React from "react";
import { Component } from "react";
import styles from "./style.module.css";
import ActiveQuiz from "../../components/ActiveQuiz";
import QuizResult from "../../components/QuizResult";

class Quiz extends Component {

  state = {
    activeQuestion: 0,
    answerResult: null,
    isFinished: false,
    quizResults: [],
    quiz: [
      {
        question: "My mother is a good cook.",
        questionId: 0,
        rightAnswerId: 2,
        answers: [
          { text: "I agree to you.", id: 1 },
          { text: "I agree with you.", id: 2 },
          { text: "I agree you.", id: 3 },
          { text: "I agree for you.", id: 4 }
        ]
      },
      {
        question: "Where's Mike?",
        questionId: 1,
        rightAnswerId: 4,
        answers: [
          { text: "For three hours.", id: 1 },
          { text: "No, he isn't.", id: 2 },
          { text: "At eight.", id: 3 },
          { text: "At school.", id: 4 }
        ]
      },
      {
        question: "*********?",
        questionId: 2,
        rightAnswerId: 4,
        answers: [
          { text: "For three hours.", id: 1 },
          { text: "No, he isn't.", id: 2 },
          { text: "At eight.", id: 3 },
          { text: "At school.", id: 4 }
        ]
      }
    ]
  };
  onAnswerClickHandler = answerId => {
    if (!this.state.answerResult) {
      this.checkAnswer(answerId);
      const timeOut = setTimeout(() => {
        this.setState(state => ({
          activeQuestion: this.testIsFinished() ? null : ++state.activeQuestion,
          answerResult: null
        }));

        clearTimeout(timeOut);
      }, 800);
    }
  };
  checkAnswer = answerId => {
    answerId === this.state.quiz[this.state.activeQuestion].rightAnswerId
      ? this.setState(state => ({
          answerResult: {
            id: answerId,
            result: "success"
          },
          quizResults: [
            ...state.quizResults,
            {
              questionId: this.state.activeQuestion,
              questionRes: "success"
            }
          ]
        }))
      : this.setState(state => ({
          answerResult: {
            id: answerId,
            result: "error"
          },
          quizResults: [
            ...state.quizResults,
            {
              questionId: this.state.activeQuestion,
              questionRes: "error"
            }
          ]
        }));
  };

  testIsFinished = () => {
    let isFinished = this.state.activeQuestion === this.state.quiz.length - 1;
    this.setState({
      isFinished
    });
    return isFinished;
  };
  retryHandler = () => {
    this.setState(prevState => ({
      activeQuestion: 0,
      answerResult: null,
      isFinished: false,
      quizResults: []
    }));
  };

  render() {
    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrap}>
          <h1>Test</h1>
          {this.state.isFinished ? (
            <QuizResult
              results={this.state.quizResults}
              questionState={this.state.quiz}
              onResetProgress={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion]}
              onAnswerClick={this.onAnswerClickHandler}
              activeQuestion={this.state.activeQuestion + 1}
              questionsLength={this.state.quiz.length}
              answerRes={this.state.answerResult}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Quiz;

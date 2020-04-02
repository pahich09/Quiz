import React from "react";
import { Component } from "react";
import styles from "./style.module.css";
import ActiveQuiz from "../../components/ActiveQuiz";
import QuizResult from "../../components/QuizResult";
import {withRouter} from "react-router-dom";
import {axiosInstance} from "../../services/axiois/axios";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {

  state = {
    activeQuestion: 0,
    answerResult: null,
    isFinished: false,
    quizResults: [],
    quiz: [],
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
  async componentDidMount() {
    try {
    const {data} = await axiosInstance.get(`quizez/${this.props.match.params.id}.json`)
    this.setState({
      quiz: data
    })
    }
    catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrap}>
          <h1>Test</h1>
          {this.state.quiz && this.state.quiz.length
              ?
          this.state.isFinished ? (
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
          )
          :
          <Loader/>
          }
        </div>
      </div>
    );
  }
}
export default withRouter(Quiz);

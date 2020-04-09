import React from "react";
import {Component} from "react";
import styles from "./style.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import QuizResult from "../../components/QuizResult";
import {withRouter} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {compose} from "redux";
import {checkAnswerThunk, fetchQuizThunk, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {
    componentDidMount() {
        this.props.fetchQuiz(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {

        return (
            <div className={styles.Quiz}>
                <div className={styles.QuizWrap}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.props.quiz && this.props.quiz.length
                        ?
                        this.props.isFinished ? (
                            <QuizResult
                                results={this.props.quizResults}
                                questionState={this.props.quiz}
                                onResetProgress={this.props.retryQuiz}
                            />
                        ) : (
                            <ActiveQuiz
                                question={this.props.quiz[this.props.activeQuestion]}
                                onAnswerClick={this.props.checkAnswer}
                                activeQuestion={this.props.activeQuestion + 1}
                                questionsLength={this.props.quiz.length}
                                answerRes={this.props.answerResult}
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

const mapStateToProps = state => ({
    activeQuestion: state.quiz.activeQuestion,
    answerResult: state.quiz.answerResult,
    isFinished: state.quiz.isFinished,
    quizResults: state.quiz.quizResults,
    quiz: state.quiz.quiz,
})
const mapDispatchToProps = dispatch => ({
    fetchQuiz: id => dispatch(fetchQuizThunk(id)),
    checkAnswer: answerId => dispatch(checkAnswerThunk(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
})
export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Quiz)

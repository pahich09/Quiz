import React, {Component} from "react";
import styles from './QuizCreator.module.css'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/form";
import Select from "../../components/UI/Select/Select";
import {axiosInstance} from "../../services/axiois/axios";

function createOptionControl(number){
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number,
    }, {required: true})
}
function createFormControls(){
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым',
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}
//==============================================================
class QuizCreator extends Component{
    state= {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls(),
    }
    addQuestionHandler=()=>{
        const quiz = [...this.state.quiz];
        const index = quiz.length + 1;
        const {question, ...options} = this.state.formControls;
        quiz.push({
            question: question.value,
            questionId: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: Object.values(options).map((opt,i)=>{
                return({
                    text: opt.value,
                    id: opt.id
                })
            })
        })
        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls(),
        })
    }
    addQuizHandler =  async ()=>{
        try{
           await axiosInstance.post('quizez.json', this.state.quiz)
            this.setState({
                quiz: [],
            })
        }
        catch (e) {
            console.log(e.message)
        }

    }
    onSubmitHandler = e=>{
        e.preventDefault()
    }
    onChangeHandler = (value, controlName)=>{
        const  formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }
    selectChangeHandler = e=>{
       this.setState({
           rightAnswerId: +e.target.value
       })
    }
    renderControls =()=>{
        return Object.keys(this.state.formControls).map((controlName, i)=>{
            const control = this.state.formControls[controlName];
            return <React.Fragment key={controlName+i}>
            <Input
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                errorMessage={control.errorMessage}
                // shouldValidate={!!control.validation}
                onChange={e=>this.onChangeHandler(e.target.value, controlName)}
            />
                {i === 0 && <hr/>}
            </React.Fragment>
        })
    }
    render() {
        const  cls = [styles.QuizCreator];
        const select= <Select
        label='Выберите правильный ответ'
        value ={this.state.rightAnswerId}
        onChange = {this.selectChangeHandler}
        options={[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4},
        ]}
        />
        return <div className={cls.join(" ")}>
            <div>
                <h1>Создать тест</h1>
                <form
                    onSubmit={this.onSubmitHandler}
                    className={styles.QuizCreatorForm}
                >
                    {this.renderControls()}
                    {select}
                    <Button
                        type='primary'
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isFormValid}
                    >Добавить вопрос</Button>
                    <Button
                        type='success'
                        onClick={this.addQuizHandler}
                        disabled={this.state.quiz.length === 0}
                    >Создать тест</Button>
                </form>
            </div>
        </div>
    }
}
export default QuizCreator
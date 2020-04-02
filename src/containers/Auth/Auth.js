import React, {Component} from "react";
import styles from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js';
import Axios from "axios";

class Auth extends Component{
    state = {
        isFormValid: false,
        formControls: {
            email:{
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                }
            }
        }
    }
    validateControl=(value, validation)=>{
        if(!validation){
            return true
        }
        let isValid = true;
        if(validation.required){
            isValid =value.trim() !== '' && isValid
        }
        if(validation.email){
           isValid =  is.email(value) && isValid
        }
        if(validation.minLength){
            isValid = value.length >= 6 && isValid
        }
        return isValid;
    }
    submitHandler=(e)=>{
        e.preventDefault()
    }
    onChangeHandler=(e,controlName)=>{

        const  formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName]= control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name=>{
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({
            isFormValid,
            formControls
        })
    }
    loginHandler = ()=>{
    }
    registerHandler= async ()=>{
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
        const {data} = await Axios
            .post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKzXoaubP4VZW648rK9defxM9hMT7uxyY`, authData)
        }
        catch (e) {
            console.log(e)
        }
    }
    renderInputs =()=>{
        return Object.keys(this.state.formControls).map((controlName, i)=>{
            const control = this.state.formControls[controlName]
            return <Input
                key={controlName+i}
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                errorMessage={control.errorMessage}
                // shouldValidate={!!control.validation}
                onChange={e=>this.onChangeHandler(e, controlName)}
            />
        })
    }

render() {
    const cls = [styles.Auth];
    return <div className={cls.join(' ')}>
        <div>
            <h1>Авторизация</h1>
            <form className={styles.AuthForm} onSubmit={this.submitHandler}>
                {this.renderInputs()}
                <Button
                    onClick={this.loginHandler}
                    type='success'
                    disabled={!this.state.isFormValid}
                >Войти</Button>
                <Button
                    onClick={this.registerHandler}
                    type ='primary'
                    disabled={!this.state.isFormValid}
                >Регистрация</Button>
            </form>
        </div>
       </div>
}
}
export default Auth
import React from "react";
import styles from './Input.module.css'


const Input = props =>{

    const isInvalid =({valid, touched, shouldValidate})=>{
        return !valid && touched
            // && !shouldValidate
    }
    const inputType = props.type || 'text'
    const cls =[styles.Input];
    const htmlFor = `${props.type}_${Math.random()}`
    if(isInvalid(props)){
        cls.push(styles.invalid)
    }
    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                type={inputType}
                onChange={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
            />
            {isInvalid(props)
                ?
                <span>{props.errorMessage || 'Неверные данные'}</span>
                :null}

        </div>
    )
}
export default Input
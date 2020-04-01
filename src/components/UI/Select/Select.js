import React from 'react';
import styles from './Select.module.css'

const Select = props =>{
    const htmlFor = `${props.label}_${Math.random()}`
    return <div className={styles.Select}>
        <label htmlFor={htmlFor}>{props.label}</label>
        <select
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        >
            {props.options.map((option, i)=>{
                return <option
                    key={option.value+i}
                    value={option.value}
                >
                    {option.text}
                </option>
            })}
        </select>

    </div>
}

export default Select
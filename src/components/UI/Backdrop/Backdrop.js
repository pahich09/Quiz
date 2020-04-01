import React from "react";
import styles from './Backdrop.module.css'

const  Backdrop = (props)=>{
    return <div className={styles.Backdrop}
    onClick={props.onClick}
    />
}
export default Backdrop
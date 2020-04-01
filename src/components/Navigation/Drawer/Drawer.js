import React, {Component} from "react";
import styles from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const links =[
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false},
]
class Drawer extends Component{

render() {
    const  cls = [styles.Drawer];
    if(!this.props.isOpen){
        cls.push(styles.close)
    }
    return(
        <>
        <nav  className={cls.join(' ')}>
            <ul>
                {links.map(el=>{
                    return <li key={el.label}>
                        <NavLink
                            to={el.to}
                            onClick={this.props.onClose}
                        >{el.label}</NavLink>
                    </li>
                })}
            </ul>
        </nav>
            {this.props.isOpen?<Backdrop onClick={this.props.onClose}/>:null}
        </>
    )
}
}
export default Drawer
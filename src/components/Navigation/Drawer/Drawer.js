import React from "react";
import styles from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";


const Drawer = props => {
    const cls = [styles.Drawer];
    if (!props.isOpen) {
        cls.push(styles.close)
    }
    const links = [{to: '/', label: 'Список', exact: true}]
    if (props.isAuth) {
        links.push({to: '/quiz-creator', label: 'Создать тест', exact: false},
            {to: '/logout', label: 'Выйти', exact: false})
    } else {
        links.push({to: '/auth', label: 'Авторизация', exact: false})
    }
    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    {links.map(el => {
                        return <li key={el.label}>
                            <NavLink
                                to={el.to}
                                onClick={props.onClose}
                            >
                                {el.label}
                            </NavLink>
                        </li>
                    })}
                </ul>
            </nav>
            {props.isOpen ? <Backdrop onClick={props.onClose}/> : null}
        </>
    )
}

export default Drawer
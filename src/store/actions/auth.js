import Axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

const authSuccess = (token) => ({
    type: AUTH_SUCCESS,
    token
})
export const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}
const autoLogOut = time => dispatch => {
    setTimeout(() => dispatch(logOut()), time * 1000)
}

export const autoLogin = () => dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
        dispatch(logOut())
    } else {
        const expDate = new Date(localStorage.getItem('expirationDate'))
        if (expDate <= new Date()) {
            dispatch(logOut())
        } else {
            dispatch(authSuccess(token))
            dispatch(autoLogOut((expDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}
export const auth = (email, password, isLogin) => async (dispatch) => {
    const authData = {
        email,
        password,
        returnSecureToken: true
    }
    let loginUrl = isLogin ?
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKzXoaubP4VZW648rK9defxM9hMT7uxyY`
        :
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKzXoaubP4VZW648rK9defxM9hMT7uxyY`
    try {
        const {data} = await Axios
            .post(loginUrl, authData)
        const expDate = new Date(new Date().getTime() + data.expiresIn * 1000)
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expDate)
        dispatch(authSuccess(data.idToken))
        dispatch(autoLogOut(data.expiresIn))
    } catch (e) {
        console.log(e)
    }
}

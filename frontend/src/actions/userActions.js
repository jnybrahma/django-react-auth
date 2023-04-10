import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    DETAILS_USERS_REQUEST,
    DETAILS_USERS_SUCCESS,
    DETAILS_USERS_FAIL,
    DETAILS_USERS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    //USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

} from '../constants/userConstants';
const DB_HOST = "http://127.0.0.1:8000";

export const login = (email, password) => async(dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`${DB_HOST}/api/users/login/`, { 'email': email, 'password': password },
            config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message

        })
    }

}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LIST_RESET })

}

export const register = (email, password) => async(dispatch) => {

    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`${DB_HOST}/api/users/register/`, {  'email': email, 'password': password },
            config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message

        })
    }

}
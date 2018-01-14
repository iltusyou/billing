import axios from 'axios'
import jwtDecode from 'jwt-decode'
import config from '../config.js';

const SERVICE = config.service;
const USER_REGIST = 'USER_REGIST'
const USER_LOGIN = 'USER_LOGIN'
const USER_LOGOUT = 'USER_LOGOUT'

const initialState = {
    // token: null,
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
}

export default function userInfo(state, action) {
    if (!state) {
        const token = getToken()
        if (token) {
            return {
                user: getUserFromToken(token),
                isAuthenticated: true,
                isAuthenticating: false,
                statusText: 'login success'
            }
        }
        return initialState
    }

    switch (action.type) {

        case USER_LOGIN:

            return {
                // token: action.token,
                user: action.user,
                isAuthenticated: true,
                isAuthenticating: false,
                statusText: 'login success'
            }
        case USER_LOGOUT:
            return initialState;

        case USER_REGIST:
            return {
                user: null,
                isAuthenticated: false,
                isAuthenticating: false,
                statusText: action.message
            }

        default:
            return state;
    }
}

// action creators
export const regist = (user) => {
    return {
        type: USER_REGIST,
    };
}

export const login = (user) => {
    return {
        type: USER_LOGIN,
        user: user
    };
}

export const logout = () => {
    clearToken()
    return {
        type: USER_LOGOUT
    }
}

//api
//登入
export const apiLogin = (user) => {
    return (dispatch) => {
        return axios.post(SERVICE + '/login', {
            email: user.email,
            password: user.password
        }).then(res => {
            console.log(res)
            const data = res.data;
            if(data.result){
                const token = res.data.message;
                setToken(token);
                const loginUser = getUserFromToken(token);
                dispatch(login(loginUser));
            }
            else{
                console.log(data.message);
            }
        }).catch(err => {
                console.log(err)
            });
    };
}

//token 相關處理
const TOKEN_KEY = 'token'
const getToken = () => {    
    return localStorage.getItem(TOKEN_KEY)
}

const setToken = (token) => {
    if(token)
        localStorage.setItem(TOKEN_KEY, token);
}

const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

const getUserFromToken = (token) => {
    const decode = jwtDecode(token)        
    return {
        _id: decode.user._id,
        email: decode.user.email,
        exp:getTokenExp(decode.exp)
    }
}

//取得token過期時間
const getTokenExp = (exp) => {    
    return new Date(exp * 1000)
}
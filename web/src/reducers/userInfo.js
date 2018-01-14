import axios from 'axios'
import config from '../config.js';
import * as tokenHelper from '../helper/tokenHelper.js'

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
        const token = tokenHelper.getToken()
        if (token) {
            return {
                user: tokenHelper.getUserFromToken(token),
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
    tokenHelper.clearToken()
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
                tokenHelper.setToken(token);
                const loginUser = tokenHelper.getUserFromToken(token);
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


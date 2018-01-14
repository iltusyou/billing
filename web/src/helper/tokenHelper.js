//token 相關處理
import jwtDecode from 'jwt-decode'

const TOKEN_KEY = 'token'
export const getToken = () => {    
    return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token) => {
    if(token)
        localStorage.setItem(TOKEN_KEY, token);
}

export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const getUserFromToken = (token) => {
    const decode = jwtDecode(token)        
    return {
        _id: decode.user._id,
        email: decode.user.email,
        exp:getTokenExp(decode.exp)
    }
}

export const reqWithToken = (req) =>{
    req.token = getToken();
    return req;
}

//取得token過期時間
const getTokenExp = (exp) => {    
    return new Date(exp * 1000)
}
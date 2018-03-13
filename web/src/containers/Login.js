import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import * as userInfoReducer from '../reducers/userInfo.js';

const buttonStyle = {
    margin: '15px'
};

class Login extends Component {
    constructor() {
        super()
        this.state = {
            //初始值
            email: '',
            password: '',

            //初始錯誤訊息
            emailErrorMsg: '請輸入email',
            passwordErrorMsg: '請輸入密碼',
            emailValidate: false,
            passwordValidate: false
        }
    }

    //email
    checkEmail(e) {
        const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var value = e.target.value;
        let emailErrorMsg = ''
        let emailValidate = false

        if (value.length === 0) {
            emailErrorMsg = '請輸入email'
        }
        else if (!emailFormat.test(value)) {
            emailErrorMsg = 'E-mail格式錯誤'
        }
        else {
            emailValidate = true
        }
        this.setState({
            email: value,
            emailValidate: emailValidate,
            emailErrorMsg: emailErrorMsg
        })
    }

    //password
    checkPassword(e){
        let passwordErrorMsg = ''
        let passwordValidate = false;
        var value = e.target.value;

        if (value.length == 0) {
            passwordErrorMsg = '請輸入密碼';
        }
        else {
            passwordValidate = true;
        }

        this.setState({
            password: value,
            passwordValidate: passwordValidate,
            passwordErrorMsg: passwordErrorMsg
        });
    }

    login = () =>{
        var validate = this.state.emailValidate && this.state.passwordValidate;
        if (!validate) return;

        const user = {
            email:this.state.email,
            password:this.state.password
        }
        if(this.props.apiLogin){
            this.props.apiLogin(user);
        }
    };

    render() {
        return (
            <div className="center-div">
                <TextField
                    hintText="E-mail"
                    floatingLabelText="E-mail"
                    onChange={(e) => this.checkEmail(e)}
                    errorText={this.state.emailErrorMsg}
                    fullWidth={true}
                /><br />
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    onChange={(e) => this.checkPassword(e)}
                    errorText={this.state.passwordErrorMsg}
                    fullWidth={true}
                /><br />

                <div>
                    <RaisedButton label="確認" primary={true}
                        style={buttonStyle}
                        onClick={this.login}
                    />
                    <RaisedButton label="註冊" primary={true}
                    />
                </div>

                {/* 有登入情況下的轉導頁 */}
                {this.props.userInfo.isAuthenticated ? <Redirect to='/' /> : null}
            </div>
        );
    }
}

const mapStateToProp = (state) => ({
    userInfo: state.userInfo,
})
const mapDispatchToProps = (dispatch) => {
    return {
        apiLogin: (user) => {
            dispatch(userInfoReducer.apiLogin(user))
        }
    }
}
Login = connect(mapStateToProp, mapDispatchToProps)(Login);
export default Login;
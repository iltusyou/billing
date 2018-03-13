import React from 'react';
import { RouterRoute, RouterLink } from 'reactjs-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';

import BillList from './BillList.js';
import Login from './Login.js';
import Test from './Test.js';
import '../App.css';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import { connect } from 'react-redux';
import * as userInfoReducer from '../reducers/userInfo.js';

class Root extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false
        };
    }

    logout = () => {
        if (this.props.logout)
            this.props.logout()
        this.handleClose()
    }

    handleToggle = () => {        
        this.setState({ open: !this.state.open });
    };

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const user = this.props.userInfo.user;
        const showLoginLogout = () => (
            !this.props.userInfo.isAuthenticated ?
                <MenuItem onClick={this.handleClose} containerElement={<Link to="/login" />}>登入</MenuItem> :
                <MenuItem onClick={this.logout}>登出</MenuItem>
        );

        return (
            <div>
                <Router>
                    <div>
                        {/* Header */}
                        <AppBar
                            title={user ? '現在登入：' + user.email : '記帳'}
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onLeftIconButtonClick={this.handleToggle}
                        />

                        {/* 選單 */}
                        <Drawer open={this.state.open} docked={false}
                            onRequestChange={(open) => this.setState({ open })}>
                            <MenuItem onClick={this.handleClose}>關閉選單</MenuItem>
                            <MenuItem onClick={this.handleClose} containerElement={<Link to='' />}>首頁</MenuItem>
                            <MenuItem onClick={this.handleClose} containerElement={<Link to="/test" />}>分頁測試</MenuItem>
                            {showLoginLogout()}
                        </Drawer>

                        {/* 內容 */}
                        <div>
                            <Route exact path="/" component={BillList} />
                            <Route path="/test" component={Test} />
                            <Route path="/login" component={Login} />
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}
const mapStateToProp = (state) => ({
    userInfo: state.userInfo,
})
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(userInfoReducer.logout())
        }
    }
}
Root = connect(mapStateToProp, mapDispatchToProps)(Root);
export default Root;
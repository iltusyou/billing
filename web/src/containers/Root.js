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
import Header from './Header.js';
import '../App.css';

import { connect } from 'react-redux';
import * as userInfoReducer from '../reducers/userInfo.js';

class Root extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open })
        console.log(this.state.open)
    };

    render() {
        const user = this.props.userInfo.user;

        return (
            <div>
                {/* Header */}
                <AppBar
                    title={user ? user.email : '記帳'}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={this.handleToggle}
                />
                {/* 選單 */}
                <Drawer open={this.state.open}>
                    <MenuItem onClick={this.handleToggle}>關閉選單</MenuItem>
                    <MenuItem>
                        <RouterLink className="router-link" title="首頁" href="/" resetScrollPos>首頁</RouterLink>
                    </MenuItem>
                    <MenuItem>
                        <RouterLink className="router-link" title="分頁測試" href="/test" resetScrollPos>分頁測試</RouterLink>
                    </MenuItem>
                </Drawer>

                {/* 內容 */}
                <div>
                    <RouterRoute url="/" title="首頁">
                        <BillList />
                    </RouterRoute>
                    <RouterRoute url="/login" title="登入">
                        <Login />
                    </RouterRoute>
                    <RouterRoute url="/test" title="此頁用來測試分頁功能">
                        <Test />
                    </RouterRoute>
                </div>
            </div>
        );
    }
}
const mapStateToProp = (state) => ({
    userInfo: state.userInfo,
})
const mapDispatchToProps = (dispatch) => {
    return {}
}
Root = connect(mapStateToProp, mapDispatchToProps)(Root);
export default Root;
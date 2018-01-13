import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Category from '../component/Category.js';
import DatePicker from 'material-ui/DatePicker';

import { connect } from 'react-redux';
import * as billReducer from '../reducers/bill.js';

import * as datetimeHelper from '../helper/datetimeHelper.js'

export const formStatus = {
    new: 1,
    edit: 2
}

class Editor extends Component {
    static defaultProps = {
        data: {
            _id: null,
            date: datetimeHelper.getToday(),
            name: '',
            amount: '',
            category: 1,
            memo: ''
        }
    }

    constructor(props) {
        const data = props.data

        super()
        this.state = {
            open: false,
            _id: data._id,
            date: new Date(data.date),
            name: data.name,
            amount: data.amount,
            category: data.category,
            memo: data.memo
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleConfirm = () => {
        const state = this.state;
        const owner = this.props.userInfo.user._id;

        const bill = {
            _id: state._id,
            owner: owner,
            date: state.date,
            name: state.name,
            amount: state.amount,
            category: state.category,
            memo: state.memo
        };

        if (this.state._id)
            this.update(bill)
        else
            this.insert(bill)

        this.handleClose();
    }

    insert = (bill) => {
        console.log(bill)
        if (this.props.apiInsertBill)
            this.props.apiInsertBill(bill)
    }

    update = (bill) => {
        if (this.props.apiUpdateBill)
            this.props.apiUpdateBill(bill)
    }

    //date
    handleDate = (e, date) => {
        this.setState({ date: date });
    }

    //name
    handleName = (e) => {
        const value = e.target.value;
        this.setState({ name: value });
    }

    //amount
    handleAmount = (e) => {
        const value = e.target.value;
        this.setState({ amount: value });
    }

    //category
    handleCategory = (event, index, value) => {
        this.setState({ category: value })
        console.log(event)
    }

    //memo
    handleMemo = (e) => {
        const value = e.target.value;
        this.setState({ memo: value });
    }

    render() {

        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="儲存"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleConfirm}
            />,
        ];

        return (
            <div style={this.props.style}>
                <RaisedButton label={this.props.label} primary={true}
                    onClick={this.handleOpen} />
                <Dialog
                    title={this.props.label}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <DatePicker autoOk={true} floatingLabelText="帳目日期"
                        value={this.state.date}
                        onChange={this.handleDate}
                    />
                    <br />
                    <TextField hintText="帳目名稱" floatingLabelText="帳目名稱"
                        value={this.state.name}
                        onChange={this.handleName} />
                    <br />
                    <TextField hintText="帳目金額" floatingLabelText="帳目金額"
                        value={this.state.amount}
                        onChange={this.handleAmount} />
                    <br />
                    <TextField hintText="備註" floatingLabelText="備註"
                        value={this.state.memo}
                        onChange={this.handleMemo} />
                    <br />
                    <Category value={this.state.category}
                        handleCategory={this.handleCategory} />
                </Dialog>
            </div>
        );
    }
}

const mapStateToProp = (state) => ({
    userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch) => {
    return {
        apiUpdateBill: (bill) => {
            dispatch(billReducer.apiUpdateBill(bill))
        },
        apiInsertBill: (bill) => {
            dispatch(billReducer.apiInsertBill(bill))
        }
    }
}
Editor = connect(mapStateToProp, mapDispatchToProps)(Editor);
export default Editor;
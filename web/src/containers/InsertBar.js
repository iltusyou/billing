import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { connect } from 'react-redux';
import * as billReducer from '../reducers/bill.js';
import config from '../config.js';
import * as datetimeHelper from '../helper/datetimeHelper.js'
import Category from '../component/Category.js';


const items = [
    <MenuItem key={1} value={1} primaryText="Never" />,
    <MenuItem key={2} value={2} primaryText="Every Night" />,
    <MenuItem key={3} value={3} primaryText="Weeknights" />,
    <MenuItem key={4} value={4} primaryText="Weekends" />,
    <MenuItem key={5} value={5} primaryText="Weekly" />,
];

const today = datetimeHelper.getToday()

class InsertBar extends Component {    
    constructor() {        
        super()        

        this.state = {
            //初始值
            date: today,
            name: '',
            amount: '',
            category: 1,
            memo: '',

            //初始錯誤訊息
            dateErrorMsg: '',
            nameErrorMsg: '',
            amountErrorMsg: '',
            categoryErrorMsg: '',
        }        

        this.handleCategory = this.handleCategory.bind(this); 
        this.handleDate = this.handleDate.bind(this);


        console.log(this.state)
    }    

    handleDate(event, date) {        
        this.setState({
            date: date
        });
        console.log(this.state)
        console.log(date)
    }

    //
    handleCategory(value) {
        console.log('value')
        this.setState({
            category: value
        });
    }

    //name
    handleName(e) {
        const value = e.target.value;
        this.setState({
            name: value
        });
    }

    //amount
    handleAmout(e) {
        const value = e.target.value;
        var errorMsg = '';

        if (value.length === 0)
            errorMsg = '必填欄位';
        else if (!Number(value) || value[0] == 0)
            errorMsg = '價格欄位需為數字格式'
        else if (value.length > 10)
            errorMsg = '價格不得大於10位數'
        else
            errorMsg = '';

        this.setState({
            amount: value,
            amountErrorMsg: errorMsg
        });
    }

    //memo
    handleMemo(e) {
        const value = e.target.value;
        this.setState({ memo: value });
    }

    insertBill = () => {
        const owner = this.props.userInfo.user._id;
        const state = this.state;
        const bill = {
            owner: this.props.userInfo.user._id,
            category: state.category,
            date: state.date,
            name: state.name,
            amount: state.amount,
            memo: state.memo
        }
        console.log(bill);

        if (this.props.apiInsertBill) {
            this.props.apiInsertBill(bill);
            this.setDefault();
        }
    };

    setDefault = () => {
        this.setState({
            date: today,
            name: '',
            amount: '',
            category: 1,
            memo: '',
        });
    };

    render() {
        return (
            <div>
                <h3>新增帳目</h3>
                <hr />
                <Toolbar>
                    <ToolbarGroup firstChild={false}>
                        <DatePicker
                            name="search-date-start" hintText="帳目日期"
                            value={this.state.date}
                            onChange={this.handleDate} />
                        <TextField
                            name="search-name" hintText="帳目名稱"
                            value={this.state.name}
                            onChange={(e) => this.handleName(e)} />
                        <TextField name="search-name" hintText="金額"
                            value={this.state.amount}
                            errorText={this.state.amountErrorMsg}
                            onChange={(e) => { this.handleAmout(e) }} />
                        {/* <SelectField hintText="類別"
                            value={this.state.category}
                            onChange={this.handleCategory}
                        >
                            {items}
                        </SelectField> */}
                        <Category 
                            category={this.state.category}
                            handleCategory={this.handleCategory}/>
                        <TextField
                            name="search-name" hintText="備註"
                            onChange={(e) => { this.handleMemo(e) }} />
                        <RaisedButton label="新增" primary={true}
                            onClick={this.insertBill} />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

const mapStateToProp = (state) => ({
    billList: state.bill,
    userInfo: state.userInfo
})
const mapDispatchToProps = (dispatch) => {
    return {
        apiInsertBill: (bill) => {
            dispatch(billReducer.apiInsertBill(bill))
        }
    }
}
InsertBar = connect(mapStateToProp, mapDispatchToProps)(InsertBar);
export default InsertBar;
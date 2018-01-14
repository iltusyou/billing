import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Category from '../component/Category.js';
import * as datetimeHelper from '../helper/datetimeHelper.js'
import { connect } from 'react-redux';
import * as billReducer from '../reducers/bill.js';

const items = [
    <MenuItem key={1} value={1} primaryText="Never" />,
    <MenuItem key={2} value={2} primaryText="Every Night" />,
    <MenuItem key={3} value={3} primaryText="Weeknights" />,
    <MenuItem key={4} value={4} primaryText="Weekends" />,
    <MenuItem key={5} value={5} primaryText="Weekly" />,
];

const defaultValue = {
    dateStart: null,
    dateEnd: null,
    name: '',
    category: ''
}

class SearchBar extends Component {


    constructor() {
        super()
        this.state = defaultValue
    }

    //date
    handleDateStart = (e, date) => {
        this.setState({ dateStart: date });
    }

    handleDateEnd = (e, date) => {
        this.setState({ dateEnd: date });
    }

    //name
    handleName = (e) => {
        const value = e.target.value;
        this.setState({ name: value });
    }

    //category
    handleCategory = (event, index, value) => {
        this.setState({ category: value })
    }

    handleSearch = () => {
        const state = this.state
        const owner = this.props.userInfo.user._id;

        const searchData = {
            owner: owner,
            dateStart: state.dateStart,
            dateEnd: state.dateEnd,
            name: state.name,
            category: state.category
        }

        if(this.props.apiGetBillList)
            this.props.apiGetBillList(searchData)
    }

    handleClear = () => {
        this.setState(defaultValue);
    }

    render() {
        const state = this.state;

        return (
            <div>
                <h3>搜尋</h3>
                <hr />
                <Toolbar>
                    <ToolbarGroup firstChild={false}>
                        <DatePicker name="search-date-start" hintText="搜尋日期起始" autoOk={true} value={state.dateStart}
                            onChange={this.handleDateStart} />
                        <DatePicker name="search-date-end" hintText="搜尋日期結束" autoOk={true} value={state.dateEnd}
                            onChange={this.handleDateEnd} />
                        <TextField name="search-name" hintText="帳目名稱" value={state.name}
                            onChange={this.handleName} />
                        <Category value={this.state.category}
                            handleCategory={this.handleCategory} />
                        <RaisedButton label="搜尋" primary={true}
                            onClick={this.handleSearch} />
                        <RaisedButton label="清除搜尋條件" secondary={true}
                            onClick={this.handleClear} />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

const mapStateToProp = (state) => ({
    userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch) => {
    return {
        apiGetBillList: (bill) => {
            dispatch(billReducer.apiGetBillList(bill))
        }
    }
}
SearchBar = connect(mapStateToProp, mapDispatchToProps)(SearchBar);
export default SearchBar;
import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import * as datetimeHelper from '../helper/datetimeHelper.js'

// 自行製作的datepicker
// 值皆為utc格式，但顯示時為local格式

class Category extends Component {

    static defaultProps = {
        date: datetimeHelper.getToday(),
        hintText:"日期"
    }

    constructor() {
        super()
        this.state = {
            date: datetimeHelper.getToday()
        }
        this.handleDate = this.handleDate.bind(this)
    }

    handleDate(event, date) {    
        console.log(date)
        if(this.props.handleDate)
            this.props.handleDate(date)
    }

    render() {
        return (
            <DatePicker
                name="search-date-start" hintText={this.props.hintText} autoOk={true}
                value={this.props.date}
                onChange={this.handleDate} />
        );
    }
}
export default Category;
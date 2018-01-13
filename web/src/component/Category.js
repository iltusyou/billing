import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import config from '../config.js';

const items = [
    <MenuItem key={1} value={1} primaryText="固定支出" />,
    <MenuItem key={2} value={2} primaryText="額外支出" />,
];

class Category extends Component {

    constructor(){
        super()
        this.state={
            category:1
        }
        this.handleCategory = this.handleCategory.bind(this)
    }

    handleCategory(event, index, value) {
        console.log('handleCategory')
        if(this.props.handleCategory)
            this.props.handleCategory(value);
    }

    render() {
        return (
            <SelectField hintText="類別"
                value={this.props.category}              
                onChange={this.handleCategory}
            >
                {items}
            </SelectField>
        );
    }
}
export default Category;
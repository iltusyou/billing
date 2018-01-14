import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [
    <MenuItem key={0} value={0} primaryText="" />,
    <MenuItem key={1} value={1} primaryText="固定支出" />,
    <MenuItem key={2} value={2} primaryText="額外支出" />,
];

class Category extends Component {
    static defaultProps = {
        category:1
    }
    constructor(){
        super()     
    }

    handleCategory = (event, index, value) => {                
        if(this.props.handleCategory)
            this.props.handleCategory(event, index, value);
    }

    render() {
        return (
            <SelectField hintText="類別"
                value={this.props.value}              
                onChange={this.handleCategory}
            >
                {items}
            </SelectField>
        );
    }
}
export default Category;
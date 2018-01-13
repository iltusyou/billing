import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [
    <MenuItem key={1} value={1} primaryText="Never" />,
    <MenuItem key={2} value={2} primaryText="Every Night" />,
    <MenuItem key={3} value={3} primaryText="Weeknights" />,
    <MenuItem key={4} value={4} primaryText="Weekends" />,
    <MenuItem key={5} value={5} primaryText="Weekly" />,
];

class SearchBar extends Component {
    render() {
        return (
            <div>
                <h3>搜尋</h3>
                <hr />
                <Toolbar>
                    <ToolbarGroup firstChild={false}>
                        <DatePicker name="search-date-start" hintText="搜尋日期起始" autoOk={true} />
                        <DatePicker name="search-date-end" hintText="搜尋日期結束" autoOk={true} />
                        <TextField name="search-name" hintText="帳目名稱" />
                        <SelectField hintText="類別">
                            {items}
                        </SelectField>
                        <RaisedButton label="搜尋" primary={true} />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}
export default SearchBar;
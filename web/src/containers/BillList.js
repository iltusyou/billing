import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as billReducer from '../reducers/bill.js';
import SearchBar from './SearchBar.js';
import Editor from './Editor.js';
import Auth from './Auth.js'
import config from '../config.js';

const style = {
    margin: 12,
    float:'left'
  };
  
class BillList extends Component {
    static defaultProps = {
        userInfo: {
            user:{_id:''}
        }
    }

    constructor(){
        super()
    }


    componentWillMount() {
        console.log(this.props)
        if(this.props.userInfo.user){
            
            const bill = {
                owner: this.props.userInfo.user._id
            }     
    
            if (this.props.apiGetBillList) {
                this.props.apiGetBillList(bill)
            }
        }        
    }

        

    dateFormat = (date) =>{
        var d = new Date(date);
        return d.toLocaleDateString();
    }

    handleDelete = (_id) => {
        const owner = this.props.userInfo.user._id
        const bill = {
            _id: _id,
            owner: owner
        }
        if (this.props.apiDeleteBill) {
            this.props.apiDeleteBill(bill)
        }
    }

    render() {
        return (
            <div>
                <Auth/>

                {/* Search */}
                <div className="billList-area">
                    <SearchBar />
                </div>                

                <div className="billList-area">
                    <h3>帳目清單</h3>
                    <hr />
                    <Editor label="新增"/>
                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}> 
                            <TableRow>
                                <TableHeaderColumn>日期</TableHeaderColumn>
                                <TableHeaderColumn>名目</TableHeaderColumn>
                                <TableHeaderColumn>金額</TableHeaderColumn>
                                <TableHeaderColumn>類別</TableHeaderColumn>
                                <TableHeaderColumn>備註</TableHeaderColumn>
                                <TableHeaderColumn>編輯</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.props.billList.map((row, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>{this.dateFormat(row.date)}</TableRowColumn>
                                    <TableRowColumn>{row.name}</TableRowColumn>                                
                                    <TableRowColumn>{row.amount}</TableRowColumn>
                                    <TableRowColumn>{config.category[row.category]}</TableRowColumn>
                                    <TableRowColumn>{row.memo}</TableRowColumn>

                                    {/* 編輯 */}
                                    <TableRowColumn style={{width:'20%'}}>
                                        <Editor style={style} label="編輯" data={row} className={row._id}/>
                                        <RaisedButton label="刪除" secondary={true} style={style} 
                                            onClick={() => this.handleDelete(row._id)}/>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
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
        apiGetBillList: (bill) => {
            dispatch(billReducer.apiGetBillList(bill))
        },
        apiUpdateBill:(bill) =>{
            dispatch(billReducer.apiUpdateBill(bill))
        },
        apiDeleteBill:(bill) =>{
            dispatch(billReducer.apiDeleteBill(bill))
        },
        apiInsertBill: (bill) => {
            dispatch(billReducer.apiInsertBill(bill))
        }
    }
}

BillList = connect(mapStateToProp, mapDispatchToProps)(BillList);

export default BillList;
import { combineReducers } from 'redux';
import bill from './bill.js';
import userInfo from './userInfo.js'

export default combineReducers({
    bill,userInfo
  })
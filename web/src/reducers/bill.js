import axios from 'axios';
import config from '../config.js';

const SERVICE = config.service;

// action types
const BILL_GETLISt = 'BILL_GETLISt'
const Bill_INSERT = 'Bill_INSERT';
const BILL_DELETE = 'BILL_DELETE'
const BILL_UPDATE = 'BILL_UPDATE'

// reducer
export default function bill(state = [], action) {

    switch (action.type) {
        case BILL_GETLISt:
            return action.data;

        case Bill_INSERT:
            return [action.data, ...state];

        case BILL_UPDATE:
            return [...state].map((i) => {
                if (i._id === action.data._id) {
                    return Object.assign(i, action.data)
                } 
                else {
                    return i
                }
            });

        case BILL_DELETE:
            let newBillList = []
            state.forEach(function (i) {
                if (i._id != action.data)
                    newBillList.push(i)
            })
            return newBillList

        default:
            return state
    }
}

// action creators
export const getBillList = (billList) => {
    return {
        type: BILL_GETLISt,
        data: billList
    }
}
export const insertBill = (bill) => {
    return {
        type: Bill_INSERT,
        data: bill
    }
}
export const updateBill = (bill) => {
    return {
        type: BILL_UPDATE,
        data: bill
    }
}
export const deleteBill = (_id) => {
    return {
        type: BILL_DELETE,
        data: _id
    }
}

//api
export const apiInsertBill = (bill) => {
    return (dispatch) => {
        return axios.post(SERVICE + '/billInsert', bill)
            .then(res => {
                const newBill = res.data.message;
                dispatch(insertBill(newBill));
            });
    }
}

export const apiUpdateBill = (bill) => {
    return (dispatch) => {
        return axios.post(SERVICE + '/billUpdate', bill)
            .then(res => {
                const newBill = res.data.message;
                dispatch(updateBill(newBill));
            }).catch(err => {
                console.log(err)
            });

    }
}

export const apiGetBillList = (bill) => {
    return (dispatch) => {
        return axios.post(SERVICE + '/getBillList', bill)
            .then(res => {
                const data = res.data;
                dispatch(getBillList(data))

            });
    }
}

export const apiDeleteBill = (bill) => {
    return (dispatch) => {
        return axios.post(SERVICE + '/billDelete', bill)
            .then(res => {
                console.log(res)
                // const data = res.data;
                dispatch(deleteBill(res.data.message))

            });
    }
}

// export const apiBillGetList = () => {
//     return (dispatch) => {
//         return axios.post('http://localhost:8080/goodsInsert', {
//             owner: goods.owner,
//             title: goods.title,
//             description: goods.description,
//             price: goods.price,
//             amount: goods.amount,
//             status: goods.status
//         }).then(res => {
//             const data = res.data
//             if (data.result) {
//                 const newGoods = Object.assign({ _id: data.message }, goods)
//                 dispatch(goodsInsert(newGoods))
//             }
//             else {
//                 console.log(data.message)                    
//             }
//         }).catch(err => {
//             console.log(err)
//         });
//     };
// }
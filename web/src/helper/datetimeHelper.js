//local時區
export const getToday = () => {
    var today = new Date();
    var year = today.getFullYear()
    var month = today.getMonth()
    var day = today.getDate()    
    // var monthDigit = today.getMonth() + 1;
    // if (monthDigit <= 9) {
    //     monthDigit = '0' + monthDigit;
    // }
    // var todayString = today.getFullYear() + "-" + monthDigit + "-" + today.getDate();

    return new Date(year, month, day, 0, 0, 0, 0);   
}

//service的時間格式 date:Date
export const getDateServiceFormat=(date)=>{        
    return date.toUTCString();
}

// export const getDateClientFormat = (date)=>{
//     var d = new Date(date);
    
//     local = date.toLocaleString;

// }

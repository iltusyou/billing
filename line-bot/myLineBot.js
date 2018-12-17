var extend = require('extend');

var DB = require('./DB');
var command = require('./enum').Command;
var billingType = require('./enum').BillingType;
var expensesType = require('./enum').ExpensesType;


/**
 * 從訊息取得回復內容
 * @param {*} lineUserId 
 * @param {*} message 
 */
var getReply = function (lineUserId, message) {

    switch (message) {
        case command.Help:
            return getHelpMenu();
        case command.Statistics:
            return getStatisticsMenu();
        case command.Today:
            return getStatistics(lineUserId, command.Today);
        case command.ThisMonth:
            return getStatistics(lineUserId, command.ThisMonth);
        case command.ThisYear:
            return getStatistics(lineUserId, command.ThisYear);
        default:
            return handleOtherMessage(lineUserId, message);
    }
}
exports.getReply = getReply;

/**
 * 回傳操作選單
 */
var getHelpMenu = function () {
    return new Promise(function (resolve, reject) {
        const msg = '操作說明：\n\
        支出:\n\
        輸入${數字} 新增帳目，然後\n\
        輸入e{1-9}修改最後一筆帳目的類別(若未輸入則視為未分類)\n\
        收入(未實作)';
        resolve(msg);
    });
}

/**
 * 統計選單
 */
var getStatisticsMenu = function () {
    var result = {
        type: 'template',
        altText: '統計選項',
        template: {
            type: 'buttons',
            thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
            title: 'Menu',
            text: 'Please select',
            actions: [{
                type: 'message',
                label: command.Today,
                text: command.Today
            }, {
                type: 'message',
                label: command.ThisMonth,
                text: command.ThisMonth
            }, {
                type: 'message',
                label: command.ThisYear,
                text: command.ThisYear
            }]
        }
    };

    return new Promise(function (resolve, reject) {
        resolve(result);
    });
}

var getStatistics = function (lineUserId, cmd) {
    var param = {};

    if (cmd == command.Today) {
        var start = new Date();
        var end = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        param = {
            'lineUserId': lineUserId,
            "updateTime": { "$gte": start, "$lt": end }
        };
    }
    else if (cmd == command.thisMonth) {
        // param = {
        //     'lineUserId': lineUserId,
        //     "updateTime": { "$gte": start, "$lt": end }
        // };
    }
    else {

    }

    return new Promise(function (resolve, reject) {
        DB.Billing.find(param, function (err, billings) {
            if (err) {
                console.log(err);
                reject('error');
            }
            else {
                var msg = cmd + '\n';
                var total = 0;
                for (var propertyName in expensesType) {
                    var expensesTypeValue = expensesType[propertyName];

                    var billingList = billings.filter(
                        billing =>
                            billing.billingType.incomeOrExpenses == billingType.Expenses
                            && billing.billingType.value == expensesTypeValue
                    );
                    if (billingList.length > 0) {
                        let amounts = billingList.map(a => a.amount);
                        var sum = amounts.reduce(getSum);
                        total += sum;
                        msg += expensesType.properties[expensesTypeValue].name + ':';
                        msg += sum + '\n';
                    }
                }
                msg += '總計' + total;
                resolve(msg);
            }
        });
    });
}

var thisMonth = function () {
    return new Promise(function (resolve, reject) {
        resolve('thisMonth');
    });
}

var thisYear = function () {
    return new Promise(function (resolve, reject) {
        resolve('thisYear');
    });
}

/**
 * 寫入[支出]到資料庫
 * @param {*} lineUserId 
 * @param {*} amount 
 * @param {*} memo 
 */
var expenses = function (lineUserId, amount, memo) {
    console.log('expenses:', lineUserId, amount, memo);
    //成功時的回傳訊息
    var msg = '選擇帳目類別；e{1-9}';

    for (var propertyName in expensesType) {
        if (propertyName == 'properties') {
            continue;
        }

        var expensesTypeValue = expensesType[propertyName];
        if (expensesTypeValue % 3 == 1) {
            msg += '\n';
        }
        msg += expensesTypeValue + ': ' + expensesType.properties[expensesTypeValue].name + ' ';
    }


    var billing = new DB.Billing({
        lineUserId: lineUserId,
        amount: amount,
        billingType: {
            incomeOrExpenses: billingType.Expenses,
            value: expensesType.Unclassified
        },
        memo: memo
    });
    return new Promise(function (resolve, reject) {
        billing.save(function (err, success) {
            if (err) {
                console.log('expenses error:', err);
                reject('error');
            }
            else {
                resolve(msg);
            }
        });
    });
}

/**
 * 修改最後一筆支出的類別
 * @param {*} lineUserId 
 * @param {*} type 
 */
var modifyExpensesType = function (lineUserId, type) {
    console.log('modifyExpensesType');
    return new Promise(function (resolve, reject) {
        var param = {
            'lineUserId': lineUserId,
            'billingType.incomeOrExpenses': billingType.Expenses
        };
        var option = {
            sort: { 'updateTime': -1 }
        }
        DB.Billing.findOne(param, {}, option, function (err, billing) {

            if (err) {
                console.log(err);
                reject('error');
            }
            else {
                console.log('billing:',billing);
                var newData = extend(true, {}, billing);
                newData.billingType.value = type;

                billing.set(newData);

                billing.save(function (error, success) {
                    if (error) {
                        console.log(error);
                        reject('error');
                    }
                    else {
                        resolve('modify type success');
                    }
                });
            }
        });
    });
}

/**
 * 其他訊息的處理方式
 * @param {*} lineUserId 
 * @param {*} message 
 */
var handleOtherMessage = function (lineUserId, message) {

    //支出
    var expensesRe = /^\$\d+|^\$\d+\s\w+/;
    if (expensesRe.test(message)) {
        message = message.replace('$', '');
        var amount = message.split(' ')[0];
        var memo = message.split(' ')[1];
        return expenses(lineUserId, amount, memo);
    }

    //修改支出類別
    var expensesTypeRe = /^e[1-9]/;
    if (expensesTypeRe.test(message)) {
        var type = message.replace('e', '');
        return modifyExpensesType(lineUserId, type);
    }

    //TODO:收入
    //TODO:收入類別

    //無法辨識的訊息
    return new Promise(function (resolve, reject) {
        resolve('unknow');
    })
}

function getSum(total, num) {
    return total + num;
}
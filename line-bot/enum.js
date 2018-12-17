/**
 * 帳目類型
 */
exports.BillingType = {
    Income: 1,
    Expenses: 2,
    properties: {
        1: { name: "收入" },
        2: { name: "支出" }
    }
};

/**
 * 收入
 */
exports.IncomeType = {

};

/**
 * 支出
 */
exports.ExpensesType = {
    Food: 1,
    Daily: 2,
    Traffic: 3,
    Investment: 4,
    Entertainment: 5,
    Studying: 6,
    Medical: 7,
    Other: 8,
    Unclassified: 9,
    properties: {
        1: { name: "飲食" },
        2: { name: "日常" },
        3: { name: "住行" },
        4: { name: "投資" },
        5: { name: "娛樂" },
        6: { name: "教育" },
        7: { name: "醫療" },
        8: { name: "其他" },
        9: { name: "未分類" }
    }
};

/**
 * 指令
 */
exports.Command = {
    Help: 'Help',
    Today: '今日',
    ThisMonth: '今月(未實作)',
    ThisYear: '今年(未實作)',
    Statistics: '統計'
};

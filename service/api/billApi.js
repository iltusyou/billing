var DB = require('../DB')
var errorCode = require('../errorCode')

var api = function (app) {

    //查詢    
    app.post('/getBillList', function (req, res) {
        const data = req.body;
        console.log('getBillList start, the request is:', data)

        var searchData = {
            owner: data.owner
        }

        if (data.name)
            searchData.name = { "$regex": data.name, "$options": "i" }

        if (data.category)
            searchData.category = data.category;

        if (data.dateStart || data.dateEnd) {
            var dateRange = {};
            if (data.dateStart)
                dateRange.$gte = data.dateStart
            if (data.dateEnd)
                dateRange.$lte = data.dateEnd
            searchData.date = dateRange
        }

        console.log('searchData: ', searchData)

        DB.Bill.find(searchData).sort({date: 'desc'}).exec(function (err, success) {
            if (err) {
                console.log('errorMsg: ', err)
                res.json({
                    result: false,
                    message: '2000'
                });
            }
            else {                
                console.log(success);
                res.json({
                    result: true,
                    message: success
                });
            }
        });
    });

    //新增
    app.post('/billInsert', function (req, res) {
        const data = req.body;
        console.log('billInsert start, the request is: ', data)

        var bill = new DB.Bill({
            owner: data.owner,
            date: data.date,
            name: data.name,
            amount: data.amount,
            category: data.category,
            memo: data.memo
        });

        bill.save(function (err, success) {
            if (err) {
                console.log('errorMsg: ', err)
                res.json({
                    result: false,
                    message: '2000'
                });
            }
            else {
                console.log(success)
                res.json({
                    result: true,
                    message: bill
                });
            }
        });

    });

    //修改
    app.post('/billUpdate', function (req, res) {

        const data = req.body;
        console.log('billUpdate start, the request is: ', data)

        DB.Bill.findById(data._id, function (err, bill) {

            bill.set({
                date: data.date,
                name: data.name,
                amount: data.amount,
                category: data.category,
                memo: data.memo
            });

            bill.save(function (err, success) {
                if (err) {
                    console.log('errorMsg: ', err)
                    res.json({
                        result: false,
                        message: 2000
                    });
                }
                else {
                    console.log(bill)
                    res.json({
                        result: true,
                        message: bill
                    });
                }
            });
        });
    });

    //刪除
    app.post('/billDelete', function (req, res) {
        const billId = req.body._id
        console.log('billDelete start, thie request is: ', billId)

        DB.Bill.remove({ _id: billId }, function (err, success) {
            if (err) {
                console.log('errorMsg: ', err)
                res.json({
                    result: false,
                    message: '2000'
                })
            }
            else {
                console.log(billId)
                res.json({
                    result: true,
                    message: billId
                })
            }
        })
    })
}
exports.api = api;
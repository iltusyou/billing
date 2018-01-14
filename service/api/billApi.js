var DB = require('../DB')

var api = function(app){

    //查詢    
    app.post('/getBillList',function(req, res){
        console.log('getBillList start')
        const data = req.body;
        console.log(data)

        var searchData = {
            owner:data.owner            
        }      
        if(data.name)
            searchData.name = { "$regex": data.name, "$options": "i" }
        
        if(data.category) 
            searchData.category= data.category;

        if(data.dateStart||data.dateEnd){
            var dateRange={};
            if(data.dateStart)
                dateRange.$gte=data.dateStart
            if(data.dateEnd)
                dateRange.$lte=data.dateEnd
            searchData.date = dateRange            
        }

        console.log('searchData')
        console.log(searchData)
        DB.Bill.find(searchData,function(err, success){
            console.log(success);
            res.json(success);
        });
    });

    //新增
    app.post('/billInsert', function(req,res){
        console.log('billInsert start')

        const data = req.body;
        console.log(data);
        var bill = new DB.Bill({
            owner:data.owner,
            date:data.date,
            name:data.name,
            amount:data.amount,
            category:data.category,                        
            memo:data.memo
        });

        bill.save(function(err,success){
            if(err){
                res.json({
                    result:false,
                    message:err.message
                });
            }
            else{
                console.log(success)
                res.json({
                    result:true,
                    message:bill
                });
            }
        });

    });

    //修改
    app.post('/billUpdate', function(req,res){
        console.log('billUpdate start')

        const data = req.body;
        console.log(data);
        DB.Bill.findById(data._id,function(err,bill){

            bill.set({
                date:data.date,
                name:data.name,
                amount:data.amount,
                category:data.category,                                
                memo:data.memo
            });

            bill.save(function(err, success){
                if(err){
                    res.json({
                        result:false,
                        message:2000
                    });
                }
                else{
                    console.log(bill)
                    res.json({
                        result:true,
                        message:bill
                    });
                }
            });
        });
    });

    //刪除
    app.post('/billDelete', function (req, res) {              
        const billId = req.body._id
        DB.Bill.remove({_id:billId},function(err,success){
            if(err){
                res.json({
                    result:false,
                    message:'delete fail'
                })
            }

            res.json({
                result:true,
                message: billId
            })
        })
        
    })
}
exports.api = api;
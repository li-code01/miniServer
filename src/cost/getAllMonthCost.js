var common = require('../mongodb/costMongo');

module.exports = (req, res) => {
    // console.log('123', res);
    common.query("month_cost",{},(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 200, data: result});
        }
    });
}

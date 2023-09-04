var common = require('../mongodb/costMongo');

module.exports = (req, res) => {
    let userName = req.headers.username;
    if (!userName) {
        res.json({code: 300, data: 'user缺失'});
    }
    common.query("month_cost",{},(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 200, data: result});
        }
    });
}

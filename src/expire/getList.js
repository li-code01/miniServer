var common = require('../mongodb/connectMongodb');

module.exports = (req, res) => {
    common.query("expire_list",{},(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 0, data: result});
        }
    });
}

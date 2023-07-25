var common = require('../mongodb/fileMongo');

module.exports = (req, res) => {
    common.query("game",{},(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 200, data: result});
        }
    });
}

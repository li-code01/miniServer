var common = require('../mongodb/connectMongodb');

module.exports = (req, res) => {
    common.query("autoSign",{},(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 200, data: result});
        }
    });
}

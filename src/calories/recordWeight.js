var common = require('../mongodb/connectMongodb');
const urlib = require("url");

module.exports = (req, res) => {
    let urls = req.url;
    let myobj = urlib.parse(urls, true);
    let { weight, date } = myobj.query;
    if (weight) {
        common.insert("weight",{ weight: weight, date: date },(err,result)=>{
            if (err) {
                res.json({code: 300, data: err});
            } else {
                res.json({code: 200, data: result});
            }
        });
    } else {
        common.query("weight",{ date: date },(err,result)=>{
            if (err) {
                res.json({code: 300, data: err});
            } else {
                res.json({code: 200, data: result });
            }
        });
    }

}

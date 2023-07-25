var common = require('../mongodb/costMongo');
const urlib = require("url");

module.exports = (req, res) => {
    // console.log('123', res);
    let urls = req.url;
    let myobj = urlib.parse(urls, true);
    let { date } = myobj.query;
    common.query("cost",{ date: date },(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 200, data: result});
        }
    });
}

var common = require('../mongodb/costMongo');
const useTool = require("../../utils");

module.exports = async (req, res) => {
    let { year, month, day} = await useTool.getParamsByUrl(req);
    let formatMonth = month < 10 ? '0' + month : month;
    let formatDay = day < 10 ? '0' + day : day;
    let userName = req.headers.username;
    console.log('123', `${year}-${month}`, userName);
    common.query("cost",{ date: { $regex: `${year}-${formatMonth}-${formatDay ?? ''}`}, userName },(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 200, data: result});
        }
    });
}

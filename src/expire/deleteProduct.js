var common = require('../mongodb/connectMongodb');
var mongoose = require('mongoose');
const urlib = require('url');

// 获取列表
function getMenuList(res, month, username) {
    common.query("expire_list",{},(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 0, data: result});
        }
    });
}
module.exports = async (req, res) => {
    let urls = req.url;
    let myobj = urlib.parse(urls, true);
    let { id } = myobj.query;
    console.log('id', id);
    let formatId = mongoose.Types.ObjectId(id);
    let whereStr = { _id: formatId };
    common.delete("expire_list",whereStr,(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            getMenuList(res);
        }
    });
}

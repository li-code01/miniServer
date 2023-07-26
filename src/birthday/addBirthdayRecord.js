var common = require('../mongodb/connectMongodb');
const useTool = require('../../utils/index');
function getList(res) {
    common.query("birthday_list",{},(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 0, data: result});
        }
    });
}
module.exports = async (req, res) => {
    let { name, date} = await useTool.postParamsByUrl(req);
    let addObj = {
        name,
        date,
    }
    common.insert("birthday_list", addObj,(err)=>{
        if (err) {
            res.json({code: 200, data: err});
        } else {
            getList(res)
        }
    });
}

var common = require('../mongodb/connectMongodb');
const useTool = require("../../utils");
const moment = require("moment");
const queryList = (res) => {
    common.query("autoSign",{},(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 200, data: result});
        }
    });
};
module.exports = async (req, res) => {
    let { date, source } = await useTool.postParamsByUrl(req);
    let addRecord = {
        date,
        source,
        time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        juejin: "签到成功",
        bilibili: "签到成功",
        state: true,
        mack: '补签',
    }
    common.insert("autoSign", addRecord,(err)=>{
        if (err) {
            res.json({code: 200, date: err });
        } else {
            queryList(res)
        }
    });
}

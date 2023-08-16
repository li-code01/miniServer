var juejin = require('./juejin_signIn');
var bilibili = require('./bilibili_signIn');
var common = require('../mongodb/connectMongodb');
const moment = require('moment')

// 记录签到状态
function recordSign(res, data) {
    common.insert("autoSign",{ ...data },(err)=> {
        if (err) {
            res.json({code: 500, data: err, message: '失败',});
        } else {
            res.json({code: 200, data: true, message: '签到成功'});
        }
    })
}

// 自动签到
async function login (res, date) {
    const juejinRes = await juejin.juejin();
    const bilibiliRes = await bilibili.bilibili();

    // 签到成功
    if (!juejinRes && !bilibiliRes) {
        let data = {
            date: date[0],
            juejin: '签到成功',
            bilibili: '签到成功',
            time: date[1],
            state: true
        }
        recordSign(res, data)
    } else {
        res.json({ code: '400', message: '签到失败', data: { juejinRes, bilibiliRes } });
    }
}
module.exports = (req, res) => {
    let date = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss').split('T');
    common.query("autoSign",{ date: date[0] },async (err,result)=>{
        // 有错误信息
        if (err) {
            res.json({code: 300, data: err});
        } else {
            // 已经签到过了
            if (result.length > 0) {
                res.json({ code: '200', message: '今日已签到', data: true })
            } else {
                // 可以进行签到
                await login(res, date)
            }
        }
    })}
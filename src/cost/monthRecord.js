const urlib = require('url');
var mongoose = require('mongoose');
var querystring = require('querystring');
var common = require('../mongodb/costMongo');
const useTool = require("../../utils");
const moment = require('moment')
// 获取菜单列表
function getMenuList(res, month, username) {
    let date = moment(new Date()).format('YYYY-MM-DD')
    common.query("cost",{date: date, userName: username },(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 0, data: result});
        }
    });
}
// 添加一个菜单
function add(postObj, res, username) {
    const temp = {
        ...postObj,
        userName: username,
        month: postObj.month - 0,
    }
    common.insert("cost", temp,(err)=>{
        if (err) {
            res.json({code: 0, data: err});
        } else {
            getMenuList(res, postObj.month - 0, username);
        }
    });
}
// 修改一个记录
function modify(postObj, res, username) {
    let formatId = mongoose.Types.ObjectId(postObj.id);
    let setData = {
        $set: {
            ...postObj,
            userName: username,
            money: postObj.money - 0,
            month: postObj.month - 0,
        },
    };
    let whereId = { _id: formatId };
    common.update("cost",whereId,setData,(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            getMenuList(res, postObj.month - 0, username);
        }
    });
}
// 删除一个记录
function deleteMenu(postObj, res, username) {
    let formatId = mongoose.Types.ObjectId(postObj.id);
    let whereStr = { _id: formatId };
    common.delete("cost",whereStr,(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            getMenuList(res, postObj.month - 0, username);
        }
    });
}
// 根据类型触发不同的函数
function actionEvent (costType, res, postObj, username) {
    switch (costType - 0) {
        case 2:
            add(postObj, res, username);
            break;
        case 0:
            modify(postObj, res, username);
            break;
        case 3:
            deleteMenu(postObj, res, username);
            break;
    }
}
module.exports = async (req, res) => {
    let { costType, level, title, date, mack, money, month, type, } = await useTool.postParamsByUrl(req);
    let postObj = {
        costType, level, title, date, mack, money, month, type,
    }
    let username = req.headers.username
    console.log('monthRecord', postObj, username);
    actionEvent(costType,res, postObj, username)
}

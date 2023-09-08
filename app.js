// 0. 加载 Express
const https = require('https');
const fs = require('fs');
const express = require('express')
const fileUpload = require('express-fileupload');
const getList = require('./src/expire/getList')
const addExpire = require('./src/expire/add')
const deleteProduct = require('./src/expire/deleteProduct')
const getCostList = require('./src/cost/getCostList')
const getIndexImg = require('./src/file/getIndexImg')
const getGameInfo = require('./src/game/getGameInfo')
const getCaloriesInfo = require('./src/calories/getCaloriesInfo')
const addCaloriesRecord = require('./src/calories/addCaloriesRecord')
const wxLogin = require('./src/login/wxlogin')
const birthday = require('./src/birthday/getList')
const recordWeight = require('./src/calories/recordWeight')
const getSpend = require('./src/cost/getSpend')
const userLoginAi = require('./src/access/getAccess')
const talkAi = require('./src/access/talk')
const addBirthdayRecord = require('./src/birthday/addBirthdayRecord')
const deleteBirthdayRecord = require('./src/birthday/deleteBirthdayRecord')
const editBirthdayRecord = require('./src/birthday/editBirthdayRecord')
const upload = require('./src/upload/upload')
const monthRecord = require('./src/cost/monthRecord')
const signIn = require('./src/daySign/signIn')
const querySignState = require('./src/daySign/querySignState')
const getSignList = require('./src/daySign/getSignList')
const addSignRecord = require('./src/daySign/addSignRecord')
const getMonthTotal = require('./src/cost/getMonthTotal')
const userAnth = require('./src/login/userAnth')


// 1. 调用 express() 得到一个 app
const app = express()
app.all('*', function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    // res.header("Access-Control-Allow-Headers", "content-type");
    // res.header('content-type', 'application/json;charset=utf-8')
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "*");
    next();
})
// 使用 express-fileupload 中间件
app.use( fileUpload() );
//wx登录
app.get('/wxLogin', wxLogin)
//获取列表
app.get('/getList', getList)
//添加到期商品
app.post('/addExpire', addExpire)
//添加到期商品
app.get('/deleteProduct', deleteProduct)
//获取所有月份支出
app.get('/getCostList', getCostList)
//获取首页动漫图
app.get('/getIndexImg', getIndexImg)
//获取游戏信息
app.get('/getGameInfo', getGameInfo)
//获取热量列表
app.get('/getCaloriesInfo', getCaloriesInfo)
//添加热量记录
app.post('/addCaloriesRecord', addCaloriesRecord)
//获取生日列表
app.get('/birthday', birthday)
//添加生日记录
app.post('/addBirthdayRecord', addBirthdayRecord)
//修改生日记录
app.post('/editBirthdayRecord', editBirthdayRecord)
//删除生日记录
app.get('/deleteBirthdayRecord', deleteBirthdayRecord)
//记录体重
app.get('/recordWeight', recordWeight)
//获取每日开销
app.get('/getSpend', getSpend)
//AI对话账户登陆
app.get('/userLoginAi', userLoginAi)
//上传文件
app.post('/upload', upload)
//AI对话
app.post('/talkAi', talkAi)
//消费记录
app.post('/monthRecord', monthRecord)
//查询签到状态
app.get('/querySignState', querySignState)
//获取签到记录
app.get('/getSignList', getSignList)
//签到
app.get('/signIn', signIn)
//签到补签
app.post('/addSignRecord', addSignRecord)
//获取每月总开销
app.get('/getMonthTotal', getMonthTotal)
//获取权限详情
app.post('/userAnth', userAnth)
const opt = {
    key: fs.readFileSync('./certs/my-home.club.key'),
    cert:  fs.readFileSync('./certs/my-home.club.bundle.crt')
}
// 3. 监听端口号，启动 Web 服务
const server = https.createServer(opt ,app);
server.listen(924, () => {
    console.log('924')
});


var request = require('request');
var common = require('../mongodb/connectMongodb');
const urlib = require('url');

function findLoginInfo (res, data) {
    common.queryOne("user",{openid: data.openid},(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            if (result) {
                res.json({code: 200, data: result.weight});
            } else {
                res.json({code: 200, data: '未知用户'});
            }
        }
    })
}
module.exports = (req, res) => {
    let urls = req.url;
    let myobj = urlib.parse(urls, true);
    let { code } = myobj.query;
    var options = {
        url: `https://api.weixin.qq.com/sns/jscode2session?js_code=${code}&appid=wx52159d02bc0aaeaa&secret=596a6c3d311bc1678b9cf39f1dd1185f&grant_type=authorization_code`,
        method: 'GET',
        json: true,
    };
    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            // console.log('------接口数据------',data);
            findLoginInfo(res, data)
        }
    }
    request(options, callback)
}

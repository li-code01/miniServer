var request = require('request');
var common = require('../mongodb/adminMongo');
const urlib = require("url");

function findLoginInfo (res, data, username, date, type) {
    common.update("access",{username}, { $set: { access_token: JSON.parse(data).access_token, date, type } },(err,result)=>{
        if (err) {
            res.json({code: 300, data: err});
        } else {
            res.json({code: 200, data: true})
        }
    })

}
module.exports = (req, res) => {
    let urls = req.url;
    let myobj = urlib.parse(urls, true);
    let { userTitle, date, type } = myobj.query;
    var options = {
        'method': 'POST',
        'url': 'https://aip.baidubce.com/oauth/2.0/token?client_id=Zk92jfQC8SSAwMq0ZCTBoa0L&client_secret=4oqU8hlXQo0X3ep0BgVr9vk6LfKw09uh&grant_type=client_credentials',
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    if (date && type) {
        function callback(error, response, data) {
            if (error) {
                res.json({code: 0, data: error});
            } else {
                findLoginInfo(res, data, userTitle, date, type)
            }
        }
        request(options, callback)
    } else {
        res.json({code: 100, data: '参数错误'});
    }
}

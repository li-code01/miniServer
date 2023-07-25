var common = require('../mongodb/connectMongodb');
var querystring = require('querystring');
var moment = require('moment');
const urlib = require('url');

module.exports = async (req, res) => {
    let postData = '';
    await req.on('data', (data) => {
        postData += data;
    });
    let myobj = urlib.parse(postData, true);
    let formatData = querystring.parse(myobj.path);
    let obj = JSON.parse(Object.keys(formatData)[0]);
    let date = moment(new Date()).format('YYYY-MM-DD');
    let addObj = {
        ...obj,
        createDate: date,
    }
    common.insert("food", addObj,(err)=>{
        if (err) {
            res.json({code: 200, data: err});
        } else {
            res.json({code: 0, data: true});
        }
    });
}

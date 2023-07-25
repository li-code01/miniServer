var request = require('request');
var common = require('../mongodb/adminMongo');
const useTool = require('../../utils/index')
const moment = require('moment');
function getAccessToken (username) {
    return new Promise((resolve, reject) => {
        common.queryOne("access",{username},(err,result)=>{
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};
function queryCount (username) {
    return new Promise((resolve, reject) => {
        common.query('access', { username }, (err,result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
};
function pervCount (username, nowCount) {
    common.update('access', { username }, {$set: { talkCount: nowCount}}, (err,result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
};
function recordTalk (result, message, username) {
    let ceateDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    common.insert('train_list', { username, result, message, ceateDate }, (err,result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
};
module.exports = async (req, res) => {
    let { userTitle, message } = await useTool.postParamsByUrl(req);
    const { talkCount } = await queryCount(userTitle);
    if (talkCount > 0) {
        const accessToken = await getAccessToken(userTitle);
        let nowCount = talkCount - 1
        // 测试
        // const obj = '您好，我是文心一言，英文名是ERNIE Bot。我能够与人对话互动，回答问题，协助创作，高效便捷地帮助人们获取信息、知识和灵感'
        // res.json({code: 200, data: obj});
        var options = {
            'method': 'POST',
            'url': 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=' + accessToken.access_token,
            'headers': {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "messages": [
                    {
                        "role": 'user',
                        "content": message
                    }
                ],
            })
        };
        function callback(error, response) {
            if (error) {
                res.json({code: 0, data: error});
            } else {
                let { result } = JSON.parse(response.body)
                pervCount(userTitle, nowCount);
                recordTalk(result, message, userTitle)
                res.json({code: 200, data: result });
            }
        }
        request(options, callback)
    } else {
        res.json({code: 0, msg: '次数不足' });
    }
}

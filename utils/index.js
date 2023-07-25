const urlib = require('url')
const querystring = require("querystring");
const getParamsByUrl = (req) => {
    let urls = req.url;
    let myobj = urlib.parse(urls, true);
    return myobj.query
};

const postParamsByUrl = (req) => {
    return new Promise(async (resolve) => {
        let postData = '';
        await req.on('data', (data) => {
            postData += data;
        });
        let myobj = urlib.parse(postData, true);
        resolve(querystring.parse(myobj.path))
    })
};

module.exports = {
    getParamsByUrl,
    postParamsByUrl
};
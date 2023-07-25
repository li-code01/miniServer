const mongodbUrl = process.platform === 'win32' ? "mongodb://49.235.91.205:21777/" : "mongodb://127.0.0.1:21777/";
module.exports = mongodbUrl

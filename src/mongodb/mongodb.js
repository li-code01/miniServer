var client = require("mongodb").MongoClient;
var mongodbUrl = require('../../config');

module.exports = {
    conn: function (dbName,cb) {
        client.connect(mongodbUrl,{
            auth: {
                username: "zzl",
                password: "LILIaixi0420.",
            },
            authSource: "admin",
            authMechanism: "DEFAULT",
        }, function (err, client) {
            if (err) {
                console.log("数据库连接失败");
            } else {
                //指定数据库的名字"dbName"
                var db = client.db(dbName);
                cb(db);
            }
        })
    }
};

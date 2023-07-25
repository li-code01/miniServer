const moment = require('moment')

setInterval(() => {
    console.log(moment(new Date()).format('YYYY-MM-DD hh:mm:SS'))
    // console.log(new Date().getMilliseconds())
}, 1000)
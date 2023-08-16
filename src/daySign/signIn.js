var juejin = require('./juejin_signIn');
var bilibili = require('./bilibili_signIn');

module.exports = async (req, res) => {
  const juejinRes = await juejin.juejin();
  const bilibiliRes = await bilibili.bilibili();
  if (!juejinRes && bilibiliRes) {
    res.json({ code: '0', message: '签到成功' });
  } else {
    res.json({ code: '400', message: '签到失败', data: { juejinRes, bilibiliRes } });
  }
}


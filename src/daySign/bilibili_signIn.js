/*---------------依赖-----------------*/
const axios = require('axios');

/*---------------配置-----------------*/
const config = {
  baseUrl: 'https://api.live.bilibili.com',
  apiUrl: {
    signin: '/xlive/web-ucenter/v1/sign/DoSign',
  },
  cookie:
    "_uuid=FE95ED4F-F8BD-9A52-927F-35F83FA654C489669infoc; buvid3=9ED43FCD-55FB-21A1-A081-0768D7E7FDB492824infoc; b_nut=1660451190; buvid4=7D155B7E-C789-5DDA-11EA-C3E3B2BEEDF892824-022081412-QCKRjuH3b3rYPPPQxqE35g==; LIVE_BUVID=AUTO1616604786204933; buvid_fp_plain=undefined; nostalgia_conf=-1; CURRENT_BLACKGAP=0; i-wanna-go-back=-1; b_ut=5; CURRENT_FNVAL=4048; rpdid=|(u~|ml||lkm0J'uYY)mJu|JR; Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02=1672640956; CURRENT_QUALITY=80; b_lsid=F107338DE_1865A7CE3FF; fingerprint=fedd3f0af3c8628a65788ed4aff4b300; SESSDATA=38ca75f8,1692107451,db999*22; bili_jct=78e1d6f17117273caba319d37a4cc121; DedeUserID=4475113; DedeUserID__ckMd5=d1ef8984e0604352; sid=p2za6m42; _dfcaptcha=26819abe0b397ad57504f74736358623; PVID=2; buvid_fp=fedd3f0af3c8628a65788ed4aff4b300",
};

/*---------------掘金-----------------*/

// 签到
const checkIn = async () => {
  const { cookie, baseUrl, apiUrl } = config;
  let str = '';
  let { data } = await axios({
    url: baseUrl + apiUrl.signin,
    method: 'get',
    headers: { Cookie: cookie },
  });
  if (data.message == '0') {
    console.log(`签到成功`);
    str = `签到成功`;
  } else {
    console.log(`签到失败${data.message}`);
    str = ``;
  }
  return str;
};

exports.bilibili = async (event, context) => {
  console.log('开始');
  const res = await checkIn();
  return res;
  console.log('结束');
};

/*---------------依赖-----------------*/
const axios = require('axios');

/*---------------配置-----------------*/
const config = {
  baseUrl: 'https://api.live.bilibili.com',
  apiUrl: {
    signin: '/xlive/web-ucenter/v1/sign/DoSign',
  },
  cookie:
    "buvid3=2DDCAA70-7551-8EC7-8B66-3CE8C3610E6433810infoc; b_nut=1683871033; _uuid=211A1555-7E9C-D8A8-7635-68C116B484BC54771infoc; rpdid=|(J~kmkRumml0J'uY)RJu|Rlm; buvid4=2AB82FE8-2CE2-8030-82E8-32DEE3194C8855395-023051213-pS%2FguQaFaWVnYfAFTgcTKQ%3D%3D; DedeUserID=4475113; DedeUserID__ckMd5=d1ef8984e0604352; LIVE_BUVID=AUTO2116847387683008; nostalgia_conf=-1; CURRENT_PID=ae5e0d00-f907-11ed-b015-95ea6644f379; i-wanna-go-back=-1; b_ut=5; FEED_LIVE_VERSION=V8; header_theme_version=CLOSE; buvid_fp_plain=undefined; hit-dyn-v2=1; Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02=1686294022,1687752519; CURRENT_BLACKGAP=0; CURRENT_QUALITY=80; hit-new-style-dyn=1; CURRENT_FNVAL=4048; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTM2MzQwNDMsImlhdCI6MTY5MzM3NDg0MywicGx0IjotMX0.uwEJ3Dg_JIpdpFK078Wdg9hZMWol3pbsJogHe96u5jQ; bili_ticket_expires=1693634043; bp_article_offset_4475113=835848739445801062; b_lsid=484424C7_18A4F81E0EA; home_feed_column=5; browser_resolution=1663-790; SESSDATA=749915f3%2C1709103046%2C6be15%2A913pCFFK4tGtL7i0kZx4CjXfq-pfVHW4Cvr0iRM2GwVA_mvKMMRnoNwj1Kj7Znkx-ZJBkC1QAADQA; bili_jct=ef7df0dd6cbb9f2c09990a8370264203; sid=8bxmi4mi; bp_video_offset_4475113=836271372839682130; fingerprint=ca63509777d8825bc3e1730f66d4121a; buvid_fp=ca63509777d8825bc3e1730f66d4121a; PVID=3",
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
  console.log(`签到bilibili`, data);
  if (data.message == '0') {
    console.log(`签到成功-bilibili`);
    str = ``;
  } else {
    console.log(`签到失败-bilibili${data.message}`);
    str = data.message;
  }
  return str;
};

exports.bilibili = async (event, context) => {
  console.log('开始');
  const res = await checkIn();
  return res;
};

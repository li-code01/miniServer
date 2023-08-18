/*---------------依赖-----------------*/
const axios = require('axios');

/*---------------配置-----------------*/
const config = {
  baseUrl: 'https://api.live.bilibili.com',
  apiUrl: {
    signin: '/xlive/web-ucenter/v1/sign/DoSign',
  },
  cookie:
    "buvid3=2DDCAA70-7551-8EC7-8B66-3CE8C3610E6433810infoc; b_nut=1683871033; _uuid=211A1555-7E9C-D8A8-7635-68C116B484BC54771infoc; rpdid=|(J~kmkRumml0J'uY)RJu|Rlm; buvid4=2AB82FE8-2CE2-8030-82E8-32DEE3194C8855395-023051213-pS%2FguQaFaWVnYfAFTgcTKQ%3D%3D; DedeUserID=4475113; DedeUserID__ckMd5=d1ef8984e0604352; LIVE_BUVID=AUTO2116847387683008; nostalgia_conf=-1; CURRENT_PID=ae5e0d00-f907-11ed-b015-95ea6644f379; i-wanna-go-back=-1; b_ut=5; FEED_LIVE_VERSION=V8; header_theme_version=CLOSE; buvid_fp_plain=undefined; hit-dyn-v2=1; Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02=1686294022,1687752519; home_feed_column=5; CURRENT_BLACKGAP=0; CURRENT_QUALITY=80; bp_article_offset_4475113=823331057260560534; hit-new-style-dyn=1; CURRENT_FNVAL=4048; bp_video_offset_4475113=829526912669843510; fingerprint=a5cdd5215a5cf1f4389e24810ac40d4d; buvid_fp=a5cdd5215a5cf1f4389e24810ac40d4d; innersign=0; b_lsid=1041010724F_18A01638ADF; browser_resolution=1784-960; SESSDATA=399ccbcb%2C1707792417%2Cd4eb6%2A81MWngnmTEHtgB9khwA6H4G6HckCDSQlq4B3DuyJflxav_pBFAkToeIAB-94QAJ76Rkr9qSgAADQA; bili_jct=1c6b7167a23e2730ca4b34ad51c2e12b; sid=6xfvr040; PVID=2",
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
    console.log(`签到成功-bilibili`);
    str = ``;
  } else {
    console.log(`签到失败-bilibili${data.message}`);
    str = `签到失败`;
  }
  return str;
};

exports.bilibili = async (event, context) => {
  console.log('开始');
  const res = await checkIn();
  return res;
};

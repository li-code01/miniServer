/*---------------依赖-----------------*/
const axios = require('axios');

/*---------------配置-----------------*/
const config = {
  baseUrl: 'https://api.juejin.cn',
  apiUrl: {
    getTodayStatus: '/growth_api/v2/get_today_status',
    checkIn: '/growth_api/v1/check_in',
    getLotteryConfig: '/growth_api/v1/lottery_config/get',
    drawLottery: '/growth_api/v1/lottery/draw',
    getlotteryList:
      '/growth_api/v1/lottery_history/global_big?aid=2608&uuid=7011439613199124007',
    lotteryUrl:
      '/growth_api/v1/lottery_lucky/dip_lucky?aid=2608&uuid=7011439613199124007',
  },
  cookie:
  '__tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227232265166212285987%2522%252C%2522user_unique_id%2522%253A%25227232265166212285987%2522%252C%2522timestamp%2522%253A1683892980433%257D; n_mh=LPIAPfQ7F6Q8wA5hCByBHwhtuwSN8ZcDcNkBK3M_-gA; sid_guard=46305496a5710ea2c6bc9498cf2ed0b5%7C1684720550%7C31536000%7CTue%2C+21-May-2024+01%3A55%3A50+GMT; uid_tt=02b0abaab6f788fd7658facbf8c3f2c0; uid_tt_ss=02b0abaab6f788fd7658facbf8c3f2c0; sid_tt=46305496a5710ea2c6bc9498cf2ed0b5; sessionid=46305496a5710ea2c6bc9498cf2ed0b5; sessionid_ss=46305496a5710ea2c6bc9498cf2ed0b5; sid_ucp_v1=1.0.0-KGZiZjhkZDJkMzZhNjdmN2QzMzNiNmJhNWY1NDhhN2FjMzVhZmEyMjQKFgiumcDA_fUBEKaXq6MGGLAUOAJA8QcaAmxmIiA0NjMwNTQ5NmE1NzEwZWEyYzZiYzk0OThjZjJlZDBiNQ; ssid_ucp_v1=1.0.0-KGZiZjhkZDJkMzZhNjdmN2QzMzNiNmJhNWY1NDhhN2FjMzVhZmEyMjQKFgiumcDA_fUBEKaXq6MGGLAUOAJA8QcaAmxmIiA0NjMwNTQ5NmE1NzEwZWEyYzZiYzk0OThjZjJlZDBiNQ; store-region=cn-sh; store-region-src=uid; _ga=GA1.2.43694735.1685438620; _tea_utm_cache_2608={%22utm_source%22:%22gzh%22}; _ga_S695FMNGPJ=GS1.2.1690527456.2.0.1690527456.60.0.0; csrf_session_id=0b806fcb95a4645c6749b8763cf8d837; msToken=FnW3pP5Z1RlCsAERKNYjdOltWCobAg66Zj3FoNt4G4vZ8qOT7iag6eOu-bkbiQKukIunNP2CxH3VAtXG_0kCE1cbcA1De9hpEC70qkYPzVN6YBRWT7tv5Wf5jAfL2G4='
};

/*---------------掘金-----------------*/

// 签到
const checkIn = async () => {
  let str = '';
  let { check } = await getTodayCheckStatus();
  if (check) {
    return '掘金已经登录过了';
  }
  const { cookie, baseUrl, apiUrl } = config;
  let { data } = await axios({
    url: baseUrl + apiUrl.checkIn,
    method: 'post',
    headers: { Cookie: cookie },
  });
  console.log('今日签到结果', data);
  if (data.err_no) {
    str = data.err_msg;
  } else {
    str = '';
  }
  return str;
};

// 查询今日是否已经签到
const getTodayCheckStatus = async () => {
  const { cookie, baseUrl, apiUrl } = config;
  let { data } = await axios({
    url: baseUrl + apiUrl.getTodayStatus,
    method: 'get',
    headers: { Cookie: cookie },
  });
  console.log('今日签到状态', data);
  // ture 已经登录了
  if (data.data.check_in_done) {
    return { check: true };
  }
  // 还没登录了
  return { check: false };
};
exports.juejin = async (event, context) => {
  console.log('开始签到-掘金');
  const res = await checkIn();
  return res;
  console.log('结束签到-掘金');
};

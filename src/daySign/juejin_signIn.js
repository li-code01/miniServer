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
    'msToken=BeTEe6fRKvHD1FB4a3YHDbcScbP_VheKPSrSZhMvcEDpmK4hz8TADRq1D6P_9QaOWizYppRuyc4AZcb8SXEprPGOl6pCOV0CsraV7HE6et5qeB2WUYG8siA972Bv0WM=; Path=/; Domain=juejin.cn; Expires=Tue, 22 Aug 2023 08:21:40 GMT; Secure; SameSite=None',
};

/*---------------掘金-----------------*/

// 签到
const checkIn = async () => {
  let str = '';
  let { error } = await getTodayCheckStatus();
  if (error) return error;
  const { cookie, baseUrl, apiUrl } = config;
  let { data } = await axios({
    url: baseUrl + apiUrl.checkIn,
    method: 'post',
    headers: { Cookie: cookie },
  });
  if (data.err_no) {
    str = '';
  } else {
    str = `签到成功！当前积分：${data.data.sum_point}`;
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
  if (data.data.check_in_done) {
    return { error: true };
  }
  return { error: false };
};
exports.juejin = async (event, context) => {
  console.log('开始签到-掘金');
  const res = await checkIn();
  return res;
  console.log('结束签到-掘金');
};

// import React from '@react';
const ANU_ENV = process.env.ANU_ENV;
// const globalData = React.getApp().globalData;
// 请求配置
let settings = {};
if (ANU_ENV === 'wx') {
  // 微信小程序业务逻辑
  // settings = {
  //     requestDomain: global.__env.server,
  //     socketDomain: 'wss://wxapp.qunar.com',
  //     uploadFileDomain: 'http://wxapp.qunar.com',
  //     downloadFileDomain: 'http://wxapp.qunar.com'
  // };
  settings = {
    requestDomain: 'https://wxapp.beta.qunar.com'
  };
} else if (ANU_ENV === 'ali') {
  // todo 支付宝小程序业务逻辑 先写微信的beta
  settings = {
    requestDomain: 'https://wxapp.beta.qunar.com'
  };
} else {
  // ...
}
// module.exports = {
//     settings: settings
// };

export default {
  settings
};

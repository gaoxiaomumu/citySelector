import React from '@react';
import './pages/index/index';

import './pages/citySelector/index';
import './pages/demo/index';

import './app.less';

class Demo extends React.Component {
  config = {
    window: {
      defaultTitle: ' 支付包小程序',
      navigationBarBackgroundColor: '#0088a4',
      navigationBarTitleText: 'mpreact',
      titleBarColor: '#08bbf2'
    }
  };
  globalData = {
    ufo: 'ufo'
  };
  onLaunch() {
    console.log('App launched');
  }

  onShow() {
    console.log('App showed');
  }

  onHide() {
    // 小程序隐藏
    console.log('App Hided');
  }
  onError(msg) {
    console.log('App Error', msg);
  }
}

App(new Demo());

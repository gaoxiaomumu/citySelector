import React from '@react';
import CONSTANTS from '../../common/utils/define.js';
var HOTEL_EVENT_NAME = CONSTANTS.HOTEL_EVENT_NAME;
var HOTEL_API = CONSTANTS.HOTEL_API;

// 事件
class Express extends React.Component {
  constructor() {
    super();
    this.state = {
      data: { 热门城市: [{ city: '12' }, { city: '13' }] }
    };
  }
  config = {
    navigationBarTextStyle: '#fff',
    navigationBarBackgroundColor: '#0088a4',
    navigationBarTitleText: 'Demo',
    'background-color': '#eeeeee',
    backgroundTextStyle: 'light'
  };

  componentDidMount() {
    console.log('props', 'DidMount');
    React.api.setStorageSync('key', 123);
    let value = React.api.getStorageSync('key')
    console.log(value)
    
  }

  citySelect() {
    console.log(111);
    var params = {
      type: 3, // 0:机票 1:火车票 2:汽车票 3:酒店
      cityListService: HOTEL_API.HOTEL_LIST.HOTEL_INDEX_CITY,
      citySuggestService: HOTEL_API.HOTEL_LIST.HOTEL_INDEX_SUGGEST,
      eventType: HOTEL_EVENT_NAME.CITY_SELECT,
      placeholder: '请输入城市名称或首字母'
    };

    React.api.navigateTo({
      url: '/pages/citySelector/index?data=' + JSON.stringify(params)
    });

    // qmonitor.send('search_cityquery');
  }

  render() {
    return (
      <div>
        <navigator url="/pages/demo/index" hover-class="navigator-hover">
          <button>demo</button>
        </navigator>
        <navigator url="/pages/demo2/index" hover-class="navigator-hover">
          <button>demo2</button>
        </navigator>
        <div hover-class="navigator-hover">
          <button onTap={this.citySelect}>城市列表页</button>
        </div>

      </div>
    );
  }
}
export default Express;



const HOTEL_EVENT_NAME = {
  CITY_SELECT: 'CITY_SELECT',
};



const HOTEL_PLACEHOLDER = {
  HOTEL_INDEX_KEYWORDS: '搜索酒店名、地名、地标'
};

//api接口
const HOTEL_API = {
  //酒店列表页
  HOTEL_LIST: {
    HOTEL_INDEX_SUGGEST: '/api/hotel/suggest/c',
    HOTEL_INDEX_CITY: '/api/hotel/city/en'
  }
};

// 星期对应
const DATE_WEEK = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六'
};

// 填单页优惠类型
const PT_TYPE = {
  SUBTRACT: 'SUBTRACT', // 减
  CASH_BACK: 'CASH_BACK'  // 返
};

const DEFAULT_CITY = {
  city: '北京',
  cityUrl: 'beijing_city'
};
export default  {
  HOTEL_EVENT_NAME,
  
  HOTEL_PLACEHOLDER,
  HOTEL_API,
  DATE_WEEK,
  PT_TYPE,
  DEFAULT_CITY
}

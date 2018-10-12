import React from '@react';
import request from '../../common/utils/request.js';
import utils from '../../common/utils/utils.js';
import './index.scss';

const HOT_CITY = '_HOT_CITY';
const ALL_CITIES = '_ALL_CITIES';
const HOT_CITY_GJ = 'HOT_CITY_GJ';
const ALL_CITIES_GJ = 'ALL_CITIES_GJ';
import QunarLoading from '../QunarLoading/index';

class CitySelector extends React.Component {
  constructor() {
    super();

    this.state = {
      // 区分业务命名前缀
      prefix: '',
      // 当前城市
      currentCity: '',
      cities: [],
      // 是否处于搜索状态
      isSearch: false,
      // 输入框内容
      inputValue: '',
      // 热门城市
      hotCities: [],
      // 有历史城市
      historyCities: [],
      // 所有城市
      allCities: [],
      isFocus: false,
      isShow: false,
      isFail: false,
      failMessage: '',
      activeCity: 'domestic',
      showOverseas: false
    };
  }

  componentDidMount() {
    const { param } = this.props;
    var self = this;
   
    var data = JSON.parse(param);
    var type = '';
    switch (data.type) {
      case 0:
        type = 'flight';
       
        break;
      case 1:
        type = 'train';
        break;
      case 2:
        type = 'bus';
        break;
      case 3:
        type = 'hotel';
        break;
    }
    self.setState({
      // isShow: false,
      isFail: false,
      failMessage: '',
      param: data,
      prefix: type.toUpperCase()
    });
    if (type === 'hotel') {
      self.setState({
        showOverseas: true
      });
    }
    // self._qWatcher = new QWatcher(WATCHER.SUGGEST.PV);
    self.readHotAndAllCity();
  }

  readHotAndAllCity() {
    //首先在storage里获取，失败则通过网络获取,最后静态数据兜底
    try {
      var self = this;

      var vHotCities = React.api.getStorageSync(self.state.prefix + HOT_CITY);
      var allCities = React.api.getStorageSync(self.state.prefix + ALL_CITIES);
      console.log('all', this.state.activeCity);
      if (this.state.activeCity === 'overseas') {
        vHotCities = React.api.getStorageSync(self.state.prefix + HOT_CITY_GJ);
        allCities = React.api.getStorageSync(self.state.prefix + ALL_CITIES_GJ);
      }
      var isReqHot = vHotCities && (vHotCities.length || vHotCities['热门城市']);
      var isReqAll = allCities;
      console.log('all', allCities);
      var currentTime = new Date().getTime();
      var time = React.api.getStorageSync(self.state.prefix + HOT_CITY + '_TIME');
      // 汽车票的热门城市经常更新，且出发城市和到达城市的数据不同，故本期汽车票的热门城市数据不读localstorage
      if (
        isReqHot &&
        isReqAll &&
        self.state.prefix !== 'BUS' &&
        time &&
        currentTime - time <= 3 * 86400000
      ) {
        this.setCities(vHotCities, allCities);
      } else {
        this.requestCities();
      }
    } catch (error) {
      this.requestCities();
    }
  }
  setCities(hotCitiesData, allCitiesData) {
    hotCitiesData = Array.isArray(hotCitiesData) ? hotCitiesData : Object.values(hotCitiesData)[0];
    this.setState({
      hotCities: hotCitiesData,
      allCities: allCitiesData
    });
    var self = this;
    let hotDataName = self.state.activeCity === 'overseas' ? HOT_CITY_GJ : HOT_CITY;
    React.api.setStorage({
      key: self.state.prefix + hotDataName,
      data: hotCitiesData
    });
    let allDataName = self.state.activeCity === 'overseas' ? ALL_CITIES_GJ : ALL_CITIES;
    React.api.setStorage({
      key: self.state.prefix + allDataName,
      data: allCitiesData
    });
  }

  requestCities() {
    var self = this;
    if (self.state.prefix === 'TRAIN') {
      var trainCity = [
        ['北京', '上海', '广州'],
        ['深圳', '南京', '武汉'],
        ['杭州', '西安', '郑州'],
        ['成都', '长沙', '天津']
      ];
      // self.setHotCity(trainCity);
      // self.setAllCities([]);
      self.setCities(trainCity, []);
      return;
    }

    var _cityParam = self.state.param.citySuggestParam || {};
    var _cityData = self.state.param.citySuggestData || {};

    if (self.state.prefix === 'BUS') {
      _cityData.b = {
        bizType: self.state.param.isDep ? 1 : 5,
        localVer: 0
      };
      // _cityData.c = requester.getParamC()
    }

    var reqData = {
      host: self.state.param.cityListHost || 'https://wxapp.qunar.com',
      service: self.state.param.cityListService,
      param: _cityParam,
      data: _cityData,
      success: function(res) {
        switch (self.state.prefix) {
          case 'FLIGHT': {
            break;
          }
          case 'TRAIN': {
            break;
          }
          case 'BUS': {
            break;
          }
          case 'HOTEL': {
            if (res && res.data && res.data.length) {
              // self.setHotCity(res.data[0]);
              let data = [];
              if (res.data.length > 1) {
                data = utils.arrayTransform(res.data.slice(1));
                // self.setAllCities(data);
              }
              self.setCities(res.data[0], data);
              React.api.setStorage({
                key: self.state.prefix + HOT_CITY + '_TIME',
                data: new Date().getTime()
              });
            }
            break;
          }
        }
      },
      fail: function() {
        self.setState({
          isFail: true,
          failMessage: '小驼出错啦，请稍后重试'
        });
      },
      complete: function() {
        //关闭loading
        // Network.hideNetwork.call(self, function() {
        self.setState({
          isShow: true
        });
        // });
      }
    };
    request(reqData);
  }

  cancelTap() {
    this.setState({
      isSearch: false,
      isFocus: false,
      noResult: false,
      word: '',
      inputValue: '',
      cities: []
    });
  }

  bindFocus() {
    this.setState({
      isFocus: true
    });
  }

  bindKeyInput(e) {
    let self = this;
    return utils.debounce(function(e, self) {
      var word = e.detail.value.replace(/\s/g, '');
      console.log(word);
      if (word.length > 0) {
        self.setState({
          isFocus: true,
          isSearch: true,
          inputValue: word,
          noResult: false
        });
      } else {
        self.setState({
          isSearch: false,
          inputValue: word,
          noResult: false,
          cities: []
        });
        return;
      }

      var updateCities = function(flag, data) {
        if (flag && data && data.length) {
          self.setState({
            cities: data
          });
        } else {
          self.setState({
            cities: [],
            noResult: true
          });
        }
      };

      var _cityParam = self.state.param.citySuggestParam || {};
      var _cityData = self.state.param.citySuggestData || {};
      var _param = { q: word, keyword: word, queryValue: word, city: word };
      var _data = { q: word, keyword: word, b: { queryValue: word }, city: word };
      Object.keys(_cityParam).forEach(function(k) {
        _param[k] = self.state.param.citySuggestParam[k];
      });
      Object.keys(_cityData).forEach(function(k) {
        _data[k] = self.state.param.citySuggestData[k];
      });
      var reqData = {
        host: self.state.param.citySuggestHost || 'https://wxapp.qunar.com',
        service: self.state.param.citySuggestService,
        param: _param,
        data: _data,
        success: function(res) {
          switch (self.state.prefix) {
            case 'FLIGHT': {
              updateCities(res.data.result && res.data.result.length, res.data.result);
              break;
            }
            case 'TRAIN': {
              updateCities(
                res.data.dataMap.result && res.data.dataMap.result.length,
                res.data.dataMap.result
              );
              break;
            }
            case 'BUS': {
              updateCities(
                res.data.suggestList && res.data.suggestList.length,
                res.data.suggestList
              );
              break;
            }
            case 'HOTEL': {
              var hotelData = (res.data && res.data.result) || [];
              var newData = [];

              if (res.data && hotelData.length > 0) {
                var key = res.data.userInput,
                  keyLen = key.length;
                hotelData.forEach(function(item, index) {
                  var text = item.display,
                    pos = text.toLowerCase().indexOf(key.toLowerCase());
                  console.log('pos', pos);
                  if (pos > -1) {
                    //截取高亮展示文本，重组数据结构
                    newData.push({
                      key: item.key,
                      cityUrl: item.cityUrl,
                      text: [
                        {
                          text: text.substr(0, pos),
                          isHL: false
                        },
                        {
                          text: text.substr(pos, keyLen),
                          isHL: true
                        },
                        {
                          text: text.substr(pos + keyLen),
                          isHL: false
                        }
                      ]
                    });
                  } else {
                    newData.push({
                      key: item.key,
                      cityUrl: item.cityUrl,
                      text: [
                        {
                          text,
                          isHL: false
                        }
                      ]
                    });
                  }
                });
              }
              updateCities(res.data, newData);
              break;
            }
          }
        }
      };

      if (self.state.prefix === 'BUS') {
        reqData.data.c = requester.getParamC();
      }
      request(reqData);
    }, 300)(e, self);
  }

  blur(e) {
    var word = e.detail.value.replace(/\s/g, '');
    if (word.length > 0) {
      this.setState({
        isFocus: false
      });
    } else {
      this.setState({
        isFocus: false,
        isSearch: false,
        noResult: false
      });
    }
  }

  changeCityToDomestic() {
    // let newParam = deepEqual(this.state.param);
    // newParam.cityListService = '/api/hotel/city/en';
    console.log('domestic');
    let self = this;
    this.setState(
      {
        activeCity: 'domestic',
        param: {
          ...this.state.param,
          cityListService: '/api/hotel/city/en'
        }
      },
      function() {
        self.readHotAndAllCity();
      }
    );
  }

  changeCityToOverseas() {
    // let newParam = deepEqual(this.state.param);
    // newParam.cityListService = '/api/hotel/city/gj';
    console.log('overseas');
    let self = this;
    this.setState(
      {
        activeCity: 'overseas',
        param: {
          ...this.state.param,
          cityListService: '/api/hotel/city/gj'
        }
      },
      function() {
        self.readHotAndAllCity();
      }
    );
  }

  cityTap() {}

  render() {
    return (
      <div>
        {!this.state.isShow && <QunarLoading />}
        {this.state.isShow && (
          <div class="city-container">
            {this.state.showOverseas && (
              <div class="cityTab">
                <view
                  class={'domestic ' + (this.state.activeCity === 'domestic' ? 'cityActive' : '')}
                  onTap={this.changeCityToDomestic}
                >
                  国内城市
                </view>
                <view
                  class={'overseas ' + (this.state.activeCity === 'overseas' ? 'cityActive' : '')}
                  onTap={this.changeCityToOverseas}
                >
                  海外城市
                </view>
              </div>
            )}
            <div class={this.state.showOverseas ? 'list-content-low' : 'list-content-high'}>
              <view class="city-wrapper">
                {(this.state.hotCities.length || this.state.hotCities['热门城市']) && (
                  <div class="label-title">热门城市</div>
                )}
                <div class="hot-city">
                  {this.state.hotCities.map(function(hotCity) {
                    return (
                      <div key={hotCity}>
                        {/* 机票热门城市 */}
                        {this.state.param &&
                          this.state.param.type === 0 && (
                            <div
                              class="hotCity-label"
                              data-city={hotCity}
                              onTap={this.cityTap}
                              data-source="hot"
                            >
                              {hotCity}
                            </div>
                          )}
                        {/* 火车票热门城市  */}
                        {this.state.param &&
                          this.state.param.type === 1 && (
                            <div class="hotCity-content">
                              {hotCity.map(function(hotTrainCity) {
                                return (
                                  <div key={hotTrainCity}>
                                    <view
                                      class="hotCity-label"
                                      data-city={hotTrainCity}
                                      onTap={this.cityTap}
                                    >
                                      {hotTrainCity}
                                    </view>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        {/* 汽车票热门城市 */}
                        {this.state.param &&
                          this.state.param.type === 2 && (
                            <div class="list-float">
                              {hotCity.citys.map(function(hotBusCity) {
                                return (
                                  <div key={hotBusCity}>
                                    <view
                                      class="hotCity-label dark-gray list-float-item"
                                      data-city={hotBusCity.name}
                                      onTap={this.cityTap}
                                    >
                                      {hotBusCity.name}
                                    </view>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        {/* 酒店热门城市 */}
                        {this.state.param &&
                          this.state.param.type === 3 && (
                            <div class="citylist">
                              <view class="hotCity-label city-package">
                                <view
                                  class={
                                    'city-grid ' + (hotCity.cityName == 'city' ? 'active' : '')
                                  }
                                  data-city={hotCity.cityName}
                                  data-cityurl={hotCity.cityUrl}
                                  onTap={this.cityTap}
                                >
                                  {hotCity.cityName}
                                </view>
                              </view>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </view>
            </div>
            <div
              class={
                'all-city ' + (this.state.isSearch || this.state.isFocus ? 'all-city-hide' : '')
              }
            >
              {/* 酒店所有城市 */}

              {this.state.param &&
                this.state.param.type === 3 && (
                  <div>
                    {this.state.allCities.map(function(cityData) {
                      return (
                        <div key={cityData.key}>
                          <view class="label-title title">{cityData.key}</view>
                          <view class="citylist">
                            {cityData['value'].map(function(i, index) {
                              return (
                                <div key={i}>
                                  <view
                                    class="city-line"
                                    onTap={this.cityTap}
                                    data-city={i.cityName}
                                    data-cityurl={i.cityUrl}
                                    data-index={index}
                                  >
                                    <text class="city-line-grid">{i.cityName}</text>
                                  </view>
                                </div>
                              );
                            })}
                          </view>
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>
            {this.state.isFail && <view class="city-fail">{this.state.failMessage}</view>}
          </div>
        )}
      </div>
    );
  }
}

export default CitySelector;

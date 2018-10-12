/**
 * 20181011 简化版本 直接调用娜娜奇的request
 *
 * requester.request({
 *      // 以下三个字段会拼接成 url
 *      host: "https://wxapp.qunar.com" // 'https://wxapp.qunar.com' 是默认值 等支付宝域名
 * 	    service: requester.service.SEARCH, // 接口名：'/train/product/h5/train/TrainDetail' 必须
 *      param: { // 请求参数，拼在 url 后面 可省略
 *          searchType: 'stasta',
 *          startStation: param.startStation,
 *          endStation: param.endStation,
 *          date: param.date
 *      },
 *
 *      data: {}, // 可省略
 *      header: {}, // 可省略
 *      method: 'POST', // 默认：'GET' 可省略
 *      dataType: 'json', // 默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse 可省略
 *      success: function() { }, // 可省略
 *      fail: function() { }, // 可省略
 *      complete: function() { }, // 可省略
 *      priority: Reque // 请求优先级 Number 默认：750(NORMAL) 可省略 数值越低，优先级越高
 *  });
 *
 * 注：c 参，默认会拼在 url 后面，如果需要放在其他地方，可通过 requester.getParamC() 获取 c 参，自行添加。
 *
 */

import Config from '../config/config.js';
import RequestManager from './requestManager.js';
function request(obj) {
    var service = obj.service;
    var param = obj.param || {};

    if (!service || !service.length) {
        // console.error('service 为空');
        return false;
    }

    var queryComponents = [];
    for (var key in param) {
        var value = param[key] || '';
        queryComponents.push(key + '=' + encodeURIComponent(value));
    }
    // todo config配置 暂时没有 先写个微信的beta,这个到时候在
    var url = (obj.host ? obj.host : Config.settings.requestDomain) + service + '?' + queryComponents.join('&');
    // console.log('url: ', url);

    // 处理某些业务线需要在header中传参数的情况
    var header = obj.header || {'Content-Type': 'application/json'};
    // if (Object.keys(h).length > 0) {
    //     header = Object.assign({}, header, h);
    // }
    // console.log('header', JSON.stringify(header));
    var req = {
        url: url,
        data: obj.data,
        header: header,
        method: (obj.method && obj.method.toUpperCase()) || 'GET',
        dataType: obj.dataType || 'json',
        success: obj.success,
        fail: obj.fail,
        complete: obj.complete,
        priority: obj.priority
    };

    RequestManager.request(req);

    return true;
}

export default request;
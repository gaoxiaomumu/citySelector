import Requester from './requester/requester.js';
const emptyFunc = () => {};
// const globalData = React.getApp().globalData;

function request(obj) {
    const originalSuccessCb = obj.success || emptyFunc;
    const originalFailCb = obj.fail || emptyFunc;
    const originalCompleteCb = obj.complete || emptyFunc;
    // const startTime = new Date().getTime();
    obj.header || (obj.header = {});

    // todo cookie处理

    // 封装回调函数
    // eslint-disable-next-line
    const finalFailCb = (res, isNetworkError = true) => {
        originalFailCb(res);
        // todo 日志记录
        // const name = (`curl_${obj.service}_${globalData.BETA ? 'BETA_' : 'PROD_'}${isNetworkError ? 'Network_Error' : 'Service_Error'}`).toLowerCase();

        // let queryParam = obj.data;
        // try {
        //     if (typeof queryParam === 'object') {
        //         queryParam = JSON.stringify(queryParam);
        //     }
        // } catch (err) {
        //     // 什么都不做
        // }
        // const message = isNetworkError ? `Query: ${queryParam}, NetworkError:${JSON.stringify(res)}` : `Query: ${queryParam}, Response: ${JSON.stringify(res)}`;
        // Tracker.notify(name, message);
        // Tracker.sendToWatcherCount(name);
    };

    // 忽略Status直接执行success，否则不为0时走fail
    const finalSuccessCb = (res) => {
        const { data } = res;
        // ignoreStatus
        if (obj.ignoreStatus) {
            originalSuccessCb(data);
        } else {
            if (data.status === 0 || data.errcode === 0) {
                originalSuccessCb(data);
            } else {
                finalFailCb(data, false);
            }
        }
    };

    const finalCompleteCb = () => {
        originalCompleteCb();
        // todo complete回调记录
        // const endTime = new Date().getTime();
        // const key = `curl_${obj.service}`;
        // Tracker.sendToWatcherTime(key, endTime - startTime);
    };

    obj.success = finalSuccessCb;
    obj.fail = finalFailCb;
    obj.complete = finalCompleteCb;

    // todo 可能涉及是否授权或者登陆的请求中间逻辑，暂时忽略，直接请求
    console.log(111)
    Requester(obj);
}

export default request;
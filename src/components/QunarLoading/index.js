import React from '@react';
import PropTypes from 'prop-types';
import './index.scss';
class QunarLoading extends React.Component {
  constructor() {
    super();
    this.state = {
      width: '100%',
      height: 'auto',
      top: 0,
      bottom: 0,
      status: 4,
      loadingDesc: '努力加载中',
      showButton: true,
      networkRetry: 'networkRetry',
      // showNetwork: true,
      zIndex: '',
      loadingDescColor: '#00BCD4'
    };
  }

  static propTypes = {
    networkData: PropTypes.object,
    networkRetry: PropTypes.func
  };

  componentDidMount() {
    /* eslint-disable */
    console.log('Loading!');
    const { networkData } = this.props;

    if (networkData.status == 1 || networkData.status == 2) {
      React.api.showToast({
        title: networkData.loadingDesc || '加载中...',
        icon: 'loading',
        duration: 5000
      });
    }
  }

  retry() {
    this.props.networkRetry();
  }

  render() {
    return (
      <div style="z-index: 100">
        {this.props.networkData.status === -3 && (
          <div class="network-toast-container" catchTouchMove={this.__ttt_touch}>
            <div class="network-margin-container">
              <div class="network-toast-text">
                {this.props.networkData.loadingDesc
                  ? this.props.networkData.loadingDesc
                  : '未知错误'}
              </div>
            </div>
          </div>
        )}
        {this.props.networkData.status == 1 && (
          <div class="network" style={{ top: this.state.top, bottom: this.state.bottom }} />
        )}
        {this.props.networkData.status == 2 && (
          <div
            class="network-transparent"
            style={{ top: this.state.top, bottom: this.state.bottom }}
          />
        )}

        {this.props.networkData.status == 3 && (
          <div
            class="network-transparent"
            style={{ top: this.state.top, bottom: this.state.bottom }}
          >
            <div class="loading-mask-c" />
            <div class="loading-style-c">
              <div class="g-q-iconfont loading-icon-c" />
              <text class="loading-text-c">
                {this.props.networkData.loadingDesc
                  ? this.props.networkData.loadingDesc
                  : '加载中...'}
              </text>
              <div class="loading-point-container">
                <div class="loading-point loading-point-1" />
                <div class="loading-point loading-point-2" />
                <div class="loading-point loading-point-3" />
              </div>
            </div>
          </div>
        )}
        {this.props.networkData.status == 4 && (
          <div
            class="qunar-network"
            style={{ top: this.state.top, bottom: this.state.bottom, height: this.state.height }}
          >
            <div class="q-net-wrap">
              <image class="qunar-loading-camle loading-camel-gif" />
              <image src="../../assets/images/qunar_loading_bg.png" class="qunar-loading-bg" />
              <div class="qunar-loading-mask">
                <text class="qunar-loading-text">
                  {this.props.networkData.loadingDesc
                    ? this.props.networkData.loadingDesc
                    : '加载中...'}
                </text>
              </div>
            </div>
          </div>
        )}
        {this.props.networkData.status == -1 && (
          <div
            class="network"
            style={{
              top: this.state.top,
              bottom: this.state.bottom,
              height: this.state.height,
              zIndex: this.state.zIndex
            }}
          >
            <image class="error-image" src="../../assets/images/network_failed.png" />
            <view class="error-text" style="color:{{loadingDescColor}}">
              {this.props.networkData.loadingDesc
                ? this.props.networkData.loadingDesc
                : '网络连接失败'}
            </view>
            {this.props.networkData.showButton && (
              <button class="error-button" hover-class="error-button-hover" onTap={this.retry.bind(this)}>
                点击重试
              </button>
            )}
          </div>
        )}
        {this.props.networkData.status == -2 && (
          <div
            class="network"
            style={{
              top: this.state.top,
              bottom: this.state.bottom,
              height: this.state.height
            }}
          >
            <image class="error-image" src="../../assets/images/network_failed.png" />
            <view class="error-text" style="color:{{loadingDescColor}}">
              {this.props.networkData.loadingDesc
                ? this.props.networkData.loadingDesc
                : '没有符合条件的搜索结果'}
            </view>
            {this.props.networkData.showButton && (
              <button class="error-button" hover-class="error-button-hover" onTap={this.retry.bind(this)}>
                点击重试
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

QunarLoading.defaultProps = {
  networkData: {
    status: 4, // { -2:'没有符合条件的搜索结果', -1:'网络连接失败', 0:success,
    //   1:'toast white', 2:'toast transparent', 3:''qunar加载中mini', 4:'qunar加载中' }
    loadingDesc: '加载中...', // loading描述(可选)
    showButton: true // 显示重新加载 button
  }
};

export default QunarLoading;

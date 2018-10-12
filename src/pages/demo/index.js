import React from '@react';

// 事件
class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      activeCity: 'domestic',
      data: [1,1,1,1,1,1]
    };
  }

  // 如何隐藏这个loading
  componentDidMount() {
    /* eslint-disable */
    console.log('props', this.props);
  }

  changeCityToDomestic() {
    let self = this;
    this.setState({
			activeCity: 'domestic'
		}, function() {
      self.readCity()
    });
  }

  changeCityToOverseas() {
    let self = this;
    this.setState({
			activeCity: 'overseas'
		},function() {
      self.readCity()
    });
  }

  readCity() {
    if(this.state.activeCity === 'overseas') {
      this.setState({
        data: [2,2,2,2,2,2]
      })
    } else {
      this.setState({
        data: [1,1,1,1,1,1]
      })
    }
  }

  render() {
    return (
      <div class="container">
        <div class="cityTab">
          <view
            class={'domestic ' + (this.state.activeCity === 'domestic' ? 'cityActive' : '')}
            onTap={this.changeCityToDomestic.bind(this)}
          >
            国内城市
          </view>
          <view
            class={'overseas ' + (this.state.activeCity === 'overseas' ? 'cityActive' : '')}
            onTap={this.changeCityToOverseas.bind(this)}
          >
            海外城市
          </view>
        </div>
        <div class="city-wrapper">
          {
            this.state.data.map(function(item, index) {
              return (
                <div key={index}>{item}</div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
export default Data;

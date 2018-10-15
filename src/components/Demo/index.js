import React from '@react';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      activeCity: 'domestic',
      inputValue: ''
    };
  }

  // 如何隐藏这个loading
  componentDidMount() {
    /* eslint-disable */
    console.log('state', this.state);
    debugger
    this.setState({
      value: '12'
     })
     console.log('state', this.state);
    debugger
  }

  changeCityToDomestic() {
    let self = this;
    this.setState(
      {
        activeCity: 'domestic'
      },
      function() {
        self.readCity();
      }
    );
  }

  changeCityToOverseas() {
    let self = this;
    this.setState(
      {
        activeCity: 'overseas'
      },
      function() {
        self.readCity();
      }
    );
  }

  readCity() {
    if (this.state.activeCity === 'overseas') {
      this.setState({
        data: [2, 2, 2, 2, 2, 2]
      });
    } else {
      this.setState({
        data: [1, 1, 1, 1, 1, 1]
      });
    }
  }
  bindKeyInput(e) {
    let self = this;
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
    }
  }

  render() {
    return (
      <div>
        <input
          class="input-city"
          value={this.state.inputValue}
          placeholder-style="color:#b2b2b2;"
          onInput={this.bindKeyInput.bind(this)}
        />
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
        </div>
      </div>
    );
  }
}

export default Demo;

import React from '@react';
import CitySelector from '@components/CitySelector/index';
// 事件
class Data extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  // 如何隐藏这个loading
  componentDidMount() {
    /* eslint-disable */
    console.log('props', this.props);
  }

  render() {
    return (
      <div class="container">
        <CitySelector param={this.props.query.data} />
      </div>
    );
  }
}
export default Data;

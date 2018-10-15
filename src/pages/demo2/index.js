import React from '@react';
import Demo from '@components/Demo/index';
// 事件
class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      city: 'city',
      data: [1, 2, 3, 4, 5, 6]
    };
  }

  // 如何隐藏这个loading
  componentDidMount() {
    /* eslint-disable */
    console.log('props', this.props);
  }

  

  render() {
    return (
      <div>
        <Demo />
      </div>
    );
  }
}
export default Data;

import React, { Component } from 'react';
import { Button } from 'antd';
import './App.less';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">确定</Button>
        <p className="test">测试</p>
      </div>
    );
  }
}

export default App;

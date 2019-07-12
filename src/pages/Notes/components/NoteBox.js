import React from 'react';
import { Input } from 'antd';

export default (props) => {
  return (<div className="note-box-wrapper">
    <div className="title-input">
      <Input
        placeholder="Input your title here..."
        onChange={(e) => props.onChangeTitle(e.target.value)}
      />
    </div>
    <div className="content-input">
      
    </div>
    <div className="operation"></div>
  </div>);
};
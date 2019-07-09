import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './index.less';
const process = window.require('process');
const { BrowserWindow } = window.require('electron').remote;
const win = BrowserWindow.getFocusedWindow();

const { Content, Sider } = Layout;
const { Item: MenuItem } = Menu;

export default (props) => {
  return (<Layout className="layout-wrapper">
    <Sider
      collapsible
      collapsed
      collapsedWidth="75"
      trigger={null}
      style={{
        backgroundColor: '#3a3a3a',
        overflow: 'hidden'
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['0']}
        className="menu"
      >
        <MenuItem key="0">
          <Icon type="book" />
          <span>notes | 笔记</span>
        </MenuItem>
        <MenuItem key="1">
          <Icon type="profile" />
          <span>tasks | 任务</span>
        </MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <div className="header">
        {process.platform === 'win32' ? <div>
            <Icon type="close" className="close-button" onClick={() => win.close()} />
            <Icon
              type={win.isMaximized() ? 'fullscreen-exit' : 'fullscreen'}
              className="titlebar-button"
              onClick={() => {
                if (win.isMaximized()) {
                  win.unmaximize();
                } else {
                  win.maximize();
                }
              }}
            />
            <Icon type="minus" className="titlebar-button" onClick={() => win.minimize()} />
          </div> : <p className="title">
            Person
          </p>}
      </div>
      <Content>{props.children}</Content>
    </Layout>
  </Layout>);
}

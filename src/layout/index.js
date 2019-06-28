import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './index.less';

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
                <Icon type="close" className="close-button" />
                <Icon type="fullscreen" className="titlebar-button" />
                <Icon type="minus" className="titlebar-button" />
            </div>
            <Content>{props.children}</Content>
        </Layout>
    </Layout>);
}

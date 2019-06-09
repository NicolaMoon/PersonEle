import React, { useState } from 'react';
import { Layout, Icon } from 'antd';
import { TransitionMotion, spring } from 'react-motion';
import './index.less';

const { Content } = Layout;

// const electron = window.require('electron');
// const { remote: { BrowserWindow } } = electron;
// const thisWindow = BrowserWindow.getFocusedWindow()

export default (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const willEnter = (styleThatEnter) => {
        return { scale: 0 }
    }
    
    const willLeave = (styleThatLeft) => {
        return { scale: spring(0) }
    }
    return (
        <Layout className="layout-wrapper">
            <div className="menu-wrapper">
                {
                    showMenu ?
                    <Icon type="close" className="menu" onClick={() => setShowMenu(false)}/> :
                    <Icon type="menu" className="menu" onClick={() => setShowMenu(true)}/>
                }
            </div>
            <TransitionMotion
                styles={showMenu ? [{ key: 'show', style: { scale: spring(1) } }] : []}
                willEnter={willEnter}
                willLeave={willLeave}
            >
                {styles => styles[0] ? (<div
                    className="menu-detail"
                    key={styles[0].key}
                    style={{
                        transform: `scale(${styles[0].style.scale}, ${styles[0].style.scale})`
                    }}
                >
                    <Icon type="stop" className="stop-btn" />
                    <Icon type="minus-circle" className="minus-btn" />
                    <Icon type="setting" className="setting-btn" />
                </div>) : null}
            </TransitionMotion>
            <Content>
                {props.children}
            </Content>
        </Layout>
    );
}

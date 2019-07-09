import React, { useState } from 'react';
import { Layout, Tree, Icon, Tabs } from 'antd';
import './index.less';

const { Sider, Content } = Layout;
const { TreeNode, DirectoryTree } = Tree;
const { TabPane } = Tabs;

export default (props) => {
    const [panes, setPanes] = useState([]);
    const [activeKey, setActiveKey] = useState('1');

    function add() {
        let max = 0;
        panes.forEach(({ key: val }) => {
            val = parseInt(val);
            max = max > val ? max : val;
        });
        const newPane = {
            title: `undefined${max + 1}`,
            content: '',
            key: `${max + 1}`,
        };
        setPanes(panes.concat(newPane));
    }

    function remove(targetKey) {
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setPanes(newPanes);
        setActiveKey(newActiveKey);
    }

    function handleEdit(targetKey, action) {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    }

    function handleChange(targetKey) {
        setActiveKey(targetKey);
    }

    return (<Layout className="notes-wrapper">
        <Sider
            theme="light"
            style={{
                backgroundColor: '#2a2a2b'
            }}
        >
            <div className="notes-header">
                <a className="link-button"><Icon type="delete" /></a>
                <a className="link-button"><Icon type="reload" /></a>
                <a className="link-button"><Icon type="folder-add" /></a>
                <a className="link-button"><Icon type="file-add" /></a>
            </div>
            <DirectoryTree multiple defaultExpandAll className="dir-tree">
                <TreeNode title="parent 0" key="0-0">
                    <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
                    <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
                </TreeNode>
                <TreeNode title="parent 1" key="0-1">
                    <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                    <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
                </TreeNode>
            </DirectoryTree>
        </Sider>
        <Content className="content-box">
            <Tabs
                onChange={handleChange}
                activeKey={activeKey}
                type="editable-card"
                onEdit={handleEdit}
            >
                {panes.map(pane => (
                    <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                        {pane.content}
                    </TabPane>
                ))}
            </Tabs>
        </Content>
    </Layout>);
};

import React, { useState } from 'react';
import { Layout, Tree, PageHeader, Button, Icon, Tabs } from 'antd';
import './index.less';

const { Sider, Content } = Layout;
const { TreeNode, DirectoryTree } = Tree;
const { TabPane } = Tabs;

export default (props) => {
    const [panes, setPanes] = useState([]);
    const [activeKey, setActiveKey] = useState('0');

    function add() {
        let max = -1;
        panes.forEach(({ key: val }) => {
            val = parseInt(val);
            max = max > val ? max : val;
        });
        const newPane = {
            title: 'undefined',
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
        <Sider theme="light">
            <PageHeader
                title={
                    <div>
                        <Button size="small" className="small-margin-lr"><Icon type="file-add" /></Button>
                        <Button size="small" className="small-margin-lr"><Icon type="folder-add" /></Button>
                    </div>
                }
                backIcon={false}
                extra={[
                    <Button size="small" type="danger" key="0"><Icon type="delete" /></Button>
                ]}
                className="notes-header"
            />
            <DirectoryTree multiple defaultExpandAll>
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
        <Content>
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

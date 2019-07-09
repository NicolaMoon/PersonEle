import React, { useState, useEffect } from 'react';
import { Layout, Tree, Icon, Tabs } from 'antd';
import { Logo } from '../../assets';
import './index.less';

const { Sider, Content } = Layout;
const { TreeNode, DirectoryTree } = Tree;
const { TabPane } = Tabs;

export default (props) => {
  const [panes, setPanes] = useState([]);
  const [activeKey, setActiveKey] = useState('1');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    setFileList([
      {
        id: 0,
        children: [1, 2],
      },
      {
        id: 1,
        title: '目录一',
        isLeaf: false,
        children: [3, 4],
      },
      {
        id: 2,
        title: '目录二',
        isLeaf: false,
        children: [5],
      },
      {
        id: 3,
        title: '笔记一',
        isLeaf: true,
      },
      {
        id: 4,
        title: '笔记二',
        isLeaf: true,
      },
      {
        id: 5,
        title: '笔记三',
        isLeaf: true,
      },
    ]);
  }, []);

  const renderTreeNode = (children) => {
    return children.map((id) => {
      const item = fileList.filter(val => val.id === id)[0];
      console.log(item);
      return (<TreeNode key={item.id} title={item.title} isLeaf={item.isLeaf}>
        {item.children && renderTreeNode(item.children)}
      </TreeNode>);
    });
  }

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

  function handleDrop(info) {
    const dragNodeKey = parseInt(info.dragNode.props.eventKey);
    const brotherNodeKey = parseInt(info.node.props.eventKey);
    const preParentNode = fileList.filter(({ children = [] }) => children.includes(dragNodeKey))[0];
    const parentNode = fileList.filter(({ children = [] }) => children.includes(brotherNodeKey))[0];
    preParentNode.children = preParentNode.children.filter(id => id !== dragNodeKey);
    parentNode.children.push(dragNodeKey);
    const newFileList = fileList.filter(({ id }) => id !== preParentNode.id && id !== parentNode.id);
    newFileList.push(preParentNode);
    newFileList.push(parentNode);
    setFileList(newFileList);
    console.log(newFileList);
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
      <DirectoryTree draggable blockNode multiple defaultExpandAll className="dir-tree" onDrop={info => handleDrop(info)}>
        {fileList[0] && renderTreeNode(fileList.filter(({ id }) => id === 0)[0].children)}
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
      {!panes.length && <div className="welcome">
        <img src={Logo} />
      </div>}
    </Content>
  </Layout>);
};

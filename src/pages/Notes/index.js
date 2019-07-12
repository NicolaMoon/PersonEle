import React, { useState, useEffect } from 'react';
import { Layout, Tree, Icon, Tabs } from 'antd';
import _ from 'lodash';
import NoteBox from './components/NoteBox';
import { Logo } from '../../assets';
import './index.less';

const { ipcRenderer } = window.require('electron');

const { Sider, Content } = Layout;
const { TreeNode, DirectoryTree } = Tree;
const { TabPane } = Tabs;

export default (props) => {
  const [panes, setPanes] = useState([]);
  const [activeKey, setActiveKey] = useState('1');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    ipcRenderer.send('get-notes-list');
    ipcRenderer.once('get-notes-list-reply', (event, arg) => {
      console.log(arg);
    });
    setFileList([
      {
        id: 0,
        children: [1, 2],
      },
      {
        id: 1,
        title: 'dir1',
        isLeaf: false,
        children: [3, 4],
      },
      {
        id: 2,
        title: 'dir2',
        isLeaf: false,
        children: [5],
      },
      {
        id: 3,
        title: 'note1',
        isLeaf: true,
      },
      {
        id: 4,
        title: 'note2',
        isLeaf: true,
      },
      {
        id: 5,
        title: 'note3',
        isLeaf: true,
      },
    ]);
  }, []);

  const renderTreeNode = (children) => {
    return children.map((id) => {
      const item = fileList.filter(val => val.id === id)[0];
      return (<TreeNode key={item.id} title={item.title} isLeaf={item.isLeaf}>
        {item.children && renderTreeNode(item.children)}
      </TreeNode>);
    });
  }

  function addTab() {
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

  function removeTab(targetKey) {
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

  function handleEditTabs(targetKey, action) {
    if (action === 'add') {
      addTab();
    } else {
      removeTab(targetKey);
    }
  }

  function handleChangeTabs(targetKey) {
    setActiveKey(targetKey);
  }

  function handleChangeTitle(index, title) {
    const newPanes = _.cloneDeep(panes);
    newPanes[index].title = title ? title : `undefined${newPanes[index].key}`;
    setPanes(newPanes);
  }

  function handleDrop(info) {
    const dragNodeKey = parseInt(info.dragNode.props.eventKey);
    const dropNodeKey = parseInt(info.node.props.eventKey);
    const preParentNode = fileList.filter(({ children = [] }) => children.includes(dragNodeKey))[0];
    preParentNode.children = preParentNode.children.filter(id => id !== dragNodeKey);
    let parentNode = fileList.filter(({ id }) => id === dropNodeKey)[0];
    if (info.dropToGap || parentNode.isLeaf) {
      parentNode = fileList.filter(({ children = [] }) => children.includes(dropNodeKey))[0];
    }
    parentNode.children.push(dragNodeKey);
    parentNode.children.sort();
    const newFileList = fileList.filter(({ id }) => id !== preParentNode.id && id !== parentNode.id);
    newFileList.push(preParentNode);
    newFileList.push(parentNode);
    setFileList(newFileList);
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
      <DirectoryTree
        draggable
        blockNode
        multiple
        defaultExpandAll
        className="dir-tree"
        onDrop={info => handleDrop(info)}
      >
        {fileList[0] && renderTreeNode(fileList.filter(({ id }) => id === 0)[0].children)}
      </DirectoryTree>
    </Sider>
    <Content className="content-box">
      <Tabs
        onChange={handleChangeTabs}
        activeKey={activeKey}
        type="editable-card"
        onEdit={handleEditTabs}
      >
        {panes.map((pane, index) => (
          <TabPane tab={<p className="tab-title">{pane.title}</p>} key={pane.key}>
            <NoteBox onChangeTitle={(title) => handleChangeTitle(index, title)} />
          </TabPane>
        ))}
      </Tabs>
      {!panes.length && <div className="welcome">
        <img src={Logo} />
      </div>}
    </Content>
  </Layout>);
};

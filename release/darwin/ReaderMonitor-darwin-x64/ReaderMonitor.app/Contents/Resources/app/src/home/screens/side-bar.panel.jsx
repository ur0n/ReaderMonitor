import React from 'react';
import { Menu } from 'element-react';

const SideBar = () => {
  return (
    <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
      <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>Navigator One</span>}>
        <Menu.ItemGroup title="Group One">
          <Menu.Item index="1-1">Option 1</Menu.Item>
          <Menu.Item index="1-2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Group Two">
          <Menu.Item index="1-3">Option 3</Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.Item index="2"><i className="el-icon-menu"></i>Navigator Two</Menu.Item>
      <Menu.Item index="3"><i className="el-icon-setting"></i>Navigator Three</Menu.Item>
    </Menu>
  );
}

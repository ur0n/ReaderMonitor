import React, { Component } from 'react';
import { Menu } from 'element-react';

const styles = {
  sidebar: {
    flex: 1,
    alignSelf: 'stretch'
  }
}

class SideBarComponent extends Component {
  constructor(props){
    super(props);
  }

  onOpen(){

  }
  onClose(){

  }

  render(){
    return (
      <div style={styles.sidebar}>
        <Menu
          style={{height: '100%'}}
          defaultActive="2"
          onOpen={this.onOpen.bind(this)}
          onClose={this.onClose.bind(this)}
        >
          <Menu.Item index="2">
            <i className="el-icon-menu" />
            Navigator Two
          </Menu.Item>
          <Menu.Item index="3">
            <i className="el-icon-setting" />
            Navigator Three
          </Menu.Item>

        </Menu>
      </div>
    );
  }
}

export const SideBar = SideBarComponent;

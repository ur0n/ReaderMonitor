import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'element-react';
import { Link, withRouter } from 'react-router-dom';
import { colors } from '../../config';

const styles = {
  sidebar: {
    flexDirection: 'column',
    display: 'flex',
    minWidth: '200px',
    height: '100%'
  },
  menu: {
    flex: 1,
    height: '100%',
  }
}

const mapStateToProps = state => {
  return {
    home: state.home,
    side: state.side
  };
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: '1',
    }
  }

  onOpen(event){
    console.log(event);
  }
  onClose(){

  }

  onSelect(index){
    this.setState({active: index})
  }

  onClick(event){
    console.log(event);
  }

  homeOpen(){
    if(this.props.location.pathname !== '/'){
      this.props.history.push('/');
    }
  }

  antennaSelect(id){
    if(this.props.location.pathname !== `/antenna/${id}`){
      this.props.history.push(`/antenna/${id}`);
    }
  }

  render(){
    const { antennaList, isLoding, isFetched } = this.props.home;
    return (
      <div style={styles.sidebar}>
        <Menu
          style={styles.menu}
          defaultActive={this.state.active}
          onOpen={this.onOpen.bind(this)}
          onClose={this.onClose.bind(this)}
          onSelect={this.onSelect.bind(this)}
        >
          <Menu.Item index="1" style={{height: '10%', minHeight: '55px'}}>
            <div onClick={this.homeOpen.bind(this)}>
              <i className="el-icon-menu" />
              Home
            </div>
          </Menu.Item>
          <Menu.ItemGroup title="AntennaList" style={{height: '90%'}}>
            <div style={{height: '100%', overflow: 'scroll'}}>
              {isFetched && !isLoding && (
                Object.keys(antennaList).reduce((p ,host, i) => {
                  const antennaItems = antennaList[host].map((antenna, j)=> {
                    return (
                      <Menu.Item key={antenna.id} index={`${((Object.keys(antennaList).length * i) + (j + i)) + 2}`}>
                        <div onClick={() => this.antennaSelect(antenna.id) }>
                          {antenna.status && (
                            <i style={{color: colors.success}} className="el-icon-circle-check" />
                          )}
                          {!antenna.status && (
                            <i style={{color: colors.danger}} className="el-icon-circle-close" />
                          )}
                          { antenna.id }
                        </div>
                      </Menu.Item>
                    )
                  })
                  return [...p, ...antennaItems];
                }, [])
              )}
            </div>
          </Menu.ItemGroup>
        </Menu>
      </div>
    );
  }
}

export const SideBarScreen = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar));

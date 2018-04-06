import React, { Component } from 'react';
import { Header, SideBar, ColumnContainer, RowContainer } from './components';
import MonitorRouter from './router';
import 'element-theme-chalk';

const styles = {
  app: {
    height: '100%'
  },
  body: {
    width: '100%',
    height: '100%'
  }
}

class App extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <ColumnContainer style={styles.app}>
        <Header title="ReaderMonitor"/>
        <MonitorRouter />
      </ColumnContainer>
    );
  }
}

export default App;

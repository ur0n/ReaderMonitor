import React, { Component } from 'react';
import { Header, ColumnContainer } from './components';
import Router from './router';
import 'element-theme-chalk';

const styles = {
  app: {
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
        <Router />
      </ColumnContainer>
    );
  }
}

export default App;

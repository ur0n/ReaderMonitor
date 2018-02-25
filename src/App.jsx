import React, { Component } from 'react';
import { Header, ColumnContainer } from './components';
import Router from './router';
import 'element-theme-chalk';

class App extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <ColumnContainer>
        <Header title="Hello"/>
        <Router />
      </ColumnContainer>
    );
  }
}

export default App;

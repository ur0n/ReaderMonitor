import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, SideBar, ColumnContainer, RowContainer, RFIDIcon } from './components';
import MonitorRouter from './router';
import { colors, icons } from './config';
import 'element-theme-chalk';

const styles = StyleSheet.create({
  app: {
    height: '100%'
  },
  body: {
    width: '100%',
    height: '100%'
  },
  header: {
    // backgroundColor: colors.lightBlue,
    minHeight: '45px',
    maxHeight: '45px'
  },
  headerTitle: {
    fontSize: '20px',
    letterSpacing: '0.1em',
    color: colors.lightBlue
  }
})

class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ColumnContainer style={styles.app}>
        <MonitorRouter />
      </ColumnContainer>
    );
  }
}

export default App;

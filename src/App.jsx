import React, { Component } from 'react';
import { Header, SideBar, ColumnContainer, RowContainer, RFIDIcon } from './components';
import MonitorRouter from './router';
import { colors, icons } from './config';
import 'element-theme-chalk';

const styles = {
  app: {
    height: '100%'
  },
  body: {
    width: '100%',
    height: '100%'
  },
  header: {
    // backgroundColor: colors.lightBlue,
  },
  headerTitle: {
    fontSize: '20px',
    letterSpacing: '0.1em',
    color: colors.lightBlue
  }
}

class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ColumnContainer style={styles.app}>
        <Header
          style={styles.header}
          title="ReaderMonitor"
          titleStyle={styles.headerTitle}
          />
        <MonitorRouter />
      </ColumnContainer>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Log, SideBar, RowContainer } from './components';
import { HashRouter, Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import { AntennaListScreen } from './home';
import { SideBarScreen } from './side';
import { LogViewScreen } from './log';
import { GraphListScreen } from './graph';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
    minWidth: '280px',
    backgroundColor: 'rgb(238, 238, 238)'
  },
  body: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }
});

class MonitorRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    window.location.hash = '#'
  }

  render() {
    return (
      <HashRouter>
        <RowContainer style={styles.body}>
          <SideBarScreen />
          <div className={css(styles.root)}>
            <Switch>
              <Route exact path="/" component={AntennaListScreen} />
              <Route path="/antenna/graph/:id" component={GraphListScreen} />
              <Route path="/antenna/:id" component={LogViewScreen} />
            </Switch>
          </div>
        </RowContainer>
      </HashRouter>
    );
  }
}


const NoMatch = () => {
  return (
    <div>
      NoMatch
    </div>
  );
}

export default MonitorRouter;

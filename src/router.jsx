import React, { Component } from 'react';
import { Log, SideBar, BodyContainer, RowContainer } from './components';
import { HashRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { AntennaListScreen } from './home';
import { SideBarScreen } from './side';
import { LogViewScreen } from './log';

const styles = {
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
    minWidth: '280px',
  },
  body: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }
}

const NoMatch = () => {
  return (
    <div>
      NoMatch
    </div>
  );
}

class Layout extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.history.push("/");
  }

  render(){
    return (
      <div style={styles.root}>
        <Switch>
          <Route exact path="/" component={AntennaListScreen} />
          <Route exact path="/antenna/:id" component={LogViewScreen} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

const MonitorRouter = () => {
  return (
    <HashRouter>
      <RowContainer style={styles.body}>
        <SideBarScreen />
        <Route path="/" component={withRouter(Layout)} />
      </RowContainer>
    </HashRouter>
  );
}

export default MonitorRouter;

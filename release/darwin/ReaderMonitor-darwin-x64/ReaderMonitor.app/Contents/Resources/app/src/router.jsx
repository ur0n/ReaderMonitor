import React, { Component } from 'react';
import { Log, SideBar, BodyContainer } from './components';
import { HashRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    height: '100%',
    width: '100%'
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
          <Route exact path="/" component={BodyContainer} />
          <Route exact path="/reader/:id" component={Log} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

const MonitorRouter = () => {
  return (
    <HashRouter>
      <Route path="/" component={withRouter(Layout)} />
    </HashRouter>
  );
}

export default MonitorRouter;

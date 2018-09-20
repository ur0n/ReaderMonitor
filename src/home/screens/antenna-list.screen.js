import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, Layout, Button, Tag } from 'element-react';
import { StyleSheet, css } from 'aphrodite';

import { ColumnContainer } from '../../components';
import { Antenna } from './Antenna';
import { Err } from './Err';

import { colors } from '../../config';
import {
  getAntennaListFromMonitorServer,
  antennaHealthCheck,
  antennaHealthCallChangeStatus,
  antennaHealthCallErr
} from '../home.action';

const styles = StyleSheet.create({
  body: {
    flex: 9,
    backgroundColor: colors.blueWhite,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    overflow: 'scroll',
  },
  row: {
    margin: '50px 0',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    home: state.home,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAntennaList: client => dispatch(getAntennaListFromMonitorServer(client)),
    antennaHealthChange: message => dispatch(antennaHealthCheck(message))
  }
}

class AntennaList extends Component {
  constructor(props){
    super(props);
    this.state = {
      antennaList: [],
    }
  }

  connect(){
    const { client } = this.props.home;
    this.props.getAntennaList(client);
    this.onAntennaHealthChange();
  }

  componentDidMount(){
    this.connect();
  }

  onAntennaHealthChange(){
    const { client } = this.props.home;
    const call = client.connection.antennaHealthCheck();

    call.on('data', message => {
      this.props.antennaHealthChange(message);
    })

    call.on('status', status => {
      // this.props.antennaHealthCallChangeStatus(status);
    });

    call.on('err', err => {
      // this.props.antennaHealthCallErr(err);
    })
  }

  handleAntennaClick(antenna) {
    this.props.history.push(`/antenna/graph/${antenna.id}`)
  }

  getAntennaMap(antennaList){
    return antennaList.reduce((p, id) => {
      const host = id.split(':')[0];
      const antenna = {id, status: true}
      if(host in p) {
        p[host].push(antenna);
      } else {
        p[host] = [antenna];
      }

      return p;
    }, {})
  }

  render(){
    const { antennaList, isFetched, isLoding, err } = this.props.home;
    return (
      <ColumnContainer style={styles.body}>
        {isFetched && !isLoding && (
          Object.keys(antennaList).map(host => {
            const list = antennaList[host].map(antenna => {
              return (
                <Antenna
                  key={antenna.id}
                  name={antenna.id}
                  status={antenna.status}
                  onClick={() => console.log("click", antenna.id)}
                  >
                </Antenna>
              )
            })

            return (
              <div key={host} className={css(styles.row)} >
                { list }
              </div>
            );
          })
        )}

        {!isFetched && !isLoding && (
          <div>
          </div>
        )}

        {!isFetched && isLoding && (
          <div>
          </div>
        )}

        {isFetched && !isLoding && err && (
          <Err err={err} handler={this.connect.bind(this)} />
        )}
      </ColumnContainer>
    );
  }
}

export const AntennaListScreen = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AntennaList));

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NVD3Chart from 'react-nvd3';
import { timeFormat } from 'd3-time-format';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

import { RowContainer, ColumnContainer, Header, RFIDReport } from '../../components';
import { getTagReport, cleanReportList } from '../graph.action';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    padding: '10px',
  },
  chartCard: {
    margin: '14px',
    padding: '25px 25px 0 0',
    borderRadius: '5px',
    boxShadow: '0 2px 5px #ccc',
    backgroundColor: '#fff'
  },
  pagenation: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    home: state.home,
    graph: state.graph
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getTagReport: (id, message) => dispatch(getTagReport(id, message)),
    cleanReportList: id => dispatch(cleanReportList(id)),
  }
}

class GraphTest extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
        {rssi: -45},
        {rssi: -42},
        {rssi: -44},
        {rssi: -44},
        {rssi: -45},
      ],
      graphs: {},
      isFirstFinish: false,
    }

    const now = new Date();
    const last = moment(now).add(100, 'm').toDate();
    this.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    this.endDate = new Date(last.getFullYear(), last.getMonth(), last.getDate(), last.getHours(), last.getMinutes(), last.getSeconds());
    this.millisecondsBetweenTicks = 5000;
    setInterval(this.ticks.bind(this), 1000);
  }

  ticks(){
    const { data } = this.state;
    if(data.length >= 50) data.shift();
    data.push({rssi: -45 + Math.floor(Math.random() * Math.floor(5))});
    this.setState({data});
  }

  componentWillMount() {
    this.id = this.props.match.params.id;
  }

  componentDidMount() {
  }

  // tagのデータをグラフ用に加工して返却するメソッド
  toDataum() {
    const { data } = this.state;
    return [{
      key: `id: 1`,
      area: false,
      color: 'slategray',
      values: data.map((tag, i) => createValue(tag.rssi, i))
    }];

    function createValue(y, i) {
      return {
        y,
        x: moment(new Date()).add(i, 's').toDate()
      }
    }
  }

  getX(d){
    return new Date(parseInt(d.time) / 1000);
  }

  getY(d){
    return d.rssi;
  }

  render(){
    const dataum = this.toDataum()
    return (
      <ColumnContainer style={styles.container}>
        <div
          className={css(styles.innerContainer)}
          ref={this.containerRef}
          >
          <div className={css(styles.content)}>
            <div className={css(styles.chartCard)}>
              <NVD3Chart
                type='lineChart'
                datum={dataum}
                width={300}
                height={300}
                x='x'
                y='y'
                xAxis={{
                  tickFormat: d => timeFormat('%X')(d),
                }}
                />
            </div>
          </div>
        </div>
      </ColumnContainer>
    )
  }
}

export const GraphTestScreen = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphTest));

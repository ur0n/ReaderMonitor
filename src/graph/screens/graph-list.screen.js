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

const createPM = (top, left, under, right) => {
  return {
    top,
    left,
    under,
    right
  };
}

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

class GraphList extends Component {
  constructor(props){
    super(props);
    this.state = {
      containerWidth: 0,
      containerHeight: 0,
      data: [],
      offset: 0,
      pageCount: 10,
      activePage: 0,
      isFirstFinish: false,
      graphLimitRow: 0,
      graphLimitColumn: 0,
      // yList: Array.from(Array(50), (v, k) => k).map(i => Math.floor(Math.random() * Math.floor(100))),
    }
    this.containerRef = React.createRef();
    this.graph = {
      height: 300,
      width: 300,
    };
    this.pagenation = {
      height: 54,
      width: 164,
    }
    this.contentPadding = createPM(10, 10, 10, 10);
    this.graphMargin = createPM(14, 14, 14, 14);
    this.graphPadding = createPM(25, 25, 0, 0);

    this.hOne = this.contentPadding.top +
    this.graphMargin.top +
    this.graphPadding.top +
    this.graph.height +
    this.graphPadding.under +
    this.graphMargin.under +
    this.contentPadding.under +
    this.pagenation.height;

    this.wOne = this.contentPadding.left +
    this.graphMargin.left +
    this.graphPadding.left +
    this.graph.width +
    this.graphPadding.right +
    this.graphMargin.right +
    this.contentPadding.right;

    const now = new Date();
    const last = moment(now).add(100, 'm').toDate();
    this.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    this.endDate = new Date(last.getFullYear(), last.getMonth(), last.getDate(), last.getHours(), last.getMinutes(), last.getSeconds());
    this.millisecondsBetweenTicks = 5000;
  }

  componentWillMount() {
    console.log(this.props);
    this.id = this.props.match.params.id;
  }

  // GRPCのイベントの設定
  startTagReporting(){
    const { client } = this.props.home;
    const call = client.connection.tagStream();

    this.dataListener = message => {
      const { graphLimitRow, graphLimitColumn, data } = this.state;
      const { tagIdList } = this.props.graph;
      const limit = graphLimitRow * graphLimitColumn;

      if(tagIdList.indexOf(message.id) === -1){
        const lastPage = data[data.length - 1];
        if(lastPage !== undefined && lastPage.length < limit){
          data[data.length - 1].push(message.id);
        }else {
          data.push([message.id]);
        }
        this.setState({
          data: data,
          pageCount: data.length,
        });
      }
      this.props.getTagReport(this.id, message);
    }

    call.on('data', this.dataListener);

    call.on('status', status => {
      console.log("============= This status log is call from grpc in GraphList ===============");
      console.log(status);
    });

    call.on('error', err => {
      console.log("============= This error log is call from grpc in GraphList ===============");
      console.log(err);
    })

    call.on('end', () => {
      console.log('END');
    })

    call.write({id: this.id});
    this.call = call;
  }

  componentDidMount() {
    this.handleContainerChange(this.containerRef);
    window.addEventListener('resize', this.handleResize.bind(this), false);
    this.startTagReporting();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state === nextState) return false;
    else return true
  }

  componentWillReceiveProps(nextProps) {
    // this.ticks();
  }

  componentWilUpdate() {
  }

  componentDidUpdate() {
  }

  // 画面がリサイズされた時
  handleResize(e) {
    this.handleContainerChange(this.containerRef)
  }

  // 画面がリサイズされた時に実行される関数の実態
  // 画面のグラフの表示個数の設定等をしている
  handleContainerChange(ref) {
    if(ref === null) return;

    const { clientWidth, clientHeight } = ref.current;
    const { containerWidth, containerHeight, isFirstFinish } = this.state;
    if(
      containerWidth !== 0 &&
      containerHeight !== 0 &&
      clientWidth === containerWidth &&
      clientHeight === containerHeight
     ) return;

    const graphLimitRow = Math.floor(clientHeight / this.hOne);
    const graphLimitColumn = Math.floor(clientWidth / this.wOne);

    if(isFirstFinish) {
      this.setState({
        graphLimitRow,
        graphLimitColumn,
        containerWidth: clientWidth,
        containerHeight: clientHeight,
      });
      this.devideDataForPaging();
      this.pageCountChange();
    } else {
      /* メモ
         普通に ref.current.clientHeight や　widthをすると一番初めはおかしい挙動をする。
         ので強制的にもう一度 domから値を取得するために以下のような実装が必要
      */

      const { outerHeight, outerWidth } = window;
      window.resizeTo(outerWidth -1, outerHeight -1);
      this.setState({
        isFirstFinish: true,
      });
      window.resizeTo(outerWidth, outerHeight);
    }
  }

  // ticks() {
  //   const { yList } = this.state;
  //   if(yList.length >= 50) yList.shift();
  //   yList.push(Math.floor(Math.random() * Math.floor(100)));
  //   this.setState({yList});
  // }

  pageCountChange() {
    const { data } = this.state;
    this.setState({
      pageCount: data.length,
    })
  }

  // ページングの為のグラフのインデックスを均等に分割する関数
  devideDataForPaging() {
    const { graphLimitRow, graphLimitColumn, data } = this.state;
    const limit = graphLimitRow * graphLimitColumn;

    if(limit !== 0) {
      this.setState({
        data: divide(flatten(data), limit)
      })
    }

    // arrをunitづつ分割する
    function divide(arr, unit){
      let result = [];
      for(let i = 0; i < arr.length; i+=unit) {
        result.push(arr.slice(i, i + unit));
      }
      return result
    }

    // 配列の配列を平坦化する
    function flatten(arr) {
      return arr.reduce((p, c) => {
        if(Array.isArray(c)) {
          return [
            ...p,
            ...c
          ]
        } else {
          return [
            ...p,
            c
          ]
        }
      }, [])
    }
  }

  // ページングを変更するメソッド
  handlePageChange(page) {
    this.setState({activePage: page.selected});
  }

  // graphのdataumを作成するメソッド
  createDataum(id) {
    console.log('create!');
    const { yList } = this.state;

    return [{
      key: `id: ${id}`,
      area: false,
      color: 'slategray',
      values: yList.map((y, i) => createValue(y, i))
    }];

    function createValue(y, i) {
      return {
        y,
        x: moment(new Date()).add(i, 's').toDate()
      }
    }
  }

  // tagのデータをグラフ用に加工して返却するメソッド
  toDataum(tags, id) {
    if(!tags) return
    console.log("====================");
    console.log("Tagsですよ", tags);
    console.log("====================");
    return [{
      key: `id: ${id}`,
      area: false,
      color: 'slategray',
      values: tags.map((tag, i) => createValue(tag.rssi, i))
    }];

    function createValue(y, i) {
      return {
        y,
        x: moment(new Date()).add(i, 's').toDate()
      }
    }
  }

  render(){
    const {
      graphLimitRow,
      graphLimitColumn,
      data,
      pageCount,
      activePage
    } = this.state;

    return (
      <ColumnContainer style={styles.container}>
        <div
          className={css(styles.innerContainer)}
          ref={this.containerRef}
          >
          <div className={css(styles.content)}>
            {data.length !== 0 && (
              data[activePage].map(i => {
                // const dataum = this.createDataum(i);
                console.log("====================");
                console.log("i: ", i);
                console.log("data", data);
                console.log("List", this.props.graph.tagReportList);
                console.log("tagReportList[i]: ", this.props.graph.tagReportList[i]);
                const t = this.toDataum(this.props.graph.tagReportList[i], i);
                // console.log("t: ", t);
                console.log("====================");
                return (
                  <div key={i} className={css(styles.chartCard)}>
                    <NVD3Chart
                      type='lineChart'
                      datum={t}
                      width={300}
                      height={300}
                      x='x'
                      y='y'
                      xAxis={{
                        tickFormat: d => timeFormat('%X')(d),
                      }}
                      />
                  </div>
                )
              }))
            }
          </div>
          <div className={css(styles.pagenation)}>
            <ReactPaginate previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={<a href="">...</a>}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageChange.bind(this)}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"} />
          </div>
        </div>
      </ColumnContainer>
    )
  }
}

export const GraphListScreen = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphList));

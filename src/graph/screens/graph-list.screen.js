import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NVD3Chart from 'react-nvd3';
import { timeFormat } from 'd3-time-format';
import * as d3 from 'd3';
import { Input, Button } from 'element-react';
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
  searchContainer: {
    flex: 1,
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
  },
  content: {
    flex: 6,
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
    flex: 1,
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
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
    getTagReport: message => dispatch(getTagReport(message)),
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
      searchValue: '',
      searchedData: [],
      pageCount: 10,
      searchPageCount: 10,
      activePage: 0,
      searchActivePage: 0,
      isFirstFinish: false,
      isSearch: false,
      graphLimitRow: 0,
      graphLimitColumn: 0,
    }
    this.containerRef = React.createRef();
    this.search = {
      height: 40,
    }
    this.graph = {
      height: 300,
      width: 300,
    };
    this.pagenation = {
      height: 54,
      width: 164,
    }
    this.searchMargin = createPM(10, 10, 10, 10);
    this.contentPadding = createPM(10, 10, 10, 10);
    this.graphMargin = createPM(14, 14, 14, 14);
    this.graphPadding = createPM(25, 25, 0, 0);

    this.hOne =
    this.searchMargin.top +
    this.search.height +
    this.searchMargin.under +
    this.contentPadding.top +
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
  }

  componentWillMount() {
    console.log(this.props);
  }

  // GRPCのイベントの設定
  startTagReporting(){
    const { client } = this.props.home;
    const call = client.connection.tagAllStream();

    const dataListener = message => {
      const { graphLimitRow, graphLimitColumn, data, graphs } = this.state;
      const { tagIdList } = this.props.graph;
      const limit = graphLimitRow * graphLimitColumn;
      const id = message.id

      if(tagIdList.indexOf(id) === -1){
        const lastPage = data[data.length - 1];
        if(lastPage !== undefined && lastPage.length < limit){
          data[data.length - 1].push(id);
        }else {
          data.push([id]);
        }
        this.setState({
          data: data,
          pageCount: data.length,
        });
      }

      this.props.getTagReport(message);
    }

    call.on('data', dataListener);

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

    // 暫定的にstatusは1として送っている
    call.write({status: 1});
    this.call = call;
  }

  componentDidMount() {
    this.handleContainerChange(this.containerRef);
    window.addEventListener('resize', this.handleResize.bind(this), false);
    this.startTagReporting();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(this.state === nextState) return false;
  //   else return true
  // }

  // 画面がリサイズされた時
  handleResize(e) {
    this.handleContainerChange(this.containerRef)
  }

  // 画面がリサイズされた時に実行される関数の実態
  // 画面のグラフの表示個数の設定等をしている
  handleContainerChange(ref) {
    if(ref === null || ref.current === null) return;
    console.log("ref", ref);

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
        data: this._divide(this._flatten(data), limit)
      })
    }
  }

  // ページングを変更するメソッド
  handlePageChange(page) {
    this.setState({activePage: page.selected});
  }

  // ページングを変更するメソッド 検索用
  handleSearchPageChange(page) {
    this.setState({searchActivePage: page.selected});
  }

  // tagのデータをグラフ用に加工して返却するメソッド
  toDataum(tags, id) {
    if(!tags) return
    return [{
      key: `id: ${id}`,
      area: false,
      color: 'slategray',
      values: tags
    }];
  }

  // 検索欄に文字が入力されるたびに呼ばれる
  handleSearchInputChange(value){
    const { data, searchedData, graphLimitRow, graphLimitColumn } = this.state;
    const limit = graphLimitRow * graphLimitColumn;

    if(value.length === 0){
      this.setState({isSearch: false})
    }

    let filtered;
    if(value.indexOf(',') !== -1){
      const splitted = value.split(', ');
      filtered = this._flatten(data).filter(id => splitted
        .filter(value => value.length !== 0)
        .filter(value => id.indexOf(value) === 0)
        .length !== 0
      )
    } else {
      filtered = this._flatten(data).filter(id => id.indexOf(value) === 0)
    }
    const divided = this._divide(filtered, limit);

    this.setState({
      isSearch: true,
      searchValue: value,
      searchedData: divided,
      searchPageCount: divided.length
    })
  }

  getX(d){
    return new Date(parseInt(d.time) / 1000);
  }

  getY(d){
    return d.rssi;
  }

  // arrをunitづつ分割する
  _divide(arr, unit){
    let result = [];
    for(let i = 0; i < arr.length; i+=unit) {
      result.push(arr.slice(i, i + unit));
    }
    return result
  }

  // 配列の配列を平坦化する
  _flatten(arr) {
    return arr.reduce((p, c) => {
      if(Array.isArray(c))return [...p, ...c];
      else return [...p, c];
    }, [])
  }

  render(){
    const {
      graphLimitRow,
      graphLimitColumn,
      data,
      searchedData,
      pageCount,
      searchPageCount,
      activePage,
      searchActivePage,
      searchValue,
      isSearch
    } = this.state;

    return (
      <ColumnContainer style={styles.container}>
        <div
          className={css(styles.innerContainer)}
          ref={this.containerRef}
          >
          <div className={css(styles.searchContainer)}>
            <Input
              value={searchValue}
              prepend={<Button type="primary" icon="search">Search</Button>}
              onChange={e => this.handleSearchInputChange(e)}
            />
          </div>
          <div className={css(styles.content)}>
            {isSearch && searchedData.length !== 0 && (
              searchedData[searchActivePage].map(i => {
                if(this.props.graph.tagReportList[i]){
                  const dataum = this.toDataum(this.props.graph.tagReportList[i], i);
                  return (
                    <div key={i} className={css(styles.chartCard)}>
                      <NVD3Chart
                        type='lineChart'
                        datum={dataum}
                        width={300}
                        height={300}
                        x={this.getX}
                        y={this.getY}
                        xAxis={{
                          tickFormat: d => timeFormat('%X')(d),
                        }}
                        yDomain={[-75, -40]}
                        />
                    </div>
                  )
                }
              }))
            }

            {!isSearch && data.length !== 0 && (
              data[activePage].map(i => {
                if(this.props.graph.tagReportList[i]){
                  const dataum = this.toDataum(this.props.graph.tagReportList[i], i);
                  return (
                    <div key={i} className={css(styles.chartCard)}>
                      <NVD3Chart
                        type='lineChart'
                        datum={dataum}
                        width={300}
                        height={300}
                        x={this.getX}
                        y={this.getY}
                        xAxis={{
                          tickFormat: d => timeFormat('%X')(d),
                        }}
                        yDomain={[-75, -40]}
                        />
                    </div>
                  )
                }
              }))
            }
          </div>

          <div className={css(styles.pagenation)}>
            {isSearch && (
              <ReactPaginate previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={this.state.searchPageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handleSearchPageChange.bind(this)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
            )}

            {!isSearch && (
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
            )}
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

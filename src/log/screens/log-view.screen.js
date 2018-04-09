import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Card } from 'element-react';

import { getTagReport, cleanReportList } from '../log.action';
import { RowContainer, ColumnContainer, Header, RFIDReport } from '../../components';
import { colors } from '../../config';

const styles = {
  logContainer: {
    width: '100%',
  },
  header: {
    flex: 0.5,
    minHeight: '40px'
  },
  contentContainer: {
    flex: 9.5,
    backgroundColor: colors.blueWhite,
    width: '100%'
  },
  cardBody: {
    padding: 0,
    height: '100%'
  },
  logView: {
    backgroundColor: colors.black,
    height: '80%',
    width: '80%'
  },
  logHeader: {
    flex: 0.7,
    backgroundColor: colors.black,
    borderColor: colors.lightBlack,
    minHeight: '40px',
  },
  logHeaderTitle: {
    color: colors.darkWhite,
    fontSize: 'small',
    fontFamiry: 'Helvetica Neue',
  },
  logContentContainer: {
    flex: 9,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scrollAbleContent: {
    overflow: 'scroll',
    width: '100%',
  },
  logText: {
    color: colors.darkWhite,
    fontSize: '13px',
    fontFamiry: 'Helvetica Neue',
    alignSelf: 'flex-start',
    margin: '5px 0 0 10px',
  },
}

const mapDispatchToProps = dispatch => {
  return {
    getTagReport: (id, message) => dispatch(getTagReport(id, message)),
    cleanReportList: id => dispatch(cleanReportList(id)),
  };
}

const mapStateToProps = state => {
  return {
    log: state.log,
    home: state.home
  };
}

class LogTailer extends Component {
  constructor(props){
    super(props);
  }

  scrollToBottom(){
    const { logContentContainer } = this.refs;
    ReactDOM.findDOMNode(logContentContainer).scrollTop = logContentContainer.scrollHeight;
  }

  start() {
    const self = this;
    this.intervalTimer = setInterval(() => {
      this.clean();
    }, 5000)
    console.log("TIMER START");
  }

  clean(){
    if(this.reportListChanged){
      this.props.cleanReportList(this.props.id);
      console.log("CLEANED!!");
    }
  }

  componentDidMount(){
    this.start();
  }

  componentWillUpdate(nextProps) {
    if(nextProps.id !== this.props.id){
    }

    const nextKeys = Object.keys(nextProps.logList).length;
    const keys = Object.keys(this.props.logList).length;

    if(nextKeys !== 0 && keys !== 0){
      if(nextKeys !== keys){
        this.reportListChanged = true;
      } else {
        this.reportListChanged = Object.keys(nextProps.logList)
        .filter(key => nextProps.logList[key].length !== this.props.logList[key].length)
        .length !== 0;
      }

      if(this.reportListChanged) {
        const { logContentContainer } = this.refs;
        const scrollPos = logContentContainer.scrollTop;
        const scrollBottom = (logContentContainer.scrollHeight - logContentContainer.clientHeight);
        this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom);
      }
    }
  }

  componentDidUpdate(){
    if(this.scrollAtBottom){
      this.scrollToBottom();
    }
  }

  render(){
    const tagReportList = this.props.logList;
    const id = this.props.id;
    const to = tagReportList[id] !== undefined? tagReportList[id].length -1 : 0;

    return (
      <RowContainer style={styles.contentContainer}>
        <Card
          style={styles.logView}
          bodyStyle={styles.cardBody}
          >
          <ColumnContainer style={{height: '100%'}}>
            <Header
              style={styles.logHeader}
              titleStyle={styles.logHeaderTitle}
              title='Log'
              />
            <ColumnContainer style={styles.logContentContainer}>
              <div ref="logContentContainer" style={styles.scrollAbleContent}>
                {tagReportList[id] !== undefined && (
                  tagReportList[id].map((report, i) => {
                    return (
                      <RFIDReport
                        key={i}
                        ip={report.ip}
                        port={report.port}
                        id={report.id}
                        rssi={report.rssi}
                        time={report.time}
                        phase={report.phase}
                      />
                    );
                  })
                )}
              </div>
            </ColumnContainer>
          </ColumnContainer>
        </Card>
      </RowContainer>
    )
  }
}

// 最初にコネクト処理を入れる
class Log extends Component {
  constructor(props){
    super(props);
    this.state = {
      call: null,
    }
  }

  componentDidMount(){
    this.id = this.props.match.params.id;
    this.startTagReporting();
  }

  componentWillUpdate(nextProps){
    if(nextProps.match.params.id !== this.props.match.params.id){
      console.log("============= CHANGE ================");
      console.log(this.props.log.tagReportList);
      this.call.removeListener('data', this.dataListener);

      this.dataListener = message => {
        this.props.getTagReport(nextProps.match.params.id, message);
      }

      this.call.on('data', this.dataListener);
      this.call.write({id: nextProps.match.params.id});
    }
  }

  startTagReporting(){
    const { client } = this.props.home;
    const call = client.connection.tagStream();
    this.dataListener = message => {
      this.props.getTagReport(this.id, message);
    }

    call.on('data', this.dataListener);

    call.on('status', status => {
      console.log(status);
    });

    call.on('error', err => {
      console.log(err);
    })

    call.on('end', () => {
      console.log('END');
    })

    call.write({id: this.id});
    this.call = call;
  }

  render() {
    const { tagReportList } = this.props.log;
    const id = this.props.match.params.id;

    return (
      <ColumnContainer style={styles.logContainer}>
        <Header
          style={styles.header}
          title='Reader Log'
          />
        <LogTailer cleanReportList={this.props.cleanReportList} logList={tagReportList} id={id} />
      </ColumnContainer>
    );
  }
}

export const LogViewScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Log);

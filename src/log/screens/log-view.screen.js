import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'element-react';

import { getTagReport } from '../log.action';
import { RowContainer, ColumnContainer, Header } from '../../components';
import { colors } from '../../config';

const styles = {
  logContainer: {
    width: '100%',
  },
  header: {
    flex: 0.5,
  },
  contentContainer: {
    flex: 9.5,
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
    borderColor: colors.lightBlack
  },
  logHeaderTitle: {
    color: colors.darkWhite,
    fontSize: 'small',
    fontFamiry: 'Helvetica Neue',
  },
  logContentContainer: {
    flex: 9, width: '100%',
    justifyContent: 'flex-start',
    overflow: 'scroll',
  },
  logText: {
    color: colors.darkWhite,
    fontSize: '10px',
    fontFamiry: 'Helvetica Neue',
    alignSelf: 'flex-start',
    margin: '5px 0 0 10px',
  },
}

const mapDispatchToProps = dispatch => {
  return {
    getTagReport: (id, message) => dispatch(getTagReport(id, message)),
  };
}

const mapStateToProps = state => {
  return {
    log: state.log,
    home: state.home
  };
}

const LogText = ({children}) => {
  return (
    <p style={styles.logText}>
      {children}
    </p>
  );
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
    const id = this.props.match.params.id;
    this.startTagReporting(id);
  }

  startTagReporting(id){
    const { client } = this.props.home;
    const call = client.connection.tagStream();

    call.on('data', message => {
      this.props.getTagReport(id, message);
    })

    call.on('status', status => {
      console.log(status);
    });

    call.on('error', err => {
      console.log(err);
    })

    call.on('end', () => {
      console.log('END');
    })

    call.write({id: id});

    this.setState({
      call: call
    });
  }

  render() {
    const { tagReportList } = this.props.log;
    const id = this.props.match.params.id;
    console.log("========================");
    console.log(tagReportList);
    console.log("========================");

    return (
      <ColumnContainer style={styles.logContainer}>
        <Header
          style={styles.header}
          title='Reader Log'
          />
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
                {(Object.keys(tagReportList).length !== 0) && (
                  tagReportList[id].map((report, i) => {
                    return (
                      <LogText key={i}>
                        { `${report.port} ${report.id} ${report.rssi} ${report.time} ${report.phase}` }
                      </LogText>
                    )
                  })
                )}
              </ColumnContainer>
            </ColumnContainer>
          </Card>
        </RowContainer>
      </ColumnContainer>
    );
  }
}

export const LogViewScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Log);

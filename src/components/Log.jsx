import React from 'react';
import { Card } from 'element-react';
import { RowContainer, ColumnContainer, Header } from './';
import { colors } from '../config';

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

const LogText = ({children}) => {
  return (
    <p style={styles.logText}>
      {children}
    </p>
  );
}

// 最初にコネクト処理を入れる
export const Log = (props) => {
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
              {(Array.from(Array(100), (key, i) => i)).map(i =>
                <LogText key={i}>
                  2018-02-17 10:19:00.237 UTC [1] LOG:  listening on IPv6 address "::", port 5432
                </LogText>
              )}
              </ColumnContainer>
          </ColumnContainer>
        </Card>
      </RowContainer>
    </ColumnContainer>
  );
}
